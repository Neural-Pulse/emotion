import { sendNotification } from './notify';


function getNextNotificationTime(hours: number, minutes: number = 0): number {
    const now = new Date();
    let next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    // Se já passou a hora hoje, agende para o próximo dia
    if (now >= next) {
        next = new Date(next.getTime() + 86400000); // Adiciona um dia em milissegundos
    }

    return next.getTime() - now.getTime();
}

export function scheduleNotifications() {
    const times = [9, 17, 20]; // Horas para enviar notificações

    times.forEach(time => {
        const delay = getNextNotificationTime(time);
        setTimeout(() => {
            sendNotification('Scheduled Notification', { body: `It's ${time}:00!` });
        }, delay);
    });
}