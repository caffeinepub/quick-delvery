import { useNavigate } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Terminal, Settings, Rocket } from 'lucide-react';

export default function Docs() {
  const navigate = useNavigate();

  return (
    <GradientShell>
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/home' })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Documentation</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Local Development
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3>Prerequisites</h3>
            <ul>
              <li>Install dfx (Internet Computer SDK)</li>
              <li>Node.js 18+ and pnpm</li>
            </ul>
            <h3>Running Locally</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Start local IC replica
dfx start --background

# Deploy canisters
dfx deploy

# Start frontend dev server
cd frontend && pnpm start`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3>Store Location & Radius</h3>
            <p>
              The default store location is set to Paris (48.8566, 2.3522) with a 15km delivery radius.
              To change this, modify the coordinates in <code>backend/main.mo</code> in the <code>isServiceAvailable</code> function.
            </p>
            <h3>Admin Access</h3>
            <p>
              The first principal to interact with the backend becomes the admin automatically.
              To add more admins, use the admin panel's user management section.
            </p>
            <p>
              You can also pass an admin token via URL hash: <code>#caffeineAdminToken=YOUR_TOKEN</code>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Deployment
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3>Deploy to Internet Computer</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Deploy to IC mainnet
dfx deploy --network ic

# Get canister URLs
dfx canister --network ic id frontend
dfx canister --network ic id backend`}</code>
            </pre>
            <p>
              Your application will be available at: <code>https://[canister-id].ic0.app</code>
            </p>
          </CardContent>
        </Card>
      </main>
    </GradientShell>
  );
}
