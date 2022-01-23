import { GenericCatchBoundary } from "~/route-containers/boundaries/generic-catch-boundary";
import { GenericErrorBoundary } from "~/route-containers/boundaries/generic-error-boundary";
import Component, { meta, unstable_shouldReload } from "~/route-containers/pdp/pdp.component";
import { action, headers, loader } from "~/route-containers/pdp/pdp.server";

export default Component;
export { action, headers, loader, meta, unstable_shouldReload };
export { GenericCatchBoundary as CatchBoundary, GenericErrorBoundary as ErrorBoundary };
