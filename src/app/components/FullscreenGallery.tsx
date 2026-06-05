import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string[];
  location?: string;
}

interface FullscreenGalleryProps {
  memories: Memory[];
  initialIndex: number;
  onClose: () => void;
}

export default function FullscreenGallery({ memories, initialIndex, onClose }: FullscreenGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
    setCurrentImageIndex(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentMemory = memories[currentIndex];

  const currentImage = currentMemory.image[currentImageIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-50"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Navigation buttons */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-50"
        >
          <ChevronLeft className="w-7 h-7 text-white" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-50"
        >
          <ChevronRight className="w-7 h-7 text-white" />
        </motion.button>

        {/* Image and content */}
        <div
          className="relative w-full h-full max-w-full flex flex-col items-center justify-center px-4 md:px-20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMemory.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl w-full"
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8 shadow-2xl">
                <img
                  src={currentImage}
                  alt={currentMemory.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>

              {currentMemory.image.length > 1 && (
                <div className="flex justify-center gap-3 mb-6">
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0
                          ? currentMemory.image.length - 1
                          : prev - 1
                      )
                    }
                    className="px-4 py-2 rounded-full bg-white/10 text-white"
                  >
                    ←
                  </button>

                  <span className="text-white/80 flex items-center">
                    {currentImageIndex + 1} / {currentMemory.image.length}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === currentMemory.image.length - 1
                          ? 0
                          : prev + 1
                      )
                    }
                    className="px-4 py-2 rounded-full bg-white/10 text-white"
                  >
                    →
                  </button>
                </div>
              )}

              {/* Memory details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <p className="text-[#c9b497] mb-2">{currentMemory.date}</p>
                <h3 className="text-3xl md:text-4xl mb-3 text-white">
                  {currentMemory.title}
                </h3>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  {currentMemory.description}
                </p>
                {currentMemory.location && (
                  <p className="text-[#c9b497] mt-4">{currentMemory.location}</p>
                )}
              </motion.div>

              {/* Progress indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 mt-8"
              >
                {memories.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                      setCurrentImageIndex(0);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
