import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface SwipeableCardProps {
  children: React.ReactNode;
  onDelete: () => void;
}

export const SwipeableCard = ({ children, onDelete }: SwipeableCardProps) => {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;
    
    // Only allow left swipe (positive diff) up to 100px
    const newOffset = Math.max(0, Math.min(100, diff));
    setOffset(newOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // If swiped more than 60px, trigger delete or snap back
    if (offset > 60) {
      setOffset(100);
    } else {
      setOffset(0);
    }
  };

  const handleDelete = () => {
    setOffset(0);
    onDelete();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Delete Background */}
      <div 
        className={cn(
          "absolute inset-y-0 right-0 w-24 bg-destructive flex items-center justify-center rounded-r-2xl",
          "transition-opacity duration-200",
          offset > 0 ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={handleDelete}
          className="p-3 text-destructive-foreground"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      {/* Card Content */}
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="transition-transform duration-200"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
};
