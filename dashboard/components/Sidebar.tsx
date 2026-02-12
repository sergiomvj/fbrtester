
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
        <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-40 hidden md:flex">
            {/* Brand */}
            <div className="h-20 flex items-center px-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-900/20 text-white">
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
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                                isActive
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            )}
                        >
                            <item.icon className={clsx('w-5 h-5', isActive ? 'text-white' : 'text-slate-500 group-hover:text-purple-400')} />
                            <span className="font-medium">{item.name}</span>
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
