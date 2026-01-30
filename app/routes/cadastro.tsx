import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/cadastro";
import { register } from "../lib/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cadastro | Warning Guy" },
    {
      name: "description",
      content: "Crie sua conta — simulador Firebase Messaging",
    },
  ];
}

export default function Cadastro() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const user = register(email, name, birthDate);
      navigate("/dashboard", { replace: true });
      return;
    } catch {
      setError("Algo deu errado. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-amber-950/20 px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.15),transparent)] pointer-events-none" />
      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Warning Guy
          </h1>
          <p className="text-slate-400 mt-2">Crie sua conta para testar o FCM</p>
        </div>

        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/30">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                placeholder="Seu nome"
              />
            </div>

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
                htmlFor="birthDate"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Data de nascimento
              </label>
              <input
                id="birthDate"
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition scheme-dark"
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
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-3 px-4 transition shadow-lg shadow-amber-500/25 hover:shadow-amber-400/30 mt-2"
            >
              Cadastrar
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400 text-sm">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-amber-400 hover:text-amber-300 font-medium"
            >
              Entrar
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
