import React, { useState, useMemo } from 'react';
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
  // Calculate the maximum value for initial scaling
  const maxValue = useMemo(() => {
    return Math.max(
      ...data.map(item => Math.max(
        item.averageAllowedAmount,
        item.minAllowedAmount,
        item.maxAllowedAmount,
        item.medianAllowedAmount,
        item.modeAllowedAmount
      ))
    );
  }, [data]);

  // Round up the max value to the nearest 50,000
  const roundedMaxValue = useMemo(() => {
    return Math.ceil(maxValue / 50000) * 50000;
  }, [maxValue]);

  // State for Y-axis scaling
  const [yAxisScale, setYAxisScale] = useState(1);

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

  // Calculate the actual Y-axis max based on scale
  const calculatedYAxisMax = useMemo(() => {
    return roundedMaxValue * yAxisScale;
  }, [roundedMaxValue, yAxisScale]);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-4">
        <div className="flex-grow h-[500px]">
          {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, calculatedYAxisMax]} 
                ticks={[
                  0,
                  calculatedYAxisMax * 0.25,
                  calculatedYAxisMax * 0.5,
                  calculatedYAxisMax * 0.75,
                  calculatedYAxisMax
                ]}
                tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })} 
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
      </div>
      
      {/* Y-Axis Scale Control */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <span className="text-sm text-gray-600">Scale:</span>
        <input 
          type="range" 
          min="0.5" 
          max="2" 
          step="0.1" 
          value={yAxisScale}
          onChange={(e) => setYAxisScale(parseFloat(e.target.value))}
          className="w-64"
        />
        <span className="text-sm text-gray-600 w-12 text-center">
          {yAxisScale.toFixed(1)}x
        </span>
      </div>
    </div>
  );
}