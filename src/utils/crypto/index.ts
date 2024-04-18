import { AES, enc } from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_CRYPT_KEY; // Keep this key safe and do not expose it

if (!secretKey) {
    throw new Error('VITE_SECRET_CRYPT_KEY is not set');
}

// Função para criptografar os dados
export const encryptData = (data: any) => {
    return AES.encrypt(JSON.stringify(data), secretKey).toString();
};

// Função para descriptografar os dados
// crypto/index.ts
export const decryptData = (ciphertext: string | CryptoJS.lib.CipherParams) => {
    try {
        const bytes = AES.decrypt(ciphertext, secretKey);
        const decryptedText = bytes.toString(enc.Utf8);
        if (!decryptedText) {
            console.error("Decryption returned empty or invalid string:", decryptedText);
            return null;
        }
        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Failed to decrypt or parse data:", error);
        return null;
    }
};
