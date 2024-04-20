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
    breakpoints: {
        sm: '320px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
});

export default customTheme;