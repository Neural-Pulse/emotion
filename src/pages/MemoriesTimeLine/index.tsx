import { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Button, useTheme } from '@chakra-ui/react';
import { db, auth } from '../../utils/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type StageColors = {
    infancia: string;
    adolescencia: string;
    adulto: string;
    idoso: string;
    [key: string]: string;
};

type Memory = {
    id: string;
    stage: string;
    text: string;
};

type GroupedMemories = {
    [stage: string]: Memory[];
};

const TimeLinePage = () => {
    const theme = useTheme();
    const [user] = useAuthState(auth);
    const [memories, setMemories] = useState<GroupedMemories>({});

    useEffect(() => {
        if (user) {
            const userMemoriesRef = collection(db, `memories/${user.uid}/userMemories`);
            const q = query(userMemoriesRef, orderBy("timestamp", "desc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const loadedMemories = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    stage: doc.data().stage as string,
                    text: doc.data().text as string
                }));
                const groupedMemories = groupMemoriesByStage(loadedMemories);
                setMemories(groupedMemories);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const groupMemoriesByStage = (memories: Memory[]): GroupedMemories => {
        return memories.reduce<GroupedMemories>((acc, memory) => {
            (acc[memory.stage] = acc[memory.stage] || []).push(memory);
            return acc;
        }, {});
    };

    const exportPDF = async () => {
        const input = document.getElementById('pdf-content');
        if (input) {
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save("download.pdf");
        } else {
            console.error('Element with ID pdf-content not found');
        }
    };

    const stageColors: StageColors = {
        infancia: theme.colors.brand.lightBlue,
        adolescencia: theme.colors.brand.mintGreen,
        adulto: theme.colors.brand.lavender,
        idoso: theme.colors.brand.softYellow
    };

    return (
        <Box p={5}>
            <Heading as="h1" size="xl" mb={4}>Linha do Tempo das Memórias</Heading>
            <Box id="pdf-content" p={5} bg="white">
                <VStack spacing={4}>
                    {Object.keys(memories).map(stage => (
                        <Box key={stage} bg={stageColors[stage]} p={4} borderRadius="md">
                            <Heading size="md">{stage}</Heading>
                            {memories[stage].map(memory => (
                                <Box key={memory.id} p={3} shadow="md" borderWidth="1px" borderRadius="md">
                                    <Text>{memory.text}</Text>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </VStack>
            </Box>
            <Button onClick={exportPDF} mt={4}>Export to PDF</Button>
        </Box>
    );
};

export default TimeLinePage;
