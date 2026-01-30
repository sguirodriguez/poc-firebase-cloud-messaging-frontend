import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { login } from "../lib/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | Warning Guy" },
    {
      name: "description",
      content: "Entre na sua conta — simulador Firebase Messaging",
    },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const user = login(email, password);
    if (user) {
      navigate("/dashboard", { replace: true });
      return;
    }
    setError("E-mail ou senha inválidos. Cadastre-se primeiro.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-amber-950/20 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.15),transparent)] pointer-events-none" />
      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Warning Guy
          </h1>
          <p className="text-slate-400 mt-2">Entre na sua conta</p>
        </div>

        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-3 px-4 transition shadow-lg shadow-amber-500/25 hover:shadow-amber-400/30"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400 text-sm">
            Não tem conta?{" "}
            <Link
              to="/cadastro"
              className="text-amber-400 hover:text-amber-300 font-medium"
            >
              Cadastre-se
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link
            to="/"
            className="text-slate-500 hover:text-slate-400 text-sm"
          >
            ← Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  );
}
