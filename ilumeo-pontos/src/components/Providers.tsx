'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClockInProvider } from "@/contexts/ClockInContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClockInProvider>
        {children}
      </ClockInProvider>
    </QueryClientProvider>
  );
}
