import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Zap, Clock } from 'lucide-react';

export default function Auth() {
  const { login, identity, loginStatus, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/home' });
    }
  }, [identity, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-purple-green-radial">
      <div className="w-full max-w-md animate-slide-up">
        <Card className="glass-card border-2">
          <CardHeader className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 shadow-lg">
              <img 
                src="/assets/generated/quick-d-combined-logo.dim_512x512.png" 
                alt="QUICK-D" 
                className="w-full h-full object-contain"
              />
            </div>
            <CardTitle className="text-3xl font-bold">Welcome to QUICK-D</CardTitle>
            <CardDescription className="text-base">
              Get groceries & essentials delivered in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">Lightning-fast delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-muted-foreground">15km service radius</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">Fresh products guaranteed</span>
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full h-12 text-base font-semibold gradient-purple-green hover:opacity-90 transition-opacity"
            >
              {isLoggingIn ? 'Connecting...' : 'Login with Internet Identity'}
            </Button>

            {loginStatus === 'loginError' && (
              <p className="text-sm text-destructive text-center">
                Login failed. Please try again.
              </p>
            )}

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
