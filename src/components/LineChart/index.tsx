import React, { useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@chakra-ui/react';

const MoodChart = ({ data }) => {
    const moodStates = [
        "Tristeza profunda/Lentidão/Apatia",
        "Tristeza/Fadiga/Cansaço/Desânimo",
        "Bom humor/Estabilidade",
        "Irritabilidade/Inquietação/Impaciência",
        "Euforia/Agitação/Aceleração/Agressividade"
    ];

    const chartRef = useRef(null);
    const handleExportPDF = async () => {
        const chart = chartRef.current;
        const canvas = await html2canvas(chart);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4'); // Configuração para orientação horizontal (paisagem)
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('mood_chart.pdf');
    };


    return (
        <div>
            <Button onClick={handleExportPDF} mb={4}>
                Export as PDF
            </Button>
            <div ref={chartRef}>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <XAxis dataKey="time" />
                        <YAxis type="category" dataKey="moodState" domain={moodStates} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Line type="stepAfter" dataKey="moodState" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MoodChart;