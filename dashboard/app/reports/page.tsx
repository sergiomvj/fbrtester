'use client';

import { motion } from 'framer-motion';
import { FileText, Calendar, ArrowRight, CheckCircle, AlertTriangle, XCircle, Download } from 'lucide-react';
import clsx from 'clsx';

// Mock Data for Reports
const reports = [
    { id: 1, url: 'https://example.com', date: 'Hoje, 14:30', score: 92, status: 'success', agents: ['Lurdinha', 'Tereza'] },
    { id: 2, url: 'https://test-site.com', date: 'Ontem, 09:15', score: 65, status: 'warning', agents: ['Squad Completo'] },
    { id: 3, url: 'https://broken-app.dev', date: '12/02/2026', score: 30, status: 'error', agents: ['Rosângela'] },
    { id: 4, url: 'https://my-portfolio.io', date: '10/02/2026', score: 98, status: 'success', agents: ['Judith'] },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

export default function ReportsPage() {
    return (
        <div className="min-h-screen text-white p-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-6xl mx-auto space-y-8"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Histórico de Relatórios</h1>
                        <p className="text-slate-400">Consulte análises anteriores e acompanhe a evolução.</p>
                    </div>
                    {/* Placeholder for future export button */}
                    {/* <button className="glass-button px-4 py-2 flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" /> Exportar CSV
                    </button> */}
                </div>

                <div className="space-y-4">
                    {reports.map((report) => (
                        <motion.div
                            key={report.id}
                            variants={itemVariants}
                            className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/5 transition-colors group"
                        >
                            <div className="flex items-center gap-6 flex-1">
                                <div className={clsx(
                                    "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg",
                                    report.score >= 90 ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50" :
                                        report.score >= 50 ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50" :
                                            "bg-red-500/20 text-red-400 ring-1 ring-red-500/50"
                                )}>
                                    {report.score}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                                        {new URL(report.url).hostname}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {report.date}
                                        </span>
                                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                        <span>{report.agents.join(', ')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {report.status === 'success' && <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">Aprovado</div>}
                                {report.status === 'warning' && <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">Atenção</div>}
                                {report.status === 'error' && <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">Falha</div>}

                                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
