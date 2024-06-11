import { useEffect, useState } from 'react';
import MoodChart from '../../components/MoodChart';
import { Box, Center, Text } from '@chakra-ui/react';
import { auth, db } from '../../utils/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import dayjs from 'dayjs';
import { decryptData } from '../../utils/crypto';

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
            // Ajusta a consulta para a nova estrutura de dados
            const moodDataQuery = query(collection(db, `moodData/${userId}/moodData`));

            const unsubscribe = onSnapshot(moodDataQuery, (querySnapshot) => {
                const decryptedMoodData = querySnapshot.docs.map((doc) => {
                    const encryptedData = doc.data().data; // Acessa o campo 'data' que contém os dados criptografados
                    // Descriptografa os dados
                    const decryptedData = decryptData(encryptedData) as MoodData;
                    return {
                        time: decryptedData.time, // Usa o campo de tempo descriptografado
                        moodState: decryptedData.moodState, // Usa o estado de humor descriptografado
                    };
                });

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
