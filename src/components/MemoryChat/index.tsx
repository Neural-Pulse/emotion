import { useState, useEffect } from 'react';
import { Box, Button, Input, Select, VStack, Text, Flex } from '@chakra-ui/react';
import { db, auth } from '../../utils/firebase';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Message {
    id: string;
    stage: string;
    text: string;
    timestamp: Date;
}

const MemoryChat = () => {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState('');
    const [lifeStage, setLifeStage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (user) {
            const userMemoriesRef = collection(db, `memories/${user.uid}/userMemories`);
            console.log("Chegou aqui");
            const q = query(userMemoriesRef, orderBy("timestamp", "desc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                console.log("onSnapshot chamado");
                console.log("Número de documentos:", querySnapshot.size);
                const loadedMessages = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    stage: doc.data().stage,
                    text: doc.data().text,
                    timestamp: doc.data().timestamp.toDate()
                }));
                setMessages(loadedMessages);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const handleSendMessage = async () => {
        if (message && lifeStage && user) {
            console.log("teste aqui");
            await addDoc(collection(db, `memories/${user.uid}/userMemories`), {
                text: message,
                stage: lifeStage,
                timestamp: new Date()
            });
            setMessage('');
            setLifeStage('');
            console.log(message, lifeStage, user);
        }
    };

    return (
        <Flex direction="column" height="100vh">
            <Box flex="1" overflowY="auto" p={4}>
                <VStack spacing={4}>
                    {messages.map((msg) => (
                        <Box key={msg.id} p={3} shadow="md" borderWidth="1px" borderRadius="md">
                            <Text fontWeight="bold">{msg.stage}</Text>
                            <Text>{msg.text}</Text>
                        </Box>
                    ))}
                </VStack>
            </Box>
            <Box p={4}>
                <Input
                    placeholder="Digite sua memória aqui..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Select
                    placeholder="Selecione a fase da vida"
                    value={lifeStage}
                    onChange={(e) => setLifeStage(e.target.value)}
                    mt={2}
                >
                    <option value="infancia">Infância</option>
                    <option value="adolescencia">Adolescência</option>
                    <option value="adulto">Adulto</option>
                    <option value="idoso">Idoso</option>
                </Select>
                <Button colorScheme="blue" onClick={handleSendMessage} mt={2}>Enviar</Button>
            </Box>
        </Flex>
    );
};

export default MemoryChat;
