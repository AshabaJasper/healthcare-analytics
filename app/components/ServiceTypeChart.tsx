import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { formatCurrency } from '~/utils/dataUtils';

const ServiceTypeChart = ({ claimData, filters }) => {
  const [chartData, setChartData] = useState([]);

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

    // Group by service type
    const serviceGroups = filteredData.reduce((acc, claim) => {
      const serviceType = claim.serviceType || 'Unknown';
      if (!acc[serviceType]) {
        acc[serviceType] = {
          count: 0,
          totalAmount: 0,
        };
      }
      acc[serviceType].count += 1;
      acc[serviceType].totalAmount += parseFloat(claim.allowedAmount || 0);
      return acc;
    }, {});

    // Transform into chart data
    const data = Object.entries(serviceGroups).map(([serviceType, data]) => ({
      name: serviceType,
      count: data.count,
      totalAmount: data.totalAmount,
      avgAmount: data.totalAmount / data.count,
    }));

    // Sort by count (descending)
    data.sort((a, b) => b.count - a.count);

    // Limit to top 10 service types for readability
    setChartData(data.slice(0, 10));
  }, [claimData, filters]);

  // Custom tooltip formatter
  const tooltipFormatter = (value, name) => {
    if (name === 'totalAmount') {
      return [formatCurrency(value), 'Total Amount'];
    } else if (name === 'avgAmount') {
      return [formatCurrency(value), 'Avg Amount'];
    }
    return [value, name === 'count' ? 'Count' : name];
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Service Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 100,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80} 
                  tick={{ fontSize: 12 }} 
                />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#82ca9d" 
                  tickFormatter={(value) => formatCurrency(value)} 
                />
                <Tooltip formatter={tooltipFormatter} />
                <Legend />
                <Bar dataKey="count" name="Number of Claims" yAxisId="left" fill="#8884d8" />
                <Bar dataKey="avgAmount" name="Average Amount" yAxisId="right" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTypeChart;