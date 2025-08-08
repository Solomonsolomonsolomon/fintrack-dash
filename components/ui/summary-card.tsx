import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
}

export function SummaryCard({
  title,
  value,
  change,
  isPositive = true,
}: SummaryCardProps) {
  const changeColor = isPositive ? "text-green-600" : "text-blue-600";

  return (
    <Card className="bg-[#f1f5f9] rounded-xl p-3 sm:p-4 shadow-none">
      <div className="flex justify-between items-start mb-1">
        <p className="text-xs sm:text-sm font-medium text-gray-600">{title}</p>
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </div>

      <div className="text-xl sm:text-2xl font-bold text-black">{value}</div>
      <div className={`text-[11px] sm:text-xs font-medium ${changeColor}`}>
        {change}
      </div>
    </Card>
  );
}
