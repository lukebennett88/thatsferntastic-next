import { useCatch } from "remix";

export function GenericCatchBoundary() {
  let caught = useCatch();
  let message = caught.statusText;
  if (typeof caught.data === "string") {
    message = caught.data;
  }

  return (
    <div className="py-16">
      <div className="max-w-xl px-4 mx-auto prose prose-invert text-gray-50">
        <h1>{message}</h1>
      </div>
    </div>
  );
}
