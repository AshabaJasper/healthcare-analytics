import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { X } from 'lucide-react';

interface GlobalFiltersProps {
  claimData: any[];
  onFiltersChange: (filters: Record<string, string>) => void;
}

const GlobalFilters = ({ claimData, onFiltersChange }: GlobalFiltersProps) => {
  const [filters, setFilters] = useState({
    levelOfCare: '',
    payer: '',
    provider: '',
    serviceType: '',
    admitType: '',
    dischargeDisposition: '',
  });

  const [options, setOptions] = useState({
    levelOfCare: [] as string[],
    payer: [] as string[],
    provider: [] as string[],
    serviceType: [] as string[],
    admitType: [] as string[],
    dischargeDisposition: [] as string[],
  });

  // Extract unique values for filter options
  useEffect(() => {
    if (!claimData || claimData.length === 0) return;

    const extractUniqueValues = (field: string): string[] => {
      const values = [...new Set(claimData.map(claim => claim[field]).filter(Boolean))];
      return values.sort();
    };

    setOptions({
      levelOfCare: extractUniqueValues('levelOfCare'),
      payer: extractUniqueValues('payer'),
      provider: extractUniqueValues('provider'),
      serviceType: extractUniqueValues('serviceType'),
      admitType: extractUniqueValues('admitType'),
      dischargeDisposition: extractUniqueValues('dischargeDisposition'),
    });
  }, [claimData]);

  // Handle filter changes
  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Reset all filters
  const resetFilters = () => {
    const emptyFilters = {
      levelOfCare: '',
      payer: '',
      provider: '',
      serviceType: '',
      admitType: '',
      dischargeDisposition: '',
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(v => v && v !== '').length;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Level of Care</label>
            <Select value={filters.levelOfCare} 
                   onChange={(e) => handleFilterChange('levelOfCare', e.target.value)}>
              <option value="">All</option>
              {options.levelOfCare.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Payer</label>
            <Select value={filters.payer} 
                   onChange={(e) => handleFilterChange('payer', e.target.value)}>
              <option value="">All</option>
              {options.payer.map((payer) => (
                <option key={payer} value={payer}>{payer}</option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Provider</label>
            <Select value={filters.provider} 
                   onChange={(e) => handleFilterChange('provider', e.target.value)}>
              <option value="">All</option>
              {options.provider.map((provider) => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Service Type</label>
            <Select value={filters.serviceType} 
                   onChange={(e) => handleFilterChange('serviceType', e.target.value)}>
              <option value="">All</option>
              {options.serviceType.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Select>
          </div>

          {activeFilterCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters} 
              className="mt-6 ml-auto"
            >
              <span className="mr-1">×</span>
              Clear Filters ({activeFilterCount})
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalFilters;