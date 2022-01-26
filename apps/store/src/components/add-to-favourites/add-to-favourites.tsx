import { HeartIcon } from "@heroicons/react/outline";

export function AddToFavourites(): JSX.Element {
  return (
    <button
      type="button"
      className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
    >
      <HeartIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0" />
      <span className="sr-only">Add to favorites</span>
    </button>
  );
}
