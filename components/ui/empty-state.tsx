import { Button } from "@/components/ui/button";
import { FileText, Plus, Search } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  variant?: "default" | "search" | "transactions";
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  variant = "default",
}: EmptyStateProps) {
  const getDefaultIcon = () => {
    switch (variant) {
      case "search":
        return <Search className="w-12 h-12 text-gray-400" />;
      case "transactions":
        return <FileText className="w-12 h-12 text-gray-400" />;
      default:
        return <FileText className="w-12 h-12 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="mb-4">{icon || getDefaultIcon()}</div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-600 mb-6 max-w-sm">{description}</p>

      {action && (
        <Button
          onClick={action.onClick}
          className="flex items-center gap-2 bg-[##4B8B9F]"
        >
          {action.icon || <Plus className="w-4 h-4" />}
          {action.label}
        </Button>
      )}
    </div>
  );
} 