export function GenericErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="py-16">
      <div className="prose prose-invert mx-auto max-w-xl px-4 text-gray-50">
        <h1>An unknown error occured.</h1>
      </div>
    </div>
  );
}
