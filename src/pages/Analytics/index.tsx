import { useEffect, useState } from 'react';
import MoodChart from '../../components/LineChart';
import { Box, Center, Text } from '@chakra-ui/react';
import { auth, db } from '../../utils/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import dayjs from 'dayjs';
import { decryptData } from '../../utils/crypto'; // Certifique-se de que este é o caminho correto

interface MoodData {
    time: string;
    moodState: string;
}

const Analytics = () => {
    const [moodData, setMoodData] = useState<MoodData[]>([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const moodDataQuery = query(collection(db, 'moodData'), where('userId', '==', userId));

            const unsubscribe = onSnapshot(moodDataQuery, (querySnapshot) => {
                const decryptedMoodData = querySnapshot.docs.map((doc) => {
                    const encryptedData = doc.data();
                    // Assume que moodState é o campo criptografado e precisa ser descriptografado
                    const decryptedData = decryptData(encryptedData.moodState) as MoodData;
                    return {
                        ...encryptedData,
                        moodState: decryptedData.moodState,
                        time: encryptedData.time // Mantém o campo de tempo como está
                    };
                });

                console.log('Mood data retrieved and decrypted: ', decryptedMoodData);

                const sortedMoodData = decryptedMoodData.sort((a, b) => dayjs(a.time).valueOf() - dayjs(b.time).valueOf());

                const formattedMoodData = sortedMoodData.map((data) => ({
                    ...data,
                    time: dayjs(data.time).format('DD/MM HH:mm'), // Formata a data
                }));

                setMoodData(formattedMoodData);
            });

            // Limpeza: desinscrever do snapshot ao desmontar o componente
            return () => unsubscribe();
        } else {
            console.log('User not authenticated');
            setMoodData([]);
        }
    }, []);

    return (
        <Box>
            <Center>
                <Text fontSize="2xl" fontWeight="bold" my={5}>Análises de Humor</Text>
            </Center>
            <MoodChart data={moodData} />
        </Box>
    );
};

export default Analytics;
