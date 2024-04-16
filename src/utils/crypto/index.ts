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
export const decryptData = (ciphertext: string | CryptoJS.lib.CipherParams) => {
    const bytes = AES.decrypt(ciphertext, secretKey);
    const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
    return decryptedData;
};