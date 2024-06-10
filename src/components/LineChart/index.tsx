import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, Box, Select, useBreakpointValue, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';

dayjs.extend(customParseFormat);
dayjs.locale('pt-br');

interface MoodChartProps {
    data: {
        time: string;
        moodState: string;
    }[];
}

const MoodChart = ({ data }: MoodChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartProps, setChartProps] = useState({ yAxisWidth: 120, xAxisHeight: 30 });
    const [filteredData, setFilteredData] = useState(data);
    const [groupByDay, setGroupByDay] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));

    const abbreviations = {
        "Euforia/Agitação/Aceleração/Agressividade": "EAAA",
        "Irritabilidade/Inquietação/Impaciência": "III",
        "Bom humor/Estabilidade": "BhEs",
        "Tristeza/Fadiga/Cansaço/Desânimo": "TFCD",
        "Tristeza profunda/Lentidão/Apatia": "TPLA",
    };

    const chartDimensions = useBreakpointValue({
        base: { height: 300, yAxisWidth: 80, xAxisHeight: 20 },
        sm: { height: 300, yAxisWidth: 100, xAxisHeight: 30 },
        md: { height: 400, yAxisWidth: 120, xAxisHeight: 30 },
        lg: { height: 500, yAxisWidth: 150, xAxisHeight: 40 },
        xl: { height: 600, yAxisWidth: 200, xAxisHeight: 50 },
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setChartProps({ yAxisWidth: 100, xAxisHeight: 100 });
            } else {
                setChartProps({ yAxisWidth: 400, xAxisHeight: 100 });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const filteredByMonth = data.filter(d => dayjs(d.time, 'DD/MM HH:mm').format('YYYY-MM') === selectedMonth);
        if (groupByDay) {
            const groupedData = filteredByMonth.reduce((acc, curr) => {
                const date = dayjs(curr.time, 'DD/MM HH:mm');
                if (!date.isValid()) {
                    console.error(`Invalid date format: ${curr.time}`);
                    return acc;
                }
                const day = date.format('DD/MM/YYYY');
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(curr.moodState);
                return acc;
            }, {} as Record<string, string[]>);

            const aggregatedData = Object.keys(groupedData).map(day => {
                const moodCounts = groupedData[day].reduce((acc, mood) => {
                    acc[mood] = (acc[mood] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
                return { time: day, moodState: mostFrequentMood };
            });

            setFilteredData(aggregatedData);
        } else {
            setFilteredData(filteredByMonth);
        }
    }, [groupByDay, selectedMonth, data]);

    const handleExportPDF = async () => {
        const exportContainer = document.createElement('div');
        exportContainer.style.width = '800px';
        exportContainer.style.height = '400px';
        exportContainer.style.position = 'absolute';
        exportContainer.style.left = '-10000px';
        document.body.appendChild(exportContainer);

        const titleElement = document.createElement('h2');
        titleElement.textContent = 'Gráfico de Humor';
        titleElement.style.textAlign = 'center';
        titleElement.style.marginTop = '20px';
        exportContainer.appendChild(titleElement);

        if (chartRef.current) {
            const chartClone = chartRef.current.cloneNode(true);
            exportContainer.appendChild(chartClone);
        }

        setTimeout(async () => {
            const canvas = await html2canvas(exportContainer, {
                useCORS: true,
                scale: 2,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgScaledWidth = pageWidth - 20;
            const imgScaledHeight = (canvas.height / canvas.width) * imgScaledWidth;

            pdf.addImage(imgData, 'PNG', 10, 10, imgScaledWidth, imgScaledHeight);
            pdf.save(`mood_chart_${dayjs().format('YYYYMMDD_HHmmss')}.pdf`);

            document.body.removeChild(exportContainer);
        }, 500);
    };

    const toggleGroupByDay = () => {
        setGroupByDay(prev => !prev);
    };

    return (
        <Box m={10} ml={2}>
            <Flex mb={4} alignItems="center">
                <Button onClick={toggleGroupByDay} ml={2}>
                    {groupByDay ? 'Mostrar por Hora' : 'Agrupar por Dia'}
                </Button>
                <Select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    width="200px"
                    ml={2}
                >
                    {Array.from(new Set(data.map(d => dayjs(d.time, 'DD/MM HH:mm').format('YYYY-MM')))).map(month => (
                        <option key={month} value={month}>{dayjs(month, 'YYYY-MM').format('MMMM YYYY')}</option>
                    ))}
                </Select>
                <Button onClick={handleExportPDF} ml={2}>
                    Exportar PDF
                </Button>
            </Flex>
            <div ref={chartRef}>
                <ResponsiveContainer width="100%" height={chartDimensions?.height}>
                    <LineChart data={filteredData}
                        margin={{ top: 5, right: 30, bottom: 100, left: 0 }}>
                        <XAxis dataKey="time" angle={-90} textAnchor="end" height={chartDimensions?.xAxisHeight} />
                        <YAxis
                            width={chartDimensions?.yAxisWidth}
                            type="category"
                            dataKey="moodState"
                            tickFormatter={(value: keyof typeof abbreviations) => {
                                return abbreviations[value] || value;
                            }}
                            domain={[
                                "Euforia/Agitação/Aceleração/Agressividade",
                                "Irritabilidade/Inquietação/Impaciência",
                                "Bom humor/Estabilidade",
                                "Tristeza/Fadiga/Cansaço/Desânimo",
                                "Tristeza profunda/Lentidão/Apatia"
                            ].reverse()}
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Line type="stepAfter" dataKey="moodState" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Box>
    );
};

export default MoodChart;
