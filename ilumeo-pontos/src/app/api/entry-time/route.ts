import { NextResponse } from 'next/server';

interface Shift {
  id: number;
  startTime: string;
  endTime: string;
  createdAt: string;
}

interface FormattedEntry {
  date: string;
  hours: string;
}

interface ApiResponse {
  data: FormattedEntry[];
  nextPage?: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  
  try {
    const response = await fetch('http://localhost:3000/shifts');
    const shifts: Shift[] = await response.json();
    
    // Ordenar por data mais recente
    const sortedShifts = shifts.sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
    
    // Processar dados para paginação
    const itemsPerPage = 10;
    const startIndex = (Number(page) - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const formattedData: FormattedEntry[] = sortedShifts.map((shift: Shift) => ({
      date: formatDate(shift.startTime),
      hours: calculateHours(shift.startTime, shift.endTime)
    }));

    const paginatedData = formattedData.slice(startIndex, endIndex);
    
    const apiResponse: ApiResponse = {
      data: paginatedData,
      nextPage: endIndex < formattedData.length ? Number(page) + 1 : undefined
    };

    return NextResponse.json(apiResponse);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao buscar dados' }, 
      { status: 500 }
    );
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
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
