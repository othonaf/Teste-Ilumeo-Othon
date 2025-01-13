
interface ShiftEntry {
    id: number;
    startTime: string;
    endTime: string;
    createdAt: string;
  }
  
  interface FormattedShift {
    date: string;
    totalHours: string;
  }
  
  export function formatShiftData(data: ShiftEntry[]): FormattedShift[] {
    return data.map(entry => ({
      date: formatDate(entry.startTime),
      totalHours: calculateHours(entry.startTime, entry.endTime)
    }));
  }
  
  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  }
  
  function calculateHours(start: string, end: string): string {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diff = endTime.getTime() - startTime.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }
  