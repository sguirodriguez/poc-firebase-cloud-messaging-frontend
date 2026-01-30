# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Firebase Messaging (push notifications)

Este projeto usa Firebase Cloud Messaging (FCM) para simular notificações push na web.

### Configuração

1. **VAPID key**  
   Em [Firebase Console](https://console.firebase.google.com/) → Project Settings → Cloud Messaging → **Web Push certificates**, gere um par de chaves e copie a chave pública.

2. **Variável de ambiente**  
   Crie um arquivo `.env` na raiz (use `.env.example` como base) e defina:

   ```
   VITE_FIREBASE_VAPID_KEY=sua-chave-vapid-aqui
   ```

3. **Service Worker**  
   O Service Worker do Firebase é gerado pelo **Webpack** (entry: `src/firebase-messaging-sw.js`). O build roda com `npm run build:sw` e gera `public/firebase-messaging-sw.js`, servido na raiz. Ele trata mensagens em background (quando a aba está fechada ou sem foco). Para injetar a VAPID key no SW, use `VITE_VAPID_KEY` no `.env` antes do build.

4. **HTTPS**  
   Push notifications exigem contexto seguro. Em desenvolvimento, use `https` no Vite ou um túnel (ex.: ngrok). Em produção, use HTTPS.

### Fluxo no app

- **Dashboard** → botão "Ativar notificações" pede permissão, registra o SW e obtém o **token FCM**. Esse token deve ser enviado ao seu backend para enviar mensagens a este dispositivo.
- **Foreground** (aba aberta): mensagens são tratadas por `NotificationListener` em `app/components/NotificationListener.tsx` e por `onMessage` no `app/lib/messaging.ts`.
- **Background** (aba fechada): mensagens são tratadas pelo service worker `firebase-messaging-sw.js`.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
