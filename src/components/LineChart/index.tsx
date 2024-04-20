import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, Box, useBreakpointValue } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface MoodChartProps {
    data: {
        time: string;
        moodState: string;
    }[];
}

const MoodChart = ({ data }: MoodChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartProps, setChartProps] = useState({ yAxisWidth: 120, xAxisHeight: 30 });

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
            if (window.innerWidth < 768) { // Considera tela menor que 768px como móvel
                setChartProps({ yAxisWidth: 100, xAxisHeight: 100 }); // Ajustes para mobile
            } else {
                setChartProps({ yAxisWidth: 400, xAxisHeight: 100 }); // Ajustes para desktop
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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


    return (
        <Box m={10} ml={2}>
            <Button onClick={handleExportPDF} mb={4} ml={0}>
                Exportar PDF
            </Button>
            <div ref={chartRef}>
                <ResponsiveContainer width="100%" height={chartDimensions?.height}>
                    <LineChart data={data}
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
