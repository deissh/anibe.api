import Fcm from 'fcm-push';

export const FCM = new Fcm(process.env.FIREBASE_FCM_KEY);
