// Analytics type definitions
interface Window {
  analytics?: {
    track: (event: string, properties?: Record<string, any>) => void;
    identify: (userId: string, traits?: Record<string, any>) => void;
    page: (name?: string, properties?: Record<string, any>) => void;
    group: (groupId: string, traits?: Record<string, any>) => void;
    alias: (userId: string, previousId?: string) => void;
    reset: () => void;
  };
}