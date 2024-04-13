import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoodChart = ({ data }) => {
    const moodStates = [
        "Tristeza profunda/Lentidão/Apatia",
        "Tristeza/Fadiga/Cansaço/Desânimo",
        "Bom humor/Estabilidade",
        "Irritabilidade/Inquietação/Impaciência",
        "Euforia/Agitação/Aceleração/Agressividade"
    ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <XAxis dataKey="time" />
                <YAxis type="category" dataKey="moodState" domain={moodStates} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="stepAfter" dataKey="moodState" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default MoodChart;