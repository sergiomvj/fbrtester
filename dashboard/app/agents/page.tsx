'use client';

import { motion } from 'framer-motion';
import { Search, Shield, Zap, BookOpen, User } from 'lucide-react';
import clsx from 'clsx';

const agents = [
    {
        id: 'lurdinha',
        name: 'Lurdinha',
        role: 'Navegação & Implementação',
        desc: 'A incansável curadora de links.',
        icon: <Search className="w-8 h-8 text-white" />,
        color: 'text-pink-400',
        bgGradient: 'from-pink-500/20 to-rose-500/20',
        details: 'Missão: Testar todos os links e itens de menu. Verificar se todas as páginas estão implementadas (sem 404s ou placeholders esquecidos).',
        tech: 'Auditor (Crawler)'
    },
    {
        id: 'tereza',
        name: 'Tereza',
        role: 'Boas Práticas & Código',
        desc: 'A guardiã da qualidade.',
        icon: <Zap className="w-8 h-8 text-white" />,
        color: 'text-amber-400',
        bgGradient: 'from-amber-500/20 to-yellow-500/20',
        details: 'Missão: Verificar se arquivos e estrutura seguem os padrões (Clean Code, Project Structure).',
        tech: 'Análise Estática, Linters'
    },
    {
        id: 'judith',
        name: 'Judith',
        role: 'Conceito & Produto',
        desc: 'A visionária do produto.',
        icon: <BookOpen className="w-8 h-8 text-white" />,
        color: 'text-blue-400',
        bgGradient: 'from-blue-600/20 to-indigo-600/20',
        details: 'Missão: Verificar se o produto final alinha com o conceito e buscar erros funcionais/visuais.',
        tech: 'Spec Verifier (AI) + Vision AI'
    },
    {
        id: 'rosangela',
        name: 'Rosângela',
        role: 'Segurança',
        desc: 'A chefe de segurança.',
        icon: <Shield className="w-8 h-8 text-white" />,
        color: 'text-red-400',
        bgGradient: 'from-red-600/20 to-orange-600/20',
        details: 'Missão: Seguir critérios mínimos de segurança (Headers, vulnerabilidades, exposição de dados).',
        tech: 'Security Scanner, Check de Headers'
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

export default function AgentsPage() {
    return (
        <div className="min-h-screen text-white p-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-6xl mx-auto space-y-12"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Conheça o <span className="text-indigo-400">Squad</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Uma equipe de agentes especializadas trabalhando em harmonia para garantir a qualidade do seu projeto.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {agents.map((agent) => (
                        <motion.div
                            key={agent.id}
                            variants={itemVariants}
                            className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:bg-white/5 transition-colors"
                        >
                            <div className={clsx("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br -z-10", agent.bgGradient)} />

                            <div className="flex items-start gap-6">
                                <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center bg-black/20 backdrop-blur-md shadow-inner shrink-0", agent.color)}>
                                    {agent.icon}
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                                        <p className={clsx("text-sm font-bold uppercase tracking-wider", agent.color)}>{agent.role}</p>
                                    </div>
                                    <p className="text-lg text-slate-300 italic">"{agent.desc}"</p>
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-slate-400 text-sm leading-relaxed">{agent.details}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pt-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                        <span>Tech: {agent.tech}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
