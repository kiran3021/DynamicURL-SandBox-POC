import type { ReactNode } from "react";
import { Suspense, lazy, useEffect, useState } from "react";

let LazyImported = lazy(() => (import('bootstrap/dist/js/bootstrap.bundle.min.js')));

export function ClientOnly({ children }) {
  const  [mounted, setMounted] = useState(false);
  useEffect(() => {
    if(typeof window !== undefined){

      setMounted(true);
    }
  }, []);
  return mounted ? <>{children}</> : null;
}

const RouteComponent = () =>{
  return (
    <> 
    <ClientOnly>
      <Suspense fallback="loading..">
        <LazyImported />
      </Suspense>
    </ClientOnly>
    </>

  );
}

export default RouteComponent