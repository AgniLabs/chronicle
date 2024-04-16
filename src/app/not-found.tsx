export const runtime = "edge";

export default function NotFound() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <div className="flex flex-col items-center justify-center text-2xl font-semibold pt-6" >
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </div>
    </>
  );
}