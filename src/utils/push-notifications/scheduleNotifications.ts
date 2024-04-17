// src/scheduleNotification.ts
import { sendNotification } from './notify';

function getNextNotificationTime(hours: number, minutes: number = 0): number {
    const now = new Date();
    let next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    if (now >= next) {
        next = new Date(next.getTime() + 86400000); // Adiciona um dia em milissegundos
    }

    return next.getTime() - now.getTime();
}

export function scheduleNotifications() {
    const notifications = [
        { hour: 9, message: "Bom dia =D Registre seu estado emocional" },
        { hour: 17, message: "Boa tarde, Registre seu estado emocional?" },
        { hour: 20, message: "Boa noite, Registre seu estado emocional" }
    ];

    notifications.forEach(({ hour, message }) => {
        const delay = getNextNotificationTime(hour);
        setTimeout(() => {
            sendNotification('Mensagem', message);
        }, delay);
    });
}
