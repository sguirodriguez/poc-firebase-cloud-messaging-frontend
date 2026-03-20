importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC_GXFLMzEP_1Dz63RpTu7eCt19yEYMtnU",
  authDomain: "warning-guy.firebaseapp.com",
  projectId: "warning-guy",
  storageBucket: "warning-guy.firebasestorage.app",
  messagingSenderId: "305133601962",
  appId: "1:305133601962:web:d6a81f9a8e939db1c87cd3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const title = payload.notification?.title || "Notificação";
  const options = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico",
    data: payload.data || {}
  };
  
  return self.registration.showNotification(title, options);
});
