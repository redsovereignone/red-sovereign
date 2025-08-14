// Analytics type definitions
interface Window {
  analytics?: {
    track: (event: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
    page: (name?: string, properties?: Record<string, unknown>) => void;
    group: (groupId: string, traits?: Record<string, unknown>) => void;
    alias: (userId: string, previousId?: string) => void;
    reset: () => void;
  };
}