import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import MoodChart from '../../components/LineChart';
import { auth, db } from '../../utils/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs'; // Usando Day.js como alternativa ao Moment.js

// Simples cache de dados em memória
let moodDataCache = {};

const Analytics = () => {
    const [moodData, setMoodData] = useState([]);

    useEffect(() => {
        const fetchMoodData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    // Verifica se os dados já estão no cache
                    if (moodDataCache[userId]) {
                        console.log('Retrieving data from cache');
                        setMoodData(moodDataCache[userId]);
                        return;
                    }

                    const moodDataQuery = query(collection(db, 'moodData'), where('userId', '==', userId));
                    const querySnapshot = await getDocs(moodDataQuery);

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

                    // Armazena os dados formatados no cache
                    moodDataCache[userId] = formattedMoodData;
                    setMoodData(formattedMoodData);
                } else {
                    console.log('User not authenticated');
                    setMoodData([]);
                }
            } catch (error) {
                console.error('Error fetching mood data: ', error);
                setMoodData([]);
            }
        };

        fetchMoodData();
    }, []);

    return (
        <div>
            <h2>Mood Analytics</h2>
            <MoodChart data={moodData} />
        </div>
    );
};

export default Analytics;