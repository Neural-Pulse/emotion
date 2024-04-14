import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import MoodChart from '../../components/LineChart';
import { auth, db } from '../../utils/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import moment from 'moment';

const Analytics = () => {
    const [moodData, setMoodData] = useState([]);

    useEffect(() => {
        const fetchMoodData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const moodDataQuery = query(collection(db, 'moodData'), where('userId', '==', userId));
                    const querySnapshot = await getDocs(moodDataQuery);

                    const moodData = querySnapshot.docs.map((doc) => doc.data());
                    console.log('Mood data retrieved: ', moodData);
                    const sortedMoodData = moodData.sort((a, b) => {
                        return moment(a.time).valueOf() - moment(b.time).valueOf();
                    });

                    const formattedMoodData = sortedMoodData.map((data) => {
                        const timestamp = data.time;
                        const formattedTimestamp = moment(timestamp).format('DD/MM HH:mm');
                        return {
                            ...data,
                            time: formattedTimestamp,
                        };
                    });
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
