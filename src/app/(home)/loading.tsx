import { LoadingSpinner } from "@/components/ui/loading-spinner";

function HomeLoading() {
  return (
    <div className="grid h-[calc(100dvh-19.4rem)] w-full place-items-center">
      <LoadingSpinner className="size-40" />
    </div>
  );
}

export default HomeLoading;
