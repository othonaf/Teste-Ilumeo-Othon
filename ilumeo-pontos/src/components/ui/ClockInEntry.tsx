interface ClockInEntryProps {
    date: string;
    hours: string;
}

export function ClockInEntry({ date, hours }: ClockInEntryProps) {
    return (
        <div className="flex justify-between items-center bg-slate-800 rounded-[4px] p-2">
            <span className="text-sm text-gray-400">{date}</span>
            <span className="text-sm text-white">{hours}</span>
        </div>
    )
}
