import { ReactNode } from 'react';

interface GradientShellProps {
  children: ReactNode;
}

export function GradientShell({ children }: GradientShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {children}
    </div>
  );
}
