// pages/AboutPage.tsx
import { Heading, Text, Container } from '@chakra-ui/react';

const AboutPage = () => {
    return (
        <Container maxW="container.md" py={5}>
            <Heading as="h1" size="xl" mb={5}>
                Sobre o App
            </Heading>
            <Text fontSize="lg" lineHeight="tall">
                O objetivo deste aplicativo é auxiliar no diagnóstico e monitoramento da bipolaridade,
                uma condição de saúde mental que se caracteriza pela variação extrema de humor,
                incluindo episódios de mania e depressão. Através de ferramentas interativas e
                análises de comportamento, o app busca fornecer insights valiosos tanto para
                os usuários quanto para profissionais de saúde.
            </Text>
            <Text fontSize="lg" lineHeight="tall" mt={4}>
                Utilizando tecnologia de ponta e algoritmos de aprendizado de máquina, o app
                permite que os usuários registrem seu estado de humor diariamente. Esses dados
                são analisados para identificar padrões ou tendências que possam indicar a
                necessidade de intervenção médica ou ajustes no tratamento.
            </Text>
            <Text fontSize="lg" lineHeight="tall" mt={4}>
                Acreditamos que, ao facilitar o acompanhamento e a compreensão da bipolaridade,
                podemos ajudar a melhorar a qualidade de vida dos usuários e promover uma
                gestão mais eficaz da condição.
            </Text>
        </Container>
    );
};

export default AboutPage;