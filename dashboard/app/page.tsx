
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Zap, BookOpen, Play, Loader2, Sparkles, Users, ArrowRight, Activity, Terminal } from 'lucide-react';
import clsx from 'clsx';
import { ResultsView } from '@/components/ResultsView';

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
    role: 'Navegação',
    desc: 'Deep Link Crawler',
    icon: <Search className="w-6 h-6 text-white" />,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    specialty: 'Links & 404s',
  },
  {
    id: 'tereza',
    name: 'Tereza',
    role: 'Qualidade',
    desc: 'Static Analysis',
    icon: <Zap className="w-6 h-6 text-white" />,
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-yellow-500/20',
    specialty: 'Linting',
  },
  {
    id: 'judith',
    name: 'Judith',
    role: 'Conformidade',
    desc: 'Spec Verifier',
    icon: <BookOpen className="w-6 h-6 text-white" />,
    color: 'text-blue-400',
    bgGradient: 'from-blue-600/20 to-indigo-600/20',
    specialty: 'Requirements',
  },
  {
    id: 'rosangela',
    name: 'Rosângela',
    role: 'Segurança',
    desc: 'Security Audit',
    icon: <Shield className="w-6 h-6 text-white" />,
    color: 'text-red-400',
    bgGradient: 'from-red-600/20 to-orange-600/20',
    specialty: 'Headers & SSL',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LandingPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleScan = async () => {
    if (!url || !selectedAgent) return;
    setLoading(true);
    setReportData(null);

    try {
      await fetch('/api/scan', {
        method: 'POST',
        body: JSON.stringify({ url, agent: selectedAgent })
      });

      // Simulating delay for effect
      await new Promise(resolve => setTimeout(resolve, 1500));

      const res = await fetch('/api/report');
      if (res.ok) {
        const result = await res.json();
        const data = Array.isArray(result) ? result[0] : result;
        setReportData({ ...data, url: url.startsWith('http') ? url : `https://${url}` });
      }
    } catch (e) {
      console.error("Scan failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30">

      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        <AnimatePresence mode="wait">
          {!reportData ? (
            <motion.div
              key="selector"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center space-y-6 pt-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>8Tester Intelligence Suite</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-indigo-50 to-indigo-300">
                    Command Center
                  </span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Selecione um módulo de análise ou ative o squad completo.
                </p>
              </motion.div>

              {/* Bento Grid Selection */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">

                {/* Squad Banner (Large) */}
                <motion.button
                  variants={itemVariants}
                  onClick={() => setSelectedAgent('squad')}
                  className={clsx(
                    "md:col-span-4 p-8 rounded-3xl text-left relative overflow-hidden group transition-all duration-300",
                    selectedAgent === 'squad'
                      ? "ring-2 ring-indigo-400 shadow-[0_0_50px_-10px_rgba(99,102,241,0.3)] bg-gradient-to-r from-indigo-900/40 to-purple-900/40"
                      : "glass-card hover:bg-white/5"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Squad Completo</h3>
                        <p className="text-slate-400">Varredura simultânea de Navegação, Segurança e Qualidade.</p>
                      </div>
                    </div>
                    <div className={clsx("w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-colors", selectedAgent === 'squad' ? "bg-indigo-500 border-indigo-500" : "")}>
                      {selectedAgent === 'squad' && <div className="w-3 h-3 bg-white rounded-full" />}
                    </div>
                  </div>
                </motion.button>

                {/* Individual Agents (Small) */}
                {agents.map((agent) => (
                  <motion.button
                    key={agent.id}
                    variants={itemVariants}
                    onClick={() => setSelectedAgent(agent.id)}
                    className={clsx(
                      "p-6 rounded-3xl text-left relative overflow-hidden group transition-all duration-300 h-full flex flex-col justify-between gap-4",
                      selectedAgent === agent.id
                        ? "ring-2 ring-indigo-400 shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)] bg-gradient-to-br from-slate-800 to-slate-900"
                        : "glass-card hover:bg-white/5"
                    )}
                  >
                    <div className={clsx("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br -z-10", agent.bgGradient)} />
                    <div className="flex justify-between items-start">
                      <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center bg-black/20 backdrop-blur-md shadow-inner text-white", agent.color)}>
                        {agent.icon}
                      </div>
                      <div className={clsx("w-5 h-5 rounded-full border border-white/20 flex items-center justify-center transition-colors", selectedAgent === agent.id ? "bg-indigo-500 border-indigo-500" : "")}>
                        {selectedAgent === agent.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{agent.name}</h4>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{agent.role}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Input Area */}
              <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                <div className={clsx(
                  "glass-panel rounded-2xl p-2 flex flex-col md:flex-row gap-2 transition-all duration-300",
                  url ? "shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)] border-indigo-500/30" : ""
                )}>
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <input
                      type="url"
                      placeholder="https://"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-transparent text-white placeholder:text-slate-600 focus:outline-none rounded-xl text-lg font-mono"
                    />
                  </div>
                  <button
                    onClick={handleScan}
                    disabled={!selectedAgent || !url || loading}
                    className={clsx(
                      "h-14 px-8 font-bold rounded-xl transition-all flex items-center justify-center gap-3 min-w-[160px]",
                      !selectedAgent || !url || loading
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    )}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>...</span>
                      </>
                    ) : (
                      <>
                        <span>Iniciar</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                {/* Hints */}
                <div className="mt-4 flex justify-center gap-4 text-xs text-slate-500 font-mono">
                  <span>Try: example.com</span>
                  <span>•</span>
                  <span>Agent: 8Tester/1.0</span>
                </div>
              </motion.div>

            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
            >
              <button
                onClick={() => setReportData(null)}
                className="mb-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-sm font-medium border border-white/5"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Nova Análise</span>
              </button>

              <ResultsView data={reportData} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
