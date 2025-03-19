import * as XLSX from "xlsx";

/**
 * Parse Excel file and return JSON data
 */
export function parseExcelFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Convert array of objects to Excel file and trigger download
 */
export function exportToExcel(data: any[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  
  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

/**
 * Validate that the Excel file has the expected columns
 */
export function validateExcelHeaders(headers: string[], expectedHeaders: string[]): boolean {
  const missingHeaders = expectedHeaders.filter(
    (header) => !headers.includes(header)
  );
  
  return missingHeaders.length === 0;
}

/**
 * Get column headers from Excel data
 */
export function getExcelHeaders(data: any[]): string[] {
  if (data.length === 0) return [];
  return Object.keys(data[0]);
}

/**
 * Process date fields in Excel data
 * Converts Excel date numbers to JavaScript Date objects
 */
export function processExcelDates(data: any[]): any[] {
  const dateFields = [
    "paymentReceived",
    "paymentEntered",
    "chargeFromDate",
    "chargeToDate"
  ];
  
  return data.map(row => {
    const processedRow = { ...row };
    
    dateFields.forEach(field => {
      if (processedRow[field]) {
        // If it's an Excel date number
        if (typeof processedRow[field] === "number") {
          processedRow[field] = XLSX.SSF.parse_date_code(processedRow[field]);
        } 
        // If it's a string date, try to parse it
        else if (typeof processedRow[field] === "string") {
          processedRow[field] = new Date(processedRow[field]);
        }
      }
    });
    
    return processedRow;
  });
}