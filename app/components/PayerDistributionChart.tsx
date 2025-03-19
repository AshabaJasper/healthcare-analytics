import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#8dd1e1'];

const PayerDistributionChart = ({ claimData, filters }) => {
  const [chartData, setChartData] = useState([]);
  const [metric, setMetric] = useState('count');

  useEffect(() => {
    if (!claimData || claimData.length === 0) return;

    // Apply global filters
    let filteredData = claimData;
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          filteredData = filteredData.filter(claim => claim[key] === value);
        }
      });
    }

    // Group by payer
    const payerGroups = filteredData.reduce((acc, claim) => {
      const payer = claim.payerName || 'Unknown';
      if (!acc[payer]) {
        acc[payer] = {
          count: 0,
          totalAmount: 0,
          claims: []
        };
      }
      acc[payer].count += 1;
      acc[payer].totalAmount += parseFloat(claim.paymentAllowedAmount || 0);
      acc[payer].claims.push(claim);
      return acc;
    }, {});

    // Transform into chart data
    const data = Object.entries(payerGroups).map(([payer, data]) => ({
      name: payer,
      count: data.count,
      value: metric === 'count' ? data.count : data.totalAmount,
      totalAmount: data.totalAmount,
      avgAmount: data.totalAmount / data.count
    }));

    // Sort by the selected metric
    data.sort((a, b) => b.value - a.value);

    // If there are more than 8 payers, group the smallest ones into "Others"
    if (data.length > 8) {
      const topPayers = data.slice(0, 7);
      const otherPayers = data.slice(7);
      
      const others = {
        name: 'Others',
        count: otherPayers.reduce((sum, payer) => sum + payer.count, 0),
        totalAmount: otherPayers.reduce((sum, payer) => sum + payer.totalAmount, 0),
        value: metric === 'count' 
          ? otherPayers.reduce((sum, payer) => sum + payer.count, 0)
          : otherPayers.reduce((sum, payer) => sum + payer.totalAmount, 0)
      };
      others.avgAmount = others.totalAmount / others.count;
      
      setChartData([...topPayers, others]);
    } else {
      setChartData(data);
    }
  }, [claimData, filters, metric]);

  const handleMetricChange = (e) => {
    setMetric(e.target.value);
  };

  const formatTooltip = (value, name, props) => {
    const entry = chartData.find(item => item.name === name);
    if (!entry) return [value, name];
    
    if (metric === 'count') {
      return [`${entry.count} claims`, name];
    } else {
      return [
        `$${entry.totalAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
        name
      ];
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h4 className="text-md font-medium">Payer Distribution</h4>
        <select
          value={metric}
          onChange={handleMetricChange}
          className="block w-[180px] rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="count">Claim Count</option>
          <option value="amount">Total Amount</option>
        </select>
      </div>
      <div className="h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayerDistributionChart;