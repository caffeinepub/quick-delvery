import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function Splash() {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();

  useEffect(() => {
    if (isInitializing) return;

    const timer = setTimeout(() => {
      if (identity) {
        navigate({ to: '/home' });
      } else {
        navigate({ to: '/auth' });
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [identity, isInitializing, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-purple-green-radial overflow-hidden relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center animate-scale-in">
        <div className="w-32 h-32 mb-6 rounded-3xl bg-white/20 backdrop-blur-md p-6 shadow-glass animate-pulse-slow">
          <img 
            src="/assets/generated/quick-d-combined-logo.dim_512x512.png" 
            alt="QUICK-D" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          QUICK-D
        </h1>
        <p className="text-white/80 text-lg">Ultra-fast delivery at your doorstep</p>
      </div>
    </div>
  );
}
