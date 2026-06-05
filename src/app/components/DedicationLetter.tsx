import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function DedicationLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="dedication" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-2xl border border-[#8b6f47]/10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-[#8b6f47]">
              Para Nosotros
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#8b6f47] to-transparent mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-5 text-[#2d2520]/80 leading-relaxed"
          >
            <p className="text-lg italic text-[#8b6f47] md:text-xl">
              "Veo caer las gotas de lluvia de cristal.
              Y la belleza de todo.
              Es cuando el sol sale brillando para hacer esos arcoiris en mi mente.
              Cuando pienso en ti alguna vez.
              Y quiero pasar un tiempo contigo, solo nosotros dos."
            </p>

            <p className="text-lg md:text-xl">
              Quería crear un lugar donde pudiéramos guardar
              cada recuerdo, cada foto y cada pequeño momento
              que haga parte de nuestra historia.
            </p>

            <p className="text-right italic text-[#8b6f47] mt-8 text-xl">
              Just the two of us
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
