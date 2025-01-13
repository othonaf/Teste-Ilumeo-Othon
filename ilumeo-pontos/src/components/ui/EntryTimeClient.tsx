'use client';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClockInEntry } from "@/components/ui/ClockInEntry"
import { useClockIn } from "@/contexts/ClockInContext"

export function EntryTimeClient() {
    const { entries, totalHoursToday } = useClockIn();
    
    return (
        <Card className="w-[365px] text-white rounded-[4px] border-0">
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="font-montserrat text-[21.52px] leading-[26.23px] font-[400]">
              Relógio de ponto
            </h1>
            <span className="font-montserrat text-[21.52px] leading-[26.23px] font-[800]">
              #4SXXFMF
            </span>
          </div>

          <div className="text-center">
            <h2 className="text-[32px] font-bold">{totalHoursToday}</h2>
            <p className="text-sm text-gray-400">Horas de hoje</p>
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 h-[47px]">
            Hora de entrada
          </Button>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Dias anteriores</p>
            {entries.map((entry) => (
              <ClockInEntry 
                key={entry.date}
                date={entry.date}
                hours={entry.hours}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
}

