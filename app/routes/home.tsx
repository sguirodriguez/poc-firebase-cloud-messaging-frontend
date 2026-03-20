import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import {
  requestPermission,
  getNotificationPermission,
  subscribeToForegroundMessages,
  type ReceivedMessage,
} from "../services/firebase";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Warning Guy - Firebase Cloud Messaging" },
    {
      name: "description",
      content: "Teste de Firebase Cloud Messaging",
    },
  ];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [tokenStatus, setTokenStatus] = useState<string | null>(null);
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [toast, setToast] = useState<ReceivedMessage | null>(null);

  useEffect(() => {
    setPermission(getNotificationPermission());
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = subscribeToForegroundMessages((msg) => {
      setMessages((prev) => [msg, ...prev].slice(0, 20));
      setToast(msg);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 10000);
    return () => clearTimeout(t);
  }, [toast]);

  async function handleEnableNotifications() {
    setTokenStatus(null);
    const token = await requestPermission();
    const newPerm = getNotificationPermission();
    setPermission(newPerm);
    
    if (token) {
      setTokenStatus("Token obtido — verifique o console");
    } else if (newPerm === "denied") {
      setTokenStatus("Notificações bloqueadas. Reative nas configurações do site.");
    } else {
      setTokenStatus("Não foi possível obter o token.");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-amber-950/10 flex flex-col">
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 max-w-sm w-full rounded-xl border border-amber-500/40 bg-slate-800 shadow-xl shadow-black/30 p-4 flex gap-3"
          style={{ animation: "slideIn 0.3s ease-out" }}
          role="alert"
        >
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-amber-400">{toast.title}</p>
            {toast.body && <p className="text-sm text-slate-300 mt-0.5">{toast.body}</p>}
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.15),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(251,191,36,0.06),transparent)] pointer-events-none" />

      <header className="relative flex justify-between items-center p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30">
            <svg
              className="w-5 h-5 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white">Warning Guy</span>
        </div>
      </header>

      <main className="relative flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <section className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Notificações</h2>
          <p className="text-slate-400 text-sm mb-4">
            Status: <span className="font-medium text-slate-300">{permission ?? "…"}</span>
          </p>
          {permission === "denied" && (
            <p className="text-amber-200/90 text-sm mb-4">
              Reative em: ícone de cadeado na barra de endereço → Notificações → Permitir.
            </p>
          )}
          <button
            type="button"
            onClick={handleEnableNotifications}
            className="rounded-xl px-4 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-400 text-slate-900 transition"
          >
            Ativar notificações
          </button>
          {tokenStatus && <p className="mt-3 text-slate-400 text-sm">{tokenStatus}</p>}
        </section>

        <section className="mt-6 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
          <h3 className="text-sm font-medium text-slate-300 mb-3">Mensagens recebidas</h3>
          {messages.length === 0 ? (
            <p className="text-slate-500 text-sm">
              Nenhuma mensagem ainda. Envie uma notificação pelo seu backend.
            </p>
          ) : (
            <ul className="space-y-2">
              {messages.map((msg, i) => (
                <li key={msg.receivedAt + i} className="text-sm p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <span className="font-medium text-amber-400">{msg.title}</span>
                  {msg.body && <span className="text-slate-400"> — {msg.body}</span>}
                  <span className="block text-slate-500 text-xs mt-1">
                    {new Date(msg.receivedAt).toLocaleTimeString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
