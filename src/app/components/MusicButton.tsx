import { motion } from "motion/react";
import { Music, Pause } from "lucide-react";

interface MusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicButton({ isPlaying, onToggle }: MusicButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#8b6f47] hover:bg-[#7a5f3d] text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-colors backdrop-blur-sm border-2 border-white/20"
    >
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear"
        }}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" fill="currentColor" />
        ) : (
          <Music className="w-6 h-6" />
        )}
      </motion.div>

      {/* Pulse effect when playing */}
      {isPlaying && (
        <>
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute inset-0 bg-[#8b6f47] rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
            className="absolute inset-0 bg-[#8b6f47] rounded-full"
          />
        </>
      )}
    </motion.button>
  );
}
