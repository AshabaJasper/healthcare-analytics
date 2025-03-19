import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, description, icon, change }: StatsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          {icon && (
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-md bg-primary-500 flex items-center justify-center text-white">
                {icon}
              </div>
            </div>
          )}
          <div className={icon ? "ml-5 w-0 flex-1" : "w-full"}>
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {value}
                </div>
              </dd>
              {description && (
                <dd className="mt-1 text-sm text-gray-500">
                  {description}
                </dd>
              )}
              {change && (
                <dd className={`mt-2 text-sm ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="font-medium">
                    {change.isPositive ? '+' : ''}
                    {change.value}%
                  </span>{' '}
                  <span>
                    {change.isPositive ? 'increase' : 'decrease'}
                  </span>
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}