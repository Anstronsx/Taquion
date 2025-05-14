// src/components/chat/SuggestedActions.tsx
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react'; // For loading spinner

interface SuggestedActionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  isLoading: boolean;
}

const SuggestedActions: FC<SuggestedActionsProps> = ({ suggestions, onSelectSuggestion, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-3 text-sm text-muted-foreground flex items-center justify-center space-x-2 bg-background/50 border-t border-border">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Generating suggestions...</span>
      </div>
    );
  }

  if (!suggestions.length) {
    return null;
  }

  return (
    <div className="p-3 flex flex-wrap gap-2 justify-center items-center border-t border-border bg-background/50 backdrop-blur-sm">
      <p className="text-xs font-medium text-muted-foreground mr-2 hidden sm:block">Suggestions:</p>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="bg-background hover:bg-accent/20 border-accent text-accent hover:text-accent shadow-sm text-xs"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};

export default SuggestedActions;
