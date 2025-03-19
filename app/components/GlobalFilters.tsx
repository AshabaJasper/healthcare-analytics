import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { X } from 'lucide-react';

const GlobalFilters = ({ claimData, onFiltersChange }) => {
  const [filters, setFilters] = useState({
    levelOfCare: '',
    payer: '',
    provider: '',
    serviceType: '',
    admitType: '',
    dischargeDisposition: '',
  });

  const [options, setOptions] = useState({
    levelOfCare: [],
    payer: [],
    provider: [],
    serviceType: [],
    admitType: [],
    dischargeDisposition: [],
  });

  // Extract unique values for filter options
  useEffect(() => {
    if (!claimData || claimData.length === 0) return;

    const extractUniqueValues = (field) => {
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
  const handleFilterChange = (field, value) => {
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
            <Select value={filters.levelOfCare} onValueChange={(value) => handleFilterChange('levelOfCare', value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select LOC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {options.levelOfCare.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Payer</label>
            <Select value={filters.payer} onValueChange={(value) => handleFilterChange('payer', value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Payer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {options.payer.map((payer) => (
                  <SelectItem key={payer} value={payer}>{payer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Provider</label>
            <Select value={filters.provider} onValueChange={(value) => handleFilterChange('provider', value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {options.provider.map((provider) => (
                  <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Service Type</label>
            <Select value={filters.serviceType} onValueChange={(value) => handleFilterChange('serviceType', value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {options.serviceType.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeFilterCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters} 
              className="mt-6 ml-auto"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters ({activeFilterCount})
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalFilters;