import { HeartIcon } from "@heroicons/react/outline";

export function AddToFavourites(): JSX.Element {
  return (
    <button
      type="button"
      className="flex items-center justify-center px-3 py-3 ml-4 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500"
    >
      <HeartIcon aria-hidden="true" className="flex-shrink-0 w-6 h-6" />
      <span className="sr-only">Add to favorites</span>
    </button>
  );
}
