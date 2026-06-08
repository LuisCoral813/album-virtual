import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string[];
  video?: string[];
  location?: string;
}

interface MemoryCardProps {
  memory: Memory;
  onImageClick: () => void;
}

export default function MemoryCard({ memory, onImageClick }: MemoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-[#8b6f47]/10 group cursor-pointer"
      onClick={onImageClick}
    >
      {/* Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={memory.image[0]}
          alt={memory.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Date badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <Calendar className="w-4 h-4 text-[#8b6f47]" />
          <span className="text-sm text-[#2d2520]">{memory.date}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl md:text-3xl mb-2 text-[#8b6f47]">
          {memory.title}
        </h3>
        <p className="text-sm text-[#8b6f47] mb-4">
          {(memory.image.length + (memory.video?.length || 0))} recuerdos
        </p>
        {memory.location && (
          <div className="flex items-center gap-2 text-[#8b6f47]">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{memory.location}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
