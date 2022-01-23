import Component, {
  CatchBoundary,
  ErrorBoundary,
  links,
  meta,
  unstable_shouldReload,
} from "~/route-containers/layout/layout.component";
import { loader } from "~/route-containers/layout/layout.server";

export default Component;
export { CatchBoundary, ErrorBoundary, links, loader, meta, unstable_shouldReload };
