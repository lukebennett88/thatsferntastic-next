import { GenericCatchBoundary } from "~/route-containers/boundaries/generic-catch-boundary";
import { GenericErrorBoundary } from "~/route-containers/boundaries/generic-error-boundary";
import Component from "~/route-containers/wishlist/wishlist.component";
import { action, headers, loader } from "~/route-containers/wishlist/wishlist.server";

export default Component;
export { action, headers, loader };
export { GenericCatchBoundary as CatchBoundary, GenericErrorBoundary as ErrorBoundary };