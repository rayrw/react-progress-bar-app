import React from "react";

import type {
  Router as RemixRouter,
  RouterState,
  RouterSubscriber,
} from "@remix-run/router";
import { UNSAFE_warning as warning } from "@remix-run/router";
import {
  UNSAFE_DataRouterContext as DataRouterContext,
  UNSAFE_DataRouterStateContext as DataRouterStateContext,
  Router,
} from "react-router-dom";
import { UNSAFE_useRoutesImpl as useRoutesImpl } from "react-router";
import type {
  RouterProviderProps,
  DataRouteObject,
  Navigator,
} from "react-router-dom";
import {
  startProgressBar,
  finishProgressBar,
} from "../../common/progressBarUtils";

export function RouterProvider({
  fallbackElement,
  router,
  future,
}: RouterProviderProps): React.ReactElement {
  const [isPending, startTransitionImpl] = React.useTransition();
  const [state, setStateImpl] = React.useState(router.state);
  const { v7_startTransition } = future || {};

  React.useEffect(() => {
    let timeout: number | null = null;
    if (isPending) {
      timeout = setTimeout(() => {
        startProgressBar();
      }, 200);
    } else {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      finishProgressBar();
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  }, [isPending]);

  const setState = React.useCallback<RouterSubscriber>(
    (newState: RouterState) => {
      if (v7_startTransition && startTransitionImpl) {
        startTransitionImpl(() => setStateImpl(newState));
      } else {
        setStateImpl(newState);
      }
    },
    [setStateImpl, v7_startTransition],
  );

  // Need to use a layout effect here so we are subscribed early enough to
  // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
  React.useLayoutEffect(() => router.subscribe(setState), [router, setState]);

  React.useEffect(() => {
    warning(
      fallbackElement == null || !router.future.v7_partialHydration,
      "`<RouterProvider fallbackElement>` is deprecated when using " +
        "`v7_partialHydration`, use a `HydrateFallback` component instead",
    );
    // Only log this once on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigator = React.useMemo((): Navigator => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n) => router.navigate(n),
      push: (to, state, opts) =>
        router.navigate(to, {
          state,
          preventScrollReset: opts?.preventScrollReset,
        }),
      replace: (to, state, opts) =>
        router.navigate(to, {
          replace: true,
          state,
          preventScrollReset: opts?.preventScrollReset,
        }),
    };
  }, [router]);

  const basename = router.basename || "/";

  const dataRouterContext = React.useMemo(
    () => ({
      router,
      navigator,
      static: false,
      basename,
    }),
    [router, navigator, basename],
  );

  // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag
  return (
    <>
      <DataRouterContext.Provider value={dataRouterContext}>
        <DataRouterStateContext.Provider value={state}>
          <Router
            basename={basename}
            location={state.location}
            navigationType={state.historyAction}
            navigator={navigator}
            future={{
              v7_relativeSplatPath: router.future.v7_relativeSplatPath,
            }}
          >
            {state.initialized || router.future.v7_partialHydration ? (
              <DataRoutes
                routes={router.routes}
                future={router.future}
                state={state}
              />
            ) : (
              fallbackElement
            )}
          </Router>
        </DataRouterStateContext.Provider>
      </DataRouterContext.Provider>
      {null}
    </>
  );
}

function DataRoutes({
  routes,
  future,
  state,
}: {
  routes: DataRouteObject[];
  future: RemixRouter["future"];
  state: RouterState;
}): React.ReactElement | null {
  return useRoutesImpl(routes, undefined, state, future);
}
