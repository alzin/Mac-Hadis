import { useState } from "react";

export const useImageGallery = (imagesCount: number) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Handle navigation to the previous image
  const handlePrev = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex((prev) => prev - 1);
    }
  };

  // Handle navigation to the next image
  const handleNext = () => {
    if (selectedImageIndex < imagesCount - 1) {
      setSelectedImageIndex((prev) => prev + 1);
    }
  };

  return {
    selectedImageIndex,
    setSelectedImageIndex,
    handlePrev,
    handleNext,
  }
}