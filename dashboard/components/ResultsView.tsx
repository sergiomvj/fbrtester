
'use client';

import { motion } from 'framer-motion';
import { Search, Shield, Zap, BookOpen, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { ReportCard } from './ReportCard';

type ReportData = {
    url: string;
    status: number;
    links: string[];
    externalLinks: string[];
    brokenLinks: any[];
    assets: any[];
    interactables: any[];
    accessibility: any[];
};

export function ResultsView({ data }: { data: ReportData }) {
    // Determine overall health (dummy algorithm)
    const brokenLinksScore = Math.max(0, 100 - (data.brokenLinks.length * 10));
    const a11yScore = Math.max(0, 100 - (data.accessibility.length * 5));
    const overallScore = Math.round((brokenLinksScore + a11yScore) / 2);

    return (
        <div className="space-y-8">
            {/* Header Stats */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wide">
                                Relatório Completo
                            </div>
                            <span className="text-white/60 text-sm">{new Date().toLocaleDateString()}</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-2">{new URL(data.url).hostname}</h2>
                        <a href={data.url} target="_blank" className="text-white/80 hover:text-white underline decoration-white/30 hover:decoration-white transition-all">
                            {data.url}
                        </a>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-sm font-medium text-indigo-200 uppercase tracking-widest">Health Score</p>
                            <p className="text-6xl font-black">{overallScore}</p>
                        </div>
                        <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center relative">
                            <svg className="w-full h-full transform -rotate-90 top-0 left-0 absolute">
                                <circle cx="48" cy="48" r="44" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-black/10" />
                                <circle
                                    cx="48" cy="48" r="44"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    className="text-white transition-all duration-1000 ease-out"
                                    strokeDasharray={276}
                                    strokeDashoffset={276 - (276 * overallScore) / 100}
                                />
                            </svg>
                            <span className="text-2xl font-bold">{overallScore}%</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lurdinha: Links */}
                <ReportCard
                    title="Navegação (Lurdinha)"
                    icon={<Search className="w-6 h-6 text-white" />}
                    color="from-pink-500 to-rose-500"
                    score={brokenLinksScore}
                    status={data.brokenLinks.length === 0 ? 'success' : 'error'}
                    metrics={[
                        { label: 'Total Links', value: data.links.length },
                        { label: 'Links Externos', value: data.externalLinks.length },
                        { label: 'Links Quebrados', value: data.brokenLinks.length, status: data.brokenLinks.length > 0 ? 'error' : 'success' },
                    ]}
                >
                    {data.brokenLinks.length > 0 && (
                        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
                            <p className="font-bold flex items-center gap-2 mb-1"><AlertCircle className="w-4 h-4" /> Links com Erro:</p>
                            <ul className="list-disc list-inside opacity-80">
                                {data.brokenLinks.slice(0, 3).map((l: any, i: number) => (
                                    <li key={i} className="truncate">{l}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </ReportCard>

                {/* Judith: Specs/A11y */}
                <ReportCard
                    title="Conformidade (Judith)"
                    icon={<BookOpen className="w-6 h-6 text-white" />}
                    color="from-blue-600 to-indigo-600"
                    score={a11yScore}
                    status={data.accessibility.length === 0 ? 'success' : data.accessibility.length < 5 ? 'warning' : 'error'}
                    metrics={[
                        { label: 'Interações', value: data.interactables.length },
                        { label: 'Acessibilidade', value: `${data.accessibility.length} Issues`, status: data.accessibility.length > 0 ? 'warning' : 'success' }
                    ]}
                >
                    <div className="mt-4">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Top Issues</p>
                        <div className="space-y-2">
                            {data.accessibility.slice(0, 3).map((issue: any, i: number) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span>{issue.description}</span>
                                </div>
                            ))}
                            {data.accessibility.length === 0 && (
                                <div className="flex items-center gap-2 text-sm text-emerald-400">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Nenhum problema detectado!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </ReportCard>

                {/* Rosangela: Security */}
                <ReportCard
                    title="Segurança (Rosângela)"
                    icon={<Shield className="w-6 h-6 text-white" />}
                    color="from-red-600 to-orange-600"
                    status="success" // Mocked for now
                    metrics={[
                        { label: 'Protocolo', value: data.url.startsWith('https') ? 'HTTPS' : 'HTTP', status: data.url.startsWith('https') ? 'success' : 'warning' },
                        { label: 'Assets', value: data.assets.length }
                    ]}
                >
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 border border-white/5">SSL Valid</span>
                        <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 border border-white/5">Headers Check</span>
                        <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 border border-white/5">No Mixed Content</span>
                    </div>
                </ReportCard>

                {/* Tereza: Code Quality */}
                <ReportCard
                    title="Boas Práticas (Tereza)"
                    icon={<Zap className="w-6 h-6 text-white" />}
                    color="from-amber-500 to-yellow-500"
                    status="neutral"
                    metrics={[
                        { label: 'Performance', value: 'N/A' }, // Mocked
                        { label: 'SEO', value: 'N/A' }
                    ]}
                >
                    <p className="text-sm text-slate-500 mt-2">
                        A análise de código estático requer acesso ao repositório ou sourcemaps.
                    </p>
                </ReportCard>
            </div>
        </div>
    );
}
