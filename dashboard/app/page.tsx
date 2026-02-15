
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Zap, BookOpen, Play, Loader2, Sparkles, Users, ArrowRight } from 'lucide-react';
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
    role: 'A Fofoqueira',
    desc: 'Links & Navegação',
    icon: <Search className="w-6 h-6 text-white" />,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500 to-rose-500',
    specialty: 'Links',
  },
  {
    id: 'tereza',
    name: 'Tereza',
    role: 'A Tia da Limpeza',
    desc: 'Linting & Boas Práticas',
    icon: <Zap className="w-6 h-6 text-white" />,
    color: 'text-yellow-400',
    bgGradient: 'from-amber-500 to-yellow-500',
    specialty: 'Quality',
  },
  {
    id: 'judith',
    name: 'Judith',
    role: 'A Advogada',
    desc: 'Specs & Conformidade',
    icon: <BookOpen className="w-6 h-6 text-white" />,
    color: 'text-blue-400',
    bgGradient: 'from-blue-600 to-indigo-600',
    specialty: 'Specs',
  },
  {
    id: 'rosangela',
    name: 'Rosângela',
    role: 'A Segurança',
    desc: 'Segurança & HTTPS',
    icon: <Shield className="w-6 h-6 text-white" />,
    color: 'text-red-400',
    bgGradient: 'from-red-600 to-orange-600',
    specialty: 'Security',
  },
];

export default function LandingPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null); // 'squad' or agentId
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleScan = async () => {
    if (!url || !selectedAgent) return;
    setLoading(true);
    setReportData(null);

    try {
      // Mock API call
      await fetch('/api/scan', {
        method: 'POST',
        body: JSON.stringify({ url, agent: selectedAgent })
      });

      // Fast-forward to result (mock)
      // Wait a bit for the agent to potentially start/write (in real scenario, we might poll)
      // For now, we assume immediate availability for the demo flow or just try fetching
      await new Promise(resolve => setTimeout(resolve, 1000));

      const res = await fetch('/api/report');
      if (res.ok) {
        const data = await res.json();
        // Inject mock url if needed
        setReportData({ ...data, url: url.startsWith('http') ? url : `https://${url}` });
      }
    } catch (e) {
      console.error("Scan failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto">

        {/* Header / Intro */}
        {!reportData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4 pt-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nova Análise</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-indigo-100 to-indigo-400">
                Quem vai testar hoje?
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Selecione um especialista ou chame o squad completo para uma varredura total.
            </p>
          </motion.div>
        )}

        {/* Selection Grid */}
        <AnimatePresence>
          {!reportData && (
            <motion.div
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
            >
              {/* Squad Option */}
              <div
                onClick={() => setSelectedAgent('squad')}
                className={clsx(
                  "col-span-1 md:col-span-5 lg:col-span-1 p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/20",
                  selectedAgent === 'squad'
                    ? "bg-indigo-600 border-indigo-400 ring-4 ring-indigo-500/20"
                    : "bg-gradient-to-br from-slate-900 to-slate-800 border-white/10 hover:border-white/20"
                )}
              >
                <div className="absolute inset-0 bg-noise opacity-10" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-3">
                  <div className="p-3 bg-white/10 rounded-xl mb-1">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white leading-tight">Squad<br />Completo</h3>
                  </div>
                </div>
                {selectedAgent === 'squad' && (
                  <motion.div layoutId="check" className="absolute top-3 right-3 text-white"><CheckCircleIcon /></motion.div>
                )}
              </div>

              {/* Individual Agents */}
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={clsx(
                    "p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden group",
                    selectedAgent === agent.id
                      ? "bg-slate-800 border-white ring-2 ring-white/20 scale-[1.02]"
                      : "bg-slate-900/50 border-white/5 hover:bg-slate-800 hover:border-white/10"
                  )}
                >
                  <div className={clsx("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br", agent.bgGradient)} />
                  <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                    <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-inner", agent.bgGradient)}>
                      {agent.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{agent.name}</h3>
                      <p className="text-xs text-slate-400 font-medium uppercase mt-1 tracking-wide">{agent.specialty}</p>
                    </div>
                  </div>
                  {selectedAgent === agent.id && (
                    <motion.div layoutId="check" className="absolute top-3 right-3 text-white"><CheckCircleIcon /></motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input & Action */}
        <AnimatePresence>
          {!reportData && (
            <motion.div
              exit={{ opacity: 0, y: 20 }}
              className="max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl shadow-black/50 ring-1 ring-white/5"
            >
              <div className="relative flex-1">
                <input
                  type="url"
                  placeholder="https://seudominio.com.br"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full h-14 pl-6 pr-4 bg-transparent text-white placeholder:text-slate-600 focus:outline-none rounded-xl hover:bg-white/5 transition-colors text-lg"
                />
              </div>
              <button
                onClick={handleScan}
                disabled={!selectedAgent || !url || loading}
                className="h-14 px-8 bg-white text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-3 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analisando...</span>
                  </>
                ) : (
                  <>
                    <span>Iniciar</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results View */}
        <AnimatePresence>
          {reportData && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={() => setReportData(null)}
                className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Voltar para seleção
              </button>

              <ResultsView data={reportData} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
  )
}
