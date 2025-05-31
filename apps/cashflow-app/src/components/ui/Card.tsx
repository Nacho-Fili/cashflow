import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface MetricCardProps {
    title: string;
    value: string;
    percentage: string;
    isPositive: boolean;
    icon: LucideIcon;
    iconColor?: string;
}

export function MetricCard({
    title,
    value,
    percentage,
    isPositive,
    icon: Icon,
    iconColor = 'bg-primary-600',
}: MetricCardProps) {
    return (
        <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-all duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={clsx('w-12 h-12 rounded-lg flex items-center justify-center', iconColor)}>
                            <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-white text-2xl font-bold">{value}</p>
                        <div className="flex items-center gap-2">
                            <span
                                className={clsx(
                                    'text-sm font-medium',
                                    isPositive ? 'text-green-400' : 'text-red-400'
                                )}
                            >
                                {percentage}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatsCardProps {
    children: ReactNode;
    className?: string;
}

export function StatsCard({ children, className }: StatsCardProps) {
    return (
        <div className={clsx(
            'bg-slate-800 border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-all duration-200',
            className
        )}>
            {children}
        </div>
    );
}
