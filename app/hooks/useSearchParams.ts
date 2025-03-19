import { useSearchParams as useRemixSearchParams } from "@remix-run/react";

/**
 * Enhanced useSearchParams hook for easier handling of search parameters
 */
export function useSearchParams() {
  const [searchParams, setSearchParams] = useRemixSearchParams();

  // Get parameter value with type conversion
  const getParam = <T>(
    name: string,
    defaultValue: T,
    converter?: (value: string) => T
  ): T => {
    const value = searchParams.get(name);
    if (value === null) return defaultValue;
    
    if (converter) {
      return converter(value);
    }
    
    if (typeof defaultValue === "number") {
      return Number(value) as unknown as T;
    }
    
    if (typeof defaultValue === "boolean") {
      return (value === "true") as unknown as T;
    }
    
    return value as unknown as T;
  };

  // Set parameter with proper conversion
  const setParam = (name: string, value: string | number | boolean | null) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value === null || value === "") {
      newParams.delete(name);
    } else {
      newParams.set(name, String(value));
    }
    
    setSearchParams(newParams);
  };

  // Set multiple parameters at once
  const setParams = (params: Record<string, string | number | boolean | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(params).forEach(([name, value]) => {
      if (value === null || value === "") {
        newParams.delete(name);
      } else {
        newParams.set(name, String(value));
      }
    });
    
    setSearchParams(newParams);
  };

  return {
    searchParams,
    setSearchParams,
    getParam,
    setParam,
    setParams,
  };
}