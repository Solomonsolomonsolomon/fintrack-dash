import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingState({ 
  message = "Loading...", 
  size = "md" 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-gray-400 mb-4`} />
      <p className="text-gray-600">{message}</p>
    </div>
  );
} 