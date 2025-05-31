
import React from 'react';
import type { IconProps } from '../icons';

interface StatCardProps {
  icon: React.ReactElement<IconProps>;
  title: string;
  amount: string;
  percentage?: string;
  iconBgClass: string;
  iconTextClass: string;
  percentageClass?: string;
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  amount,
  percentage,
  iconBgClass,
  iconTextClass,
  percentageClass,
  subtext
}) => {
  return (
    <div className="bg-neutral-700 p-6 rounded-xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className={\`p-3 rounded-lg \${iconBgClass}\`}>
          {React.cloneElement(icon, { className: \`w-7 h-7 \${iconTextClass}\` })}
        </div>
        {percentage && <span className={\`text-sm font-semibold \${percentageClass}\`}>{percentage}</span>}
      </div>
      <div>
        <p className="text-neutral-400 text-sm mt-4 mb-1">{title}</p>
        <p className="text-neutral-100 text-3xl font-bold">{amount}</p>
        {subtext && <p className="text-xs text-neutral-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );
};
