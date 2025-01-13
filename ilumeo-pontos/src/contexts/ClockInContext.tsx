'use client'
import { createContext, useContext, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Entry {
  date: string;
  hours: string;
}

interface ClockInContextType {
  entries: Entry[];
  totalHoursToday: string;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const ClockInContext = createContext<ClockInContextType | undefined>(undefined);

export function ClockInProvider({ children }: { children: React.ReactNode }) {
  const [totalHoursToday, setTotalHoursToday] = useState('0h 00m');

  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['clockEntries'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/entry-time?page=${pageParam}`);
      const result = await response.json();
      
      // Atualiza as horas do dia atual
      const today = new Date().toISOString().split('T')[0];
      const todayEntry = result.data.find((entry: { date: string; }) => 
        entry.date === new Date(today).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })
      );
      
      if (todayEntry) {
        setTotalHoursToday(todayEntry.hours);
      }

      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const entries = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <ClockInContext.Provider value={{ 
      entries,
      totalHoursToday,
      isLoading,
      fetchNextPage,
      hasNextPage
    }}>
      {children}
    </ClockInContext.Provider>
  );
}



export function useClockIn() {
  const context = useContext(ClockInContext);
  if (!context) {
    throw new Error('useClockIn must be used within a ClockInProvider');
  }
  return context;
}
