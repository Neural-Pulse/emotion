import React, { useEffect, useState } from 'react';
import MoodChart from '../../components/LineChart';
import { Box, Center, Text } from '@chakra-ui/react';
import { auth, db } from '../../utils/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import dayjs from 'dayjs';

const Analytics = () => {
    const [moodData, setMoodData] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const moodDataQuery = query(collection(db, 'moodData'), where('userId', '==', userId));

            const unsubscribe = onSnapshot(moodDataQuery, (querySnapshot) => {
                const moodData = querySnapshot.docs.map((doc) => doc.data());
                console.log('Mood data retrieved: ', moodData);

                const sortedMoodData = moodData.sort((a, b) => {
                    return dayjs(a.time).valueOf() - dayjs(b.time).valueOf();
                });

                const formattedMoodData = sortedMoodData.map((data) => {
                    const timestamp = data.time;
                    const formattedTimestamp = dayjs(timestamp).format('DD/MM HH:mm');
                    return {
                        ...data,
                        time: formattedTimestamp,
                    };
                });

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
                <Text fontSize="2xl" fontWeight="bold" my={5}>Analises de humor</Text>
            </Center>
            <MoodChart data={moodData} />
        </Box>
    );
};

export default Analytics;
