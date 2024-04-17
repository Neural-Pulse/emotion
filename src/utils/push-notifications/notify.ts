export async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        console.log("Notification permission granted.");
    } else {
        console.log("Notification permission denied.");
    }
}

export function sendNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === "granted") {
        new Notification(title, options);
    } else {
        console.log("Notification permission not granted.");
    }
}
