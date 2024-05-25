import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <div className="text-xl text-primary-200">Loading...</div>
    </div>
  );
}
