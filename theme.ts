import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
    colors: {
        brand: {
            lightBlue: '#89CFF0',
            mintGreen: '#16A085',
            lavender: '#E6E6FA',
            softYellow: '#FFFACD',
            coral: '#FF7F50',
        },
        background: {
            light: '#f0f0f0',
        },
    },
});

export default customTheme;