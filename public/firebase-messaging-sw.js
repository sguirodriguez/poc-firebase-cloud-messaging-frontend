/**
 * Firebase Messaging Service Worker (compat — sem Webpack).
 * Usa importScripts para funcionar em qualquer ambiente (incl. ngrok).
 * Config deve bater com app/services/firebase.ts.
 */
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC_GXFLMzEP_1Dz63RpTu7eCt19yEYMtnU",
  authDomain: "warning-guy.firebaseapp.com",
  projectId: "warning-guy",
  storageBucket: "warning-guy.firebasestorage.app",
  messagingSenderId: "305133601962",
  appId: "1:305133601962:web:d6a81f9a8e939db1c87cd3",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw] Background message:", payload);
  const title = payload.notification?.title || "Notificação";
  const options = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico",
  };
  self.registration.showNotification(title, options);
});
