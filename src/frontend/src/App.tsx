import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/qd/useUserProfile';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderTracking from './pages/OrderTracking';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import OutOfRadius from './pages/OutOfRadius';
import Notifications from './pages/Notifications';
import Docs from './pages/Docs';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminServiceConfig from './pages/admin/AdminServiceConfig';
import AdminSeed from './pages/admin/AdminSeed';

// Components
import { ProfileSetupModal } from './components/qd/ProfileSetupModal';
import { AdminRouteGuard } from './components/qd/AdminRouteGuard';

// Layout wrapper for authenticated routes
function AppLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

// Auth guard wrapper
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-purple-green">
        <div className="animate-pulse-slow text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!identity) {
    navigate({ to: '/auth' });
    return null;
  }

  return <>{children}</>;
}

// Root route
const rootRoute = createRootRoute({
  component: AppLayout
});

// Public routes
const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Splash
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth
});

// Protected routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: () => (
    <AuthGuard>
      <ProfileSetupModal />
      <Home />
    </AuthGuard>
  )
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  component: () => (
    <AuthGuard>
      <Catalog />
    </AuthGuard>
  )
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: () => (
    <AuthGuard>
      <ProductDetail />
    </AuthGuard>
  )
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: () => (
    <AuthGuard>
      <Cart />
    </AuthGuard>
  )
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: () => (
    <AuthGuard>
      <Checkout />
    </AuthGuard>
  )
});

const orderSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-success/$orderId',
  component: () => (
    <AuthGuard>
      <OrderSuccess />
    </AuthGuard>
  )
});

const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-tracking/$orderId',
  component: () => (
    <AuthGuard>
      <OrderTracking />
    </AuthGuard>
  )
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: () => (
    <AuthGuard>
      <Orders />
    </AuthGuard>
  )
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <AuthGuard>
      <Profile />
    </AuthGuard>
  )
});

const outOfRadiusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/out-of-radius',
  component: () => (
    <AuthGuard>
      <OutOfRadius />
    </AuthGuard>
  )
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notifications',
  component: () => (
    <AuthGuard>
      <Notifications />
    </AuthGuard>
  )
});

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
  component: Docs
});

// Admin routes
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AuthGuard>
      <AdminRouteGuard>
        <AdminLayout />
      </AdminRouteGuard>
    </AuthGuard>
  )
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/',
  component: AdminDashboard
});

const adminProductsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/products',
  component: AdminProducts
});

const adminCategoriesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/categories',
  component: AdminCategories
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/orders',
  component: AdminOrders
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/users',
  component: AdminUsers
});

const adminCouponsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/coupons',
  component: AdminCoupons
});

const adminServiceConfigRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/service-config',
  component: AdminServiceConfig
});

const adminSeedRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/seed',
  component: AdminSeed
});

// Create route tree
const routeTree = rootRoute.addChildren([
  splashRoute,
  authRoute,
  homeRoute,
  catalogRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  orderSuccessRoute,
  orderTrackingRoute,
  ordersRoute,
  profileRoute,
  outOfRadiusRoute,
  notificationsRoute,
  docsRoute,
  adminRoute.addChildren([
    adminDashboardRoute,
    adminProductsRoute,
    adminCategoriesRoute,
    adminOrdersRoute,
    adminUsersRoute,
    adminCouponsRoute,
    adminServiceConfigRoute,
    adminSeedRoute
  ])
]);

// Create router
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
