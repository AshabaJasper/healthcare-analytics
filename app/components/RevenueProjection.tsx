import { useState } from 'react';
import { Link } from '@remix-run/react';
import { formatCurrency } from '~/utils/dataUtils';

interface RevenueProjectionProps {
  metrics: {
    LOC: string;
    averageAllowedAmount: number;
    minAllowedAmount: number;
    maxAllowedAmount: number;
    medianAllowedAmount: number;
    modeAllowedAmount: number;
    countOfObservation: number;
  }[];
}

const defaultDaysMap = {
  'DTX': 7, 
  'RTC': 21, 
  'PHP': 18, 
  'IOP': 30
};

type DaysMap = {
  [key: string]: number;
};

type MetricType = 'average' | 'minimum' | 'maximum' | 'median' | 'mode';

export default function RevenueProjection({ metrics }: RevenueProjectionProps) {
  const [daysMap, setDaysMap] = useState<DaysMap>(() => {
    // Initialize with default days or from previously stored values
    const storedDaysMap = typeof window !== 'undefined' 
      ? localStorage.getItem('revenueDaysMap') 
      : null;
    
    return storedDaysMap 
      ? JSON.parse(storedDaysMap) 
      : defaultDaysMap;
  });
  
  const [metricType, setMetricType] = useState<MetricType>('average');

  // Helper function to get the correct metric value based on the selected type
  const getMetricValue = (metric: any, type: MetricType) => {
    switch (type) {
      case 'average':
        return metric.averageAllowedAmount;
      case 'minimum':
        return metric.minAllowedAmount;
      case 'maximum':
        return metric.maxAllowedAmount;
      case 'median':
        return metric.medianAllowedAmount;
      case 'mode':
        return metric.modeAllowedAmount;
      default:
        return metric.averageAllowedAmount;
    }
  };

  // Calculate projections
  const projections = metrics.map(metric => {
    const days = daysMap[metric.LOC] || 0;
    const metricValue = getMetricValue(metric, metricType);
    const projectedRevenue = metricValue * days;
    
    return {
      LOC: metric.LOC,
      days,
      projectedRevenue,
      countOfObservation: metric.countOfObservation,
      metricValue
    };
  });

  // Calculate total
  const totalProjectedRevenue = projections.reduce((sum, p) => sum + p.projectedRevenue, 0);

  // Handle days change
  const handleDaysChange = (loc: string, days: number) => {
    const newDaysMap = { ...daysMap, [loc]: days };
    setDaysMap(newDaysMap);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('revenueDaysMap', JSON.stringify(newDaysMap));
    }
  };

  // Handle metric type change
  const handleMetricTypeChange = (type: MetricType) => {
    setMetricType(type);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Revenue Projections</h3>
        <p className="mt-1 text-sm text-gray-500">
          Projected revenue based on selected metric and treatment days
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="mb-4">
          <label htmlFor="metricType" className="block text-sm font-medium text-gray-700">
            Select Metric
          </label>
          <select
            id="metricType"
            value={metricType}
            onChange={(e) => handleMetricTypeChange(e.target.value as MetricType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="average">Average Allowed Amount</option>
            <option value="minimum">Minimum Allowed Amount</option>
            <option value="maximum">Maximum Allowed Amount</option>
            <option value="median">Median Allowed Amount</option>
            <option value="mode">Mode Allowed Amount</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level of Care
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {metricType.charAt(0).toUpperCase() + metricType.slice(1)} Allowed Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projected Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projections.map((projection) => (
                <tr key={projection.LOC}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link to={`/dashboard/${projection.LOC}`} className="text-primary-600 hover:underline">
                      {projection.LOC}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(projection.metricValue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {projection.countOfObservation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      min="0"
                      value={projection.days}
                      onChange={(e) => handleDaysChange(projection.LOC, parseInt(e.target.value) || 0)}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(projection.projectedRevenue)}
                  </td>
                </tr>
              ))}
              
              {/* Totals row */}
              <tr className="bg-gray-50">
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                  Total:
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {formatCurrency(totalProjectedRevenue)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}