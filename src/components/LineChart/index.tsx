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
        const pdf = new jsPDF('l', 'mm', 'a4');

        // Set margins
        const marginLeft = 20;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 20;

        // Calculate available width and height for the chart
        const availableWidth = pdf.internal.pageSize.getWidth() - marginLeft - marginRight;
        const availableHeight = pdf.internal.pageSize.getHeight() - marginTop - marginBottom;

        // Add title
        const title = 'Mood Chart';
        pdf.setFontSize(18);
        pdf.text(title, marginLeft, marginTop);

        // Add chart image
        const imgProps = pdf.getImageProperties(imgData);
        const chartWidth = availableWidth;
        const chartHeight = (imgProps.height * chartWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', marginLeft, marginTop + 10, chartWidth, chartHeight);

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