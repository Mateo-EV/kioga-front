"use client";

import NativeSkeleton, {
  type SkeletonProps as SkeletonPropsNative,
} from "react-loading-skeleton";

type SkeletonProps = SkeletonPropsNative;

export const Skeleton = (props: SkeletonProps) => {
  return (
    <NativeSkeleton
      baseColor="#313131"
      highlightColor="#525252"
      borderRadius="15px"
      {...props}
    />
  );
};
