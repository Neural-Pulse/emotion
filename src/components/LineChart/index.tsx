import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, Box } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface MoodChartProps {
    data: {
        time: string;
        moodState: string;
    }[];
}

const MoodChart = ({ data }: MoodChartProps) => {
    const chartRef = useRef(null);
    const [chartProps, setChartProps] = useState({ yAxisWidth: 120, xAxisHeight: 30 });

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
        if (chartRef.current) {
            const canvas = await html2canvas(chartRef.current, {
                useCORS: true,
                scale: 2, // Aumenta a escala para melhorar a qualidade da imagem
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Define as dimensões do PDF para A4 em retrato
            const pdf = new jsPDF({
                orientation: 'l',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const pdfMargin = 10; // Margem para o PDF em mm

            // Calcula a largura e altura da imagem para caber dentro do PDF com margens
            const imgScaledWidth = pageWidth - 2 * pdfMargin;
            const imgScaledHeight = imgHeight * (imgScaledWidth / imgWidth);

            const title = "Afetivograma";
            const titleSize = 12; // Tamanho da fonte para o título
            pdf.setFontSize(titleSize);
            pdf.text(title, pdfMargin, 20); // Posiciona o título no PDF

            // Adiciona a imagem do gráfico ao PDF com as margens definidas
            pdf.addImage(imgData, 'PNG', pdfMargin, 25, imgScaledWidth, imgScaledHeight);

            // Gera o nome do arquivo com a data e hora atual
            const dateTimeNow = dayjs().format('YYYYMMDD_HHmmss');
            const fileName = `afetivograma_${dateTimeNow}.pdf`;

            // Salva o PDF
            pdf.save(fileName);
        }
    };



    return (
        <Box m={10}>
            <Button onClick={handleExportPDF} mb={4}>
                Exportar PDF
            </Button>
            <div ref={chartRef}>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <XAxis dataKey="time" angle={-90} textAnchor="end" height={chartProps.xAxisHeight} />
                        <YAxis width={chartProps.yAxisWidth} type="category" dataKey="moodState" domain={["Tristeza profunda/Lentidão/Apatia", "Tristeza/Fadiga/Cansaço/Desânimo", "Bom humor/Estabilidade", "Irritabilidade/Inquietação/Impaciência", "Euforia/Agitação/Aceleração/Agressividade"]} />
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