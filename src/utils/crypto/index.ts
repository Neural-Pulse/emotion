import { AES, enc } from 'crypto-js';

const secretKey = 'sua_chave_secreta_aqui'; // Mantenha esta chave segura e não a exponha

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
