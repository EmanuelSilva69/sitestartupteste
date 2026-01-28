import React, { useState, useEffect, useRef } from "react";
import { cn } from "./ui/utils";
import { Clock } from "lucide-react";

interface SimuladoTimerProps {
  initialTimeInSeconds: number;
  onTimeEnd?: () => void;
  className?: string;
}

export function SimuladoTimer({
  initialTimeInSeconds,
  onTimeEnd,
  className,
}: SimuladoTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(initialTimeInSeconds);
  }, [initialTimeInSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      onTimeEnd?.();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, onTimeEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const isCritical = timeLeft <= initialTimeInSeconds * 0.1 && timeLeft > 0;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-lg font-semibold transition-colors duration-300",
        "bg-card text-foreground border border-border shadow-lg",
        isCritical && "bg-destructive/20 text-destructive border-destructive/50 animate-pulse",
        className,
      )}
    >
      <Clock className="size-5" />
      <span>{formattedTime}</span>
    </div>
  );
}
