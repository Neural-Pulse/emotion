import React from 'react';
import { Box } from '@chakra-ui/react';
import MoodChart from '../../components/LineChart';

const Analytics = () => {
    const moodData = [
        { time: '07:00', moodState: 'Bom humor/Estabilidade' },
        { time: '08:15', moodState: 'Bom humor/Estabilidade' },
        { time: '09:30', moodState: 'Irritabilidade/Inquietação/Impaciência' },
        { time: '10:00', moodState: 'Irritabilidade/Inquietação/Impaciência' },
        { time: '11:20', moodState: 'Bom humor/Estabilidade' },
        { time: '12:10', moodState: 'Tristeza/Fadiga/Cansaço/Desânimo' },
        { time: '13:30', moodState: 'Tristeza/Fadiga/Cansaço/Desânimo' },
        { time: '14:45', moodState: 'Bom humor/Estabilidade' },
        { time: '15:20', moodState: 'Bom humor/Estabilidade' },
        { time: '16:00', moodState: 'Irritabilidade/Inquietação/Impaciência' },
        { time: '17:10', moodState: 'Irritabilidade/Inquietação/Impaciência' },
        { time: '18:30', moodState: 'Euforia/Agitação/Aceleração/Agressividade' },
        { time: '19:15', moodState: 'Euforia/Agitação/Aceleração/Agressividade' },
        { time: '20:00', moodState: 'Irritabilidade/Inquietação/Impaciência' },
        { time: '21:20', moodState: 'Bom humor/Estabilidade' },
        { time: '22:00', moodState: 'Bom humor/Estabilidade' },
        { time: '23:30', moodState: 'Tristeza/Fadiga/Cansaço/Desânimo' },
        { time: '00:15', moodState: 'Tristeza profunda/Lentidão/Apatia' },
        { time: '01:00', moodState: 'Tristeza profunda/Lentidão/Apatia' },
        { time: '02:30', moodState: 'Tristeza/Fadiga/Cansaço/Desânimo' },
        { time: '03:45', moodState: 'Tristeza/Fadiga/Cansaço/Desânimo' },
        { time: '04:20', moodState: 'Bom humor/Estabilidade' },
        { time: '05:10', moodState: 'Bom humor/Estabilidade' },
        { time: '06:00', moodState: 'Irritabilidade/Inquietação/Impaciência' },
        { time: '07:30', moodState: 'Bom humor/Estabilidade' },
        { time: '08:45', moodState: 'Bom humor/Estabilidade' },
        { time: '09:20', moodState: 'Irritabilidade/Inquietação/Impaciência' },
        { time: '10:10', moodState: 'Euforia/Agitação/Aceleração/Agressividade' },
        { time: '11:00', moodState: 'Euforia/Agitação/Aceleração/Agressividade' },
    ];

    return (
        <div>
            <h2>Mood Analytics</h2>
            <MoodChart data={moodData} />
        </div>
    );
}
export default Analytics;