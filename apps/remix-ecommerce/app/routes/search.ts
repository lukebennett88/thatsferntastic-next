import { GenericCatchBoundary } from "~/route-containers/boundaries/generic-catch-boundary";
import { GenericErrorBoundary } from "~/route-containers/boundaries/generic-error-boundary";
import Component from "~/route-containers/cdp/cdp.component";
import { loader } from "~/route-containers/cdp/cdp.server";

export default Component;
export { loader };
export { GenericCatchBoundary as CatchBoundary, GenericErrorBoundary as ErrorBoundary };
