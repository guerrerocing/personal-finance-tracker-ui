import { Skeleton } from "@nextui-org/react";

const SummarySkeleton = () => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      <Skeleton className="rounded-large">
        <div className="h-12 rounded-large bg-secondary"></div>
      </Skeleton>
      <Skeleton className="rounded-large">
        <div className="h-12 rounded-large bg-secondary"></div>
      </Skeleton>
      <Skeleton className="rounded-large">
        <div className="h-12 rounded-large bg-secondary"></div>
      </Skeleton>
      <Skeleton className="rounded-large">
        <div className="h-12 rounded-large bg-secondary"></div>
      </Skeleton>
    </div>
  );
};

export default SummarySkeleton;
