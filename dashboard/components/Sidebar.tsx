
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Play, History, Users, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { name: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Nova Análise', href: '/', icon: Play },
    { name: 'Relatórios', href: '/reports', icon: History },
    { name: 'Meus Agentes', href: '/agents', icon: Users },
    { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-950/40 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-40 hidden md:flex supports-[backdrop-filter]:bg-slate-950/40">
            {/* Brand */}
            <div className="h-24 flex items-center px-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20 text-white ring-1 ring-white/10">
                        8
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">Tester</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative',
                                isActive
                                    ? 'bg-indigo-500/10 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] border border-indigo-500/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                            )}
                            <item.icon className={clsx('w-5 h-5 transition-colors', isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-300')} />
                            <span className="font-medium tracking-wide text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sair</span>
                </button>
            </div>
        </aside>
    );
}
