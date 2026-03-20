import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, type Messaging } from "firebase/messaging";
import type { MessagePayload } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyC_GXFLMzEP_1Dz63RpTu7eCt19yEYMtnU",
    authDomain: "warning-guy.firebaseapp.com",
    projectId: "warning-guy",
    storageBucket: "warning-guy.firebasestorage.app",
    messagingSenderId: "305133601962",
    appId: "1:305133601962:web:d6a81f9a8e939db1c87cd3"
};

const VAPID_KEY = "BCPPfdR0huImZADzUerHClfMC-L2WSVDCS9CmzZcqaTpoWD91uw30xdctPcr0MYvDZImEmANIy7hLpB4-07Yc68";

function getFirebaseApp() {
    if (getApps().length === 0) return initializeApp(firebaseConfig);
    return getApp();
}

function getMessagingClient(): Messaging | null {
    const app = getFirebaseApp();
    if (!app) return null;
    return getMessaging(app);
}

export function getNotificationPermission(): NotificationPermission {
    if (typeof window === "undefined" || !("Notification" in window)) return "denied";
    return Notification.permission;
}

async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
    try {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        await navigator.serviceWorker.ready;
        return registration;
    } catch (err) {
        console.error("Erro ao registrar Service Worker:", err);
        return null;
    }
}

export const requestPermission = async (): Promise<string | null> => {
    const messaging = getMessagingClient();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await registerServiceWorker();
    if (!registration) return null;

    const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
    });
    
    console.log("FCM Token:", token);
    
    return token;
};

export interface ReceivedMessage {
    title: string;
    body: string;
    data?: Record<string, string>;
    receivedAt: number;
}

export function subscribeToForegroundMessages(
    onMessageReceived: (msg: ReceivedMessage) => void
): () => void {
    const messaging = getMessagingClient();
    if (!messaging) return () => { };

    const unsubscribe = onMessage(messaging, (payload: MessagePayload) => {
        const title = payload.notification?.title || "Notificação";
        const body = payload.notification?.body || "";
        
        const msg: ReceivedMessage = {
            title,
            body,
            data: payload.data as Record<string, string> | undefined,
            receivedAt: Date.now(),
        };
        
        if (Notification.permission === "granted") {
            new Notification(title, {
                body: body,
                icon: "/favicon.ico",
                data: payload.data
            });
        }
        
        onMessageReceived(msg);
    });

    return unsubscribe;
}
