import React from 'react';
import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = ({ loading = true, color = "#000000", height = 35, width = 4, margin = 2 }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <div role="status" aria-live="polite">
        <ScaleLoader
          color={color}
          height={height}
          width={width}
          margin={margin}
          aria-label="Loading Spinner"
        />
        <span className="sr-only">Loading content, please wait...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;