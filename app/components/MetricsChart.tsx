import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '~/utils/dataUtils';

interface MetricsChartProps {
  data: {
    LOC: string;
    averageAllowedAmount: number;
    minAllowedAmount: number;
    maxAllowedAmount: number;
    medianAllowedAmount: number;
    modeAllowedAmount: number;
  }[];
  title?: string;
}

export default function MetricsChart({ data, title }: MetricsChartProps) {
  // Prepare data for the chart
  const chartData = data.map(item => ({
    name: item.LOC,
    Average: item.averageAllowedAmount,
    Minimum: item.minAllowedAmount,
    Maximum: item.maxAllowedAmount,
    Median: item.medianAllowedAmount,
    Mode: item.modeAllowedAmount
  }));

  // Custom tooltip formatter to display currency values
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold text-gray-700">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[500px]">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })} 
            domain={[0, 'dataMax + 10000']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            layout="horizontal" 
            align="center" 
            verticalAlign="bottom" 
            wrapperStyle={{ 
              paddingTop: '10px',
              paddingBottom: '10px'
            }}
          />
          <Bar dataKey="Average" fill="#8884d8" name="Average" />
          <Bar dataKey="Minimum" fill="#82ca9d" name="Minimum" />
          <Bar dataKey="Maximum" fill="#ffc658" name="Maximum" />
          <Bar dataKey="Median" fill="#ff8042" name="Median" />
          <Bar dataKey="Mode" fill="#0088FE" name="Mode" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}