import { Box, Heading, Text, VStack, List, ListItem, Link } from '@chakra-ui/react';

const HowtoFillLCMSP = () => {
    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                <Heading size="md">Euforia/Agitação/Aceleração/Agressividade</Heading>
                <Text>Qualquer um desses sintomas denota um humor elevado. Você não precisa ter todos esses sintomas para qualificar o humor dessa forma. Basta um deles, como abaixo:</Text>
                <List spacing={3}>
                    <ListItem>
                        <Text as="span" fontWeight="bold">1) Euforia - </Text>
                        humor muito alegre (além do seu habitual), atitude desinibida, extroversão excessiva, podendo chegar a ser inadequado em algumas situações sociais.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">2) Agitação - </Text>
                        você se sente agitado (mais do que inquieto), com muita energia, sente necessidade de extravasar esse excesso de alguma forma, mas não consegue. Tem pouco sono por não conseguir relaxar.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">3) Aceleração - </Text>
                        seus pensamentos estão muito rápidos, voam, você pensa em várias coisas ao mesmo tempo, não consegue se concentrar direito em nenhuma ideia, pois elas passam rapidamente. Você fala rápido e alto, às vezes não deixa os outros falarem ou interrompe muito as pessoas, centralizando a conversa.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">4) Agressividade - </Text>
                        você fica facilmente agressivo, explosivo, irrita-se com grande facilidade a ponto de brigar com as pessoas (verbal ou fisicamente).
                    </ListItem>
                </List>

                <Heading size="md">Irritabilidade/Inquietação/Impaciência</Heading>
                <Text>É um estado elevado de humor, porém que não chega a ser tão elevado quanto o anterior. Basta também uma dessas características para você marcar o quadrado correspondente.</Text>
                <List spacing={3}>
                    <ListItem>
                        <Text as="span" fontWeight="bold">1) Irritabilidade - </Text>
                        você está na maior parte do tempo irritado, qualquer coisa te tira do sério, você grita ou se desentende facilmente com as pessoas com as quais convive, fala coisas sem pensar e que podem magoar o outro, mas você não consegue se controlar totalmente.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">2) Inquietação - </Text>
                        você fica inquieto, mexe as mãos ou pernas o tempo todo, não consegue ficar muito tempo parado. Em geral, as pessoas percebem isso como um estado de grande ansiedade, incapacidade de relaxar, está sempre tenso, mas não chega a ficar propriamente agressivo com os outros.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">3) Impaciência - </Text>
                        tolerância zero ou quase-zero, tem a ver com a irritabilidade, mas alguns pacientes não ficam o tempo todo irritado, mas qualquer coisa que o contrarie ou desagrade provoca reações de intolerância.
                    </ListItem>
                </List>

                <Heading size="md">Bom humor/Estabilidade</Heading>
                <Text>Esse é o estado normal do humor. Você se sente bem, seus pensamentos estão centrados, com uma velocidade normal, seu comportamento é na maior parte das vezes tranquilo, existem poucas queixas. Pequenas variações são permitidas, mas sem alcançar os patamares para baixo ou para cima.</Text>
                <Heading size="md">Tristeza/Fadiga/Cansaço/Desânimo</Heading>
                <Text>Esse é o primeiro estágio de redução do humor para o pólo depressivo. Basta uma dessas características pela maior parte do dia para você assinalar esse quadrado.</Text>
                <List spacing={3}>
                    <ListItem>
                        <Text as="span" fontWeight="bold">1) Tristeza - </Text>
                        você se sente triste, sensível, emociona-se com facilidade, chora, sua auto-estima está baixa, você não acha graça nas coisas.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">2) Fadiga/Cansaço - </Text>
                        seu corpo e sua mente estão cansados, você não consegue pensar em nada útil, os pensamentos estão vazios, seu corpo parece que pesa uma tonelada, você se cansa facilmente, quer logo descansar ou permanecer na cama, lhe falta disposição física e psíquica para passar o dia.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">3) Desânimo - </Text>
                        você não tem vontade de fazer nada, nada lhe interessa, passa a maior parte do tempo desanimado.
                    </ListItem>
                </List>
                <Heading size="md">Tristeza profunda/Lentidão/Apatia</Heading>
                <Text>Esse é o estado mais rebaixado do humor, com sintomas claros de depressão. Basta uma dessas características para assinalar o quadrado correspondente.</Text>
                <List spacing={3}>
                    <ListItem>
                        <Text as="span" fontWeight="bold">1) Tristeza profunda - </Text>
                        é um estado melancólico, não é uma tristeza transitória ou fugaz. Você se sente profundamente triste, chora muito ou permanece quieto e sozinho, tem pensamentos negativos, mórbidos, que nem mesmo suporta.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">2) Lentidão - </Text>
                        você está lento. Os pensamentos são vagarosos, seu raciocínio está devagar, seus movimentos também estão fracos, lentos, você passa a maior parte do tempo parado, fala pouco e quase não interage com outros.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="bold">3) Apatia - </Text>
                        tem a ver com a lentidão. Você está apático, sem energia vital, não consegue se alimentar, a menos que alguém lhe ofereça algo para comer, não consegue tomar banho, passa a maior parte do tempo inerte. A apatia tem uma mistura de desânimo, falta completa de vontade, com uma inibição do comportamento.
                    </ListItem>
                </List>
                <Heading size="md">Observações</Heading>
                <Text>A dificuldade maior em sinalizar no mapa o estado do seu humor é quando ocorrem sintomas de grupos distintos ao mesmo tempo. Um exemplo frequente é quando o paciente se sente profundamente triste, mas está agitado ou inquieto. Nesse caso, você deve se decidir pelo sintoma mais proeminente ou que ocorre com mais frequência ao longo do dia. Outra maneira é optar pelo quadrado onde ocorre a maior parte dos sintomas listados. Por exemplo, você se sente profundamente triste, mas está também inquieto e impaciente. Não tem lentidão e nem apatia. Então, você deve marcar o quadrado correspondente a Irritabilidade/Inquietação/Impaciência. Algumas vezes o paciente tem dificuldade para avaliar a importância de um sintoma frente a outro. Você pode pedir ajuda para um familiar, perguntando-lhe como ele o vê ao longo do dia, antes de se decidir por qual quadrado optar.</Text>
                <Heading size="md">Referência</Heading>
                <Text>Publicado pelo Dr. Leonardo Figueiredo Palmeira. Todos os direitos reservados.</Text>
                <Link href="https://drpalmeira.blogspot.com/2008/01/afetivograma-o-mapa-do-humor.html" isExternal color="blue.500">
                    https://drpalmeira.blogspot.com/2008/01/afetivograma-o-mapa-do-humor.html
                </Link>
            </VStack>
        </Box>
    );
};

export default HowtoFillLCMSP;