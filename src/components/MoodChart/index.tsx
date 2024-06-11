import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, Box, useBreakpointValue, Flex, Text, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    const [, setChartProps] = useState({ yAxisWidth: 120, xAxisHeight: 30 });
    const [filteredData, setFilteredData] = useState(data);
    const [groupByDay, setGroupByDay] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const abbreviations = {
        "Euforia/Agitação/Aceleração/Agressividade": "EAAA",
        "Irritabilidade/Inquietação/Impaciência": "III",
        "Bom humor/Estabilidade": "BhEs",
        "Tristeza/Fadiga/Cansaço/Desânimo": "TFCD",
        "Tristeza profunda/Lentidão/Apatia": "TPLA",
    };

    const abbreviationsLegend = {
        "EAAA": "Euforia/Agitação/Aceleração/Agressividade",
        "III": "Irritabilidade/Inquietação/Impaciência",
        "BhEs": "Bom humor/Estabilidade",
        "TFCD": "Tristeza/Fadiga/Cansaço/Desânimo",
        "TPLA": "Tristeza profunda/Lentidão/Apatia",
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
        const filteredByDateRange = data.filter(d => {
            const date = dayjs(d.time, 'DD/MM HH:mm');
            if (!date.isValid()) {
                console.error(`Invalid date format: ${d.time}`);
                return false;
            }
            if (startDate && date.isBefore(startDate, 'day')) {
                return false;
            }
            if (endDate && date.isAfter(endDate, 'day')) {
                return false;
            }
            return true;
        });

        if (groupByDay) {
            const groupedData = filteredByDateRange.reduce((acc, curr) => {
                const date = dayjs(curr.time, 'DD/MM HH:mm');
                if (!date.isValid()) {
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
            setFilteredData(filteredByDateRange);
        }
    }, [groupByDay, startDate, endDate, data]);

    const handleExportPDF = async () => {
        if (chartRef.current) {
            const chartCanvas = await html2canvas(chartRef.current, {
                useCORS: true,
                scale: 2,
            });

            const combinedCanvas = document.createElement('canvas');
            combinedCanvas.width = chartCanvas.width;
            combinedCanvas.height = chartCanvas.height + 180; // Espaço para o título e a legenda
            const combinedCtx = combinedCanvas.getContext('2d');

            if (combinedCtx) {
                combinedCtx.fillStyle = '#fff';
                combinedCtx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

                // Adicionar título
                combinedCtx.fillStyle = '#000';
                combinedCtx.font = '50px Arial';
                combinedCtx.textAlign = 'center';
                combinedCtx.fillText('Mood Chart', combinedCanvas.width / 2, 50);

                // Adicionar gráfico
                combinedCtx.drawImage(chartCanvas, 0, 100);

                // Adicionar legenda de forma horizontal
                combinedCtx.font = '30px Arial';
                combinedCtx.textAlign = 'left';
                const yPosition = chartCanvas.height + 130;
                const legendEntries = Object.entries(abbreviationsLegend);
                const spacing = combinedCanvas.width / legendEntries.length;
                legendEntries.forEach(([abbr, meaning], index) => {
                    combinedCtx.fillText(`${abbr}: ${meaning}`, spacing * index + 10, yPosition);
                });

                const imgData = combinedCanvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4'
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const imgScaledWidth = pageWidth - 20;
                const imgScaledHeight = (combinedCanvas.height / combinedCanvas.width) * imgScaledWidth;

                pdf.addImage(imgData, 'PNG', 10, 10, imgScaledWidth, imgScaledHeight);
                pdf.save(`mood_chart_${dayjs().format('YYYYMMDD_HHmmss')}.pdf`);
            }
        }
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
                <Box ml={2}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        customInput={<Input />}
                        placeholderText="Data Inicial"
                    />
                </Box>
                <Box ml={2}>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        customInput={<Input />}
                        placeholderText="Data Final"
                    />
                </Box>
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
            <Box mt={4}>
                <Text fontSize="sm" fontWeight="bold">Legend:</Text>
                <Flex wrap="wrap" mt={2}>
                    {Object.entries(abbreviationsLegend).map(([abbr, meaning]) => (
                        <Box key={abbr} mr={4} mb={2}>
                            <Text fontSize="sm"><strong>{abbr}:</strong> {meaning}</Text>
                        </Box>
                    ))}
                </Flex>
            </Box>
        </Box>
    );
};

export default MoodChart;
