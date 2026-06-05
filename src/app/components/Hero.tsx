import { motion, AnimatePresence } from "motion/react";
import { Heart, X } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [heartTaps, setHeartTaps] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleHeartClick = () => {
    const newCount = heartTaps + 1;

    if (newCount >= 5) {
      setShowSecret(true);
      setHeartTaps(0);
    } else {
      setHeartTaps(newCount);
    }
  };

  return (
    <section className="min-h-[100svh] relative flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Romantic couple at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#f8f5f0]" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <button
            onClick={handleHeartClick}
            className="cursor-pointer"
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-white/90 fill-white/80 hover:scale-110 transition-transform" />
          </button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-8xl mb-6 text-white tracking-tight"
        >
          Nuestro Álbum
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 mb-8 italic"
        >
          Una colección de momentos que ahora son nuestros
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-block"
        >
          <button
            onClick={() => {
              document.getElementById("dedication")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            Abrir Álbum
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </motion.div>

      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center"
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl"
            >
              <div className="relative">

                <button
                  onClick={() => setShowSecret(false)}
                  className="absolute top-4 right-4 bg-black/30 rounded-full p-2 z-10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <img
                  src="/images/secret.jpg"
                  alt="Nuestro primer recuerdo"
                  className="w-full h-auto"
                />
              </div>

              <div className="p-6 text-center">

                <p className="text-sm text-[#8b6f47] mb-2">
                  21–22 Abril 2026
                </p>

                <h3 className="text-2xl text-[#8b6f47] mb-3">
                  Nuestro Primer Recuerdo
                </h3>

                <p className="text-[#6b5d52] leading-relaxed">
                  Una noche muy especial donde preparaste una cena muy rica, una sorpresa muy significativa para mí y nuestro primer arrunchis.
                </p>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
