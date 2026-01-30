import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Warning Guy" },
    {
      name: "description",
      content:
        "Simulador de Firebase Cloud Messaging (FCM) — teste push notifications na web.",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-amber-950/10 flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.15),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(251,191,36,0.06),transparent)] pointer-events-none" />

      <header className="relative flex justify-end items-center gap-3 p-6">
        <Link
          to="/login"
          className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition border border-slate-700/50"
        >
          Entrar
        </Link>
        <Link
          to="/cadastro"
          className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 transition shadow-lg shadow-amber-500/20"
        >
          Cadastrar
        </Link>
      </header>

      <main className="relative flex-1 flex flex-col items-center justify-center px-6 pb-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 mb-8">
          <svg
            className="w-8 h-8 text-amber-400"
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
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Warning Guy
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-md">
          Simulador de Firebase Cloud Messaging. Cadastre-se e teste o fluxo de
          notificações push na web.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/cadastro"
            className="rounded-xl px-8 py-4 text-base font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 transition shadow-lg shadow-amber-500/25 hover:shadow-amber-400/30"
          >
            Começar grátis
          </Link>
          <Link
            to="/login"
            className="rounded-xl px-8 py-4 text-base font-medium text-slate-300 hover:text-white border border-slate-600 hover:bg-slate-800/50 transition"
          >
            Já tenho conta
          </Link>
        </div>
      </main>

      <footer className="relative py-6 text-center text-slate-500 text-sm">
        Simulador Firebase Messaging — Warning Guy
      </footer>
    </div>
  );
}
