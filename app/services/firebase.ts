import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, type Messaging } from "firebase/messaging";
import type { MessagePayload } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyC_GXFLMzEP_1Dz63RpTu7eCt19yEYMtnU",
    authDomain: "warning-guy.firebaseapp.com",
    projectId: "warning-guy",
    storageBucket: "warning-guy.firebasestorage.app",
    messagingSenderId: "305133601962",
    appId: "1:305133601962:web:d6a81f9a8e939db1c87cd3",
};

const VAPID_KEY = "BCncbZnL4YxlduDK4i7GC-S7CP4Kzo8wQUIewpjk6jn70bPtMa8IMC1wJATYPZE9geq3EDvjw0hw8Y3Jbx0U0gE";

const SW_URL = "/firebase-messaging-sw.js";
const SW_SCOPE = "/";

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

export async function getFirebaseMessagingRegistration(): Promise<ServiceWorkerRegistration | null> {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
    try {
        const registration = await navigator.serviceWorker.register(SW_URL, { scope: SW_SCOPE });
        await navigator.serviceWorker.ready;
        return registration;
    } catch (err) {
        console.error("[firebase] Erro ao registrar SW:", err);
        return null;
    }
}

export const requestPermission = async (): Promise<string | null> => {
    const messaging = getMessagingClient();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await getFirebaseMessagingRegistration();
    if (!registration) return null;

    const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
    });
    return token;
};

/** Payload de uma mensagem FCM (para exibir na UI). */
export interface ReceivedMessage {
    title: string;
    body: string;
    data?: Record<string, string>;
    receivedAt: number;
}

/**
 * Escuta mensagens em foreground (app aberto na tela).
 * Retorna função para cancelar o listener.
 */
export function subscribeToForegroundMessages(
    onMessageReceived: (msg: ReceivedMessage) => void
): () => void {
    const messaging = getMessagingClient();
    if (!messaging) return () => { };

    const unsubscribe = onMessage(messaging, (payload: MessagePayload) => {
        const msg: ReceivedMessage = {
            title: payload.notification?.title ?? "Notificação",
            body: payload.notification?.body ?? "",
            data: payload.data as Record<string, string> | undefined,
            receivedAt: Date.now(),
        };
        onMessageReceived(msg);
    });

    return unsubscribe;
}