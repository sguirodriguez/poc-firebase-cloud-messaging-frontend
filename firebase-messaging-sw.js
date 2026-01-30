/**
 * Firebase Messaging Service Worker (entry para Webpack).
 * Mesma config do app; VAPID_KEY pode ser definido em .env como VITE_VAPID_KEY.
 */
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyC_GXFLMzEP_1Dz63RpTu7eCt19yEYMtnU",
    authDomain: "warning-guy.firebaseapp.com",
    projectId: "warning-guy",
    storageBucket: "warning-guy.firebasestorage.app",
    messagingSenderId: "305133601962",
    appId: "1:305133601962:web:d6a81f9a8e939db1c87cd3",
};

// Use VITE_VAPID_KEY no .env ou substitua o valor abaixo
const VAPID_KEY = (typeof VAPID_KEY_INJECT !== "undefined" && VAPID_KEY_INJECT) ? VAPID_KEY_INJECT : "BCncbZnL4YxlduDK4i7GC-S7CP4Kzo8wQUIewpjk6jn70bPtMa8IMC1wJATYPZE9geq3EDvjw0hw8Y3Jbx0U0gE";

function getFirebaseApp() {
    if (getApps().length === 0) return initializeApp(firebaseConfig);
    return getApp();
}

const app = getFirebaseApp();
const messaging = getMessaging(app);

getToken(messaging, { vapidKey: VAPID_KEY })
    .then((currentToken) => {
        if (currentToken) {
            console.log("[firebase-messaging-sw] Token:", currentToken);
        } else {
            console.log("[firebase-messaging-sw] Nenhum token. Solicite permissão de notificação.");
        }
    })
    .catch((err) => {
        console.error("[firebase-messaging-sw] Erro ao obter token:", err);
    });

// Notificações em foreground (quando o app está aberto)
onMessage(messaging, (payload) => {
    console.log("[firebase-messaging-sw] Mensagem recebida:", payload);
    const { title, body } = payload.notification || {};
    if (title || body) {
        self.registration.showNotification(title || "Notificação", {
            body: body || "",
            icon: "/favicon.ico",
        });
    }
});
