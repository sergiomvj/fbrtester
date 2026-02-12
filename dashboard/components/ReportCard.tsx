
'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

interface ReportCardProps {
    title: string;
    icon: React.ReactNode;
    score?: number;
    status: 'success' | 'warning' | 'error' | 'neutral';
    metrics: { label: string; value: string | number; status?: 'success' | 'warning' | 'error' }[];
    color: string;
    children?: React.ReactNode;
}

export function ReportCard({ title, icon, score, status, metrics, color, children }: ReportCardProps) {
    const statusColors = {
        success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        warning: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        error: 'bg-red-500/10 border-red-500/20 text-red-400',
        neutral: 'bg-slate-800/50 border-white/5 text-slate-400',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl"
        >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg", color)}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">{title}</h3>
                        {score !== undefined && (
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={clsx("h-full rounded-full transition-all duration-1000",
                                            score > 80 ? "bg-emerald-500" : score > 50 ? "bg-amber-500" : "bg-red-500"
                                        )}
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                                <span>{score}/100</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={clsx("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border", statusColors[status])}>
                    {status}
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{metric.label}</p>
                            <p className={clsx("text-lg font-bold",
                                metric.status === 'error' ? 'text-red-400' :
                                    metric.status === 'success' ? 'text-emerald-400' :
                                        metric.status === 'warning' ? 'text-amber-400' : 'text-white'
                            )}>
                                {metric.value}
                            </p>
                        </div>
                    ))}
                </div>
                {children}
            </div>
        </motion.div>
    );
}
