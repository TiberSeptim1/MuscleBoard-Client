import React from 'react';

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`} />
);

const SkeletalLoaderDetails = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-pulse">
      {/* Top Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-3 w-full">
          <SkeletonBox className="h-8 w-1/2" />
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-3/4" />
            <SkeletonBox className="h-4 w-1/2" />
            <SkeletonBox className="h-4 w-2/3" />
            <SkeletonBox className="h-4 w-1/2" />
            <SkeletonBox className="h-4 w-1/3" />
            <SkeletonBox className="h-4 w-1/4" />
          </div>
        </div>
        <div className="flex flex-row gap-4 w-full md:w-auto">
          <SkeletonBox className="h-10 w-24" />
          <SkeletonBox className="h-10 w-24" />
        </div>
      </div>

      {/* History Heading and Delete All Button */}
      <SkeletonBox className="h-6 w-1/3" />
      <SkeletonBox className="h-10 w-40" />

      {/* History Rows */}
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="bg-white p-4 border-l-4 border-blue-400 rounded-lg shadow-sm space-y-3">
          <SkeletonBox className="h-4 w-1/3" />
          <div className="grid gap-2 md:grid-cols-2">
            <SkeletonBox className="h-4 w-1/2" />
            <SkeletonBox className="h-4 w-1/3" />
            <SkeletonBox className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletalLoaderDetails;
