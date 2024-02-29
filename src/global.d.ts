declare module '*.css';

// In a .d.ts file, e.g., globals.d.ts
interface Window {
  iCollettiva: {
    init: (props: BotProps & ComponentIdentifierProps) => void;
  };
}
