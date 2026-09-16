import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  Meta,
  Links,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { reportLovableError } from "../lib/lovable-error-reporting";
import { CookieConsent } from "../components/cookie-consent/CookieConsent";
import { useCookieConsent } from "../components/cookie-consent/useCookieConsent";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { consent, isMounted } = useCookieConsent();

  useEffect(() => {
    if (!isMounted) return;

    // Only load Tawk.to live chat if marketing/analytics consent is given
    if (!consent.analytics && !consent.marketing) {
      const existingScript = document.getElementById("tawk-script");
      if (existingScript) existingScript.remove();
      return;
    }

    const existingScript = document.getElementById("tawk-script");
    if (existingScript) return;

    const win = window as Window & {
      Tawk_API?: Record<string, unknown>;
      Tawk_LoadStart?: Date;
    };

    win.Tawk_API = win.Tawk_API ?? {};
    win.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: "br",
          xOffset: 20,
          yOffset: 20,
        },
        mobile: {
          position: "br",
          xOffset: 12,
          yOffset: 12,
        },
      },
    };
    win.Tawk_LoadStart = win.Tawk_LoadStart ?? new Date();

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.type = "text/javascript";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.src = "https://embed.tawk.to/6a951acdadddbc344758534f/1k1b71dff";
    document.head.appendChild(script);
  }, [consent.analytics, consent.marketing, isMounted]);

  return (
    <QueryClientProvider client={queryClient}>
      <Meta />
      <Links />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieConsent />
    </QueryClientProvider>
  );
}
