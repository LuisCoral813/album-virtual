import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import MemoryCard from "./MemoryCard";
import FullscreenGallery from "./FullscreenGallery";

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string[];
  location?: string;
}

const memories: Memory[] = [
  {
  id: 1,
  date: "3 de Mayo de 2026",
  title: "Un fin de semana contigo",
  description:
    "El día que conocí a tu familia y terminamos recorriendo juntos el Tambo de Santa Rosa.",
  image: [
    "/images/memories/2026-05-03/1.jpg",
    "/images/memories/2026-05-03/2.jpg",
    "/images/memories/2026-05-03/3.jpg"
  ],
  location: "Pereira y Santa Rosa de Cabal, Risaralda"
  },
  {
    id: 2,
    date: "4 de Mayo 2026",
    title: "No pain no gain",
    description: "Un día acompañandote en tu día de gym, siempre apoyándote en cada repetición.",
    image: [
      "/images/memories/2026-05-04/1.jpg"
    ],
    location: "Pereira, Risaralda"
  },
  {
    id: 3,
    date: "18 de Mayo de 2026",
    title: "Un día en Ukumarí",
    description:
      "Recorrimos el zoológico, vimos muchos animales y llenamos la galería de fotos.",
    image: [
      "/images/memories/2026-05-18/1.jpg",
      "/images/memories/2026-05-18/2.jpg",
      "/images/memories/2026-05-18/3.jpg",
      "/images/memories/2026-05-18/4.jpg",
      "/images/memories/2026-05-18/5.jpg",
      "/images/memories/2026-05-18/6.jpg",
      "/images/memories/2026-05-18/7.jpg",
      "/images/memories/2026-05-18/8.jpg"
    ],
    location: "Bioparque Ukumarí, Pereira"
  },
  {
    id: 4,
    date: "23 de Mayo de 2026",
    title: "Modo recuperación",
    description:
      "Después de la extracción de la cordal, me acompañaste durante todo el fin de semana.",
    image: [
      "/images/memories/2026-05-23/1.jpg"
    ],
    location: "Pereira, Risaralda"
  },
  {
    id: 5,
    date: "24 de Mayo de 2026",
    title: "Escapada a Belalcázar",
    description:
      "Un pequeño viaje para conocer el Cristo Rey y seguir sumando recuerdos juntos.",
    image: [
      "/images/memories/2026-05-24/1.jpg",
      "/images/memories/2026-05-24/2.jpg",
      "/images/memories/2026-05-24/3.jpg"
    ],
    location: "Belalcázar, Caldas"
  },
  {
    id: 6,
    date: "Próximamente",
    title: "El siguiente capítulo",
    description:
      "Todavía no sabemos qué aventura irá aquí, pero seguro llegará.",
    image: [
      "/images/placeholder.jpg"
    ],
    location: ""
  }
];

export default function MemoryTimeline() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  return (
    <>
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl mb-4 text-[#8b6f47]">
              Nuestros Capítulos
            </h2>
            <p className="text-xl text-[#6b5d52]">Los recuerdos que hemos ido construyendo.</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8b6f47]/30 via-[#8b6f47]/60 to-[#8b6f47]/30 -translate-x-1/2" />

            {/* Memory cards */}
            <div className="space-y-24">
              {memories.map((memory, index) => (
                <TimelineItem
                  key={memory.id}
                  memory={memory}
                  index={index}
                  onImageClick={() => setSelectedMemory(memory.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen gallery */}
      {selectedMemory !== null && (
        <FullscreenGallery
          memories={memories}
          initialIndex={memories.findIndex(m => m.id === selectedMemory)}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </>
  );
}

function TimelineItem({ memory, index, onImageClick }: { memory: Memory; index: number; onImageClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-[#8b6f47] rounded-full border-4 border-[#f8f5f0] shadow-lg z-10"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`w-full md:w-[calc(50%-3rem)] ${
          isEven ? "md:pr-12" : "md:pl-12"
        } ml-16 md:ml-0`}
      >
        <MemoryCard memory={memory} onImageClick={onImageClick} />
      </motion.div>
    </div>
  );
}
