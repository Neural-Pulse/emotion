import { requestNotificationPermission } from './notify';
import { scheduleNotifications } from './scheduleNotifications';

export async function setupNotifications() {
    await requestNotificationPermission();
    scheduleNotifications();
}