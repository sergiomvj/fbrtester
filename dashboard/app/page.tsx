
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Zap, BookOpen, Play, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Types ---
type AgentProfile = {
  id: string;
  name: string;
  role: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  specialty: string;
};

// --- Data: The 8Tester Squad ---
const agents: AgentProfile[] = [
  {
    id: 'lurdinha',
    name: 'Lurdinha',
    role: 'A Fofoqueira Digital',
    desc: 'Sabe tudo o que acontece nas suas páginas. Não deixa passar um link quebrado sequer!',
    icon: <Search className="w-8 h-8 text-white" />,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500 to-rose-500',
    specialty: 'Links & Navegação',
  },
  {
    id: 'tereza',
    name: 'Tereza',
    role: 'A Tia da Limpeza',
    desc: 'Detesta bagunça no código. Se tiver "any" ou console.log esquecido, ela vai reclamar.',
    icon: <Zap className="w-8 h-8 text-white" />,
    color: 'text-yellow-400',
    bgGradient: 'from-amber-500 to-yellow-500',
    specialty: 'Linting & Boas Práticas',
  },
  {
    id: 'judith',
    name: 'Judith',
    role: 'A Advogada',
    desc: 'Cobra o que foi prometido no contrato. Se o conceito diz X e você fez Y, ela processa.',
    icon: <BookOpen className="w-8 h-8 text-white" />,
    color: 'text-blue-400',
    bgGradient: 'from-blue-600 to-indigo-600',
    specialty: 'Specs & Conformidade',
  },
  {
    id: 'rosangela',
    name: 'Rosângela',
    role: 'A Segurança da Balada',
    desc: 'Barrada no baile! Ninguém entra sem HTTPS e dependência atualizada.',
    icon: <Shield className="w-8 h-8 text-white" />,
    color: 'text-red-400',
    bgGradient: 'from-red-600 to-orange-600',
    specialty: 'Segurança & Vulnerabilidades',
  },
];

export default function LandingPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = async () => {
    if (!url || !selectedAgent) return;
    setLoading(true);
    setResult(null);

    // TODO: Connect to backend API
    // For now, simulate a delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    setLoading(false);
    setResult({
      success: true,
      message: `A agente ${agents.find(a => a.id === selectedAgent)?.name} finalizou a ronda!`,
      link: '/report.json'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-purple-900/20">
              8
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-200">Tester</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <button className="hover:text-white transition-colors">Agentes</button>
            <button className="hover:text-white transition-colors">Dashboard</button>
            <button className="hover:text-white transition-colors">Sobre</button>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full -z-10 opacity-50" />

        {/* Hero */}
        <div className="text-center mb-20 space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/10 text-purple-400 text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Squad de QA via IA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500">
              Quem vai testar hoje?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Escolha sua agente favorita e deixe que ela encontre os bugs antes do seu cliente (ou chefe) perceber.
          </motion.p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-2">
          {agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              onClick={() => setSelectedAgent(agent.id)}
              className={clsx(
                "group relative overflow-hidden rounded-3xl p-6 cursor-pointer border transition-all duration-300 h-full",
                selectedAgent === agent.id
                  ? "bg-slate-900 border-purple-500 ring-2 ring-purple-500/20 scale-[1.02] shadow-2xl shadow-purple-900/20"
                  : "bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-800/60"
              )}
            >
              {/* Background Gradient on Hover/Active */}
              <div className={clsx(
                "absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-br",
                agent.bgGradient,
                selectedAgent === agent.id ? "opacity-5" : "group-hover:opacity-5"
              )} />

              <div className="relative z-10 flex flex-col h-full">
                <div className={clsx(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
                  agent.bgGradient
                )}>
                  {agent.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {agent.name}
                </h3>

                <p className={clsx("text-xs font-bold uppercase tracking-wider mb-4", agent.color)}>
                  {agent.role}
                </p>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">
                  {agent.desc}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-slate-500 group-hover:text-slate-400 transition-colors">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{agent.specialty}</span>
                </div>
              </div>

              {selectedAgent === agent.id && (
                <motion.div
                  layoutId="selected-check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl shadow-black/50 ring-1 ring-white/5">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="url"
                placeholder="https://exemplo.com.br"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-transparent text-white placeholder:text-slate-600 focus:outline-none rounded-xl hover:bg-white/5 transition-colors text-lg"
              />
            </div>
            <button
              onClick={handleScan}
              disabled={!selectedAgent || !url || loading}
              className="h-14 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Iniciar Teste</span>
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          <div className="mt-8 h-20 flex justify-center items-center">
            <AnimatePresence mode="wait">
              {!selectedAgent && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-slate-500 bg-slate-900/50 px-4 py-2 rounded-full border border-white/5"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Selecione uma agente acima para começar</span>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-center flex items-center gap-3 pr-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm text-emerald-300">Sucesso!</p>
                      <p className="text-sm">{result.message}</p>
                    </div>
                  </div>
                  <a href="/report.json" target="_blank" className="text-xs text-emerald-500/60 hover:text-emerald-400 underline transition-colors">
                    Ver Relatório JSON
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
