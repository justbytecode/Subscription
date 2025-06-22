import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard/SpotlightCard";

const advantages = [
  {
    title: "Decentralization",
    description: "Power to the users. No banks. No intermediaries.",
    icon: "/about-us/cards/decentralize.png",
  },
  {
    title: "Zero Fees",
    description: "Keep 100% of your revenue always.",
    icon: "/about-us/cards/wallet.png",
  },
  {
    title: "Borderless Access",
    description: "Subscriptions that work globally, instantly.",
    icon: "/about-us/cards/borderless.png",
  },
  {
    title: "Security & Transparency",
    description: "Smart contracts with full auditability and on-chain trust.",
    icon: "/about-us/cards/security.png",
  },
];

export default function RecurXAdvantageSection() {
  return (
    <section className="bg-black mt-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-white text-3xl font-semibold mb-12"
      >
        The RecurX Advantage
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {advantages.map((adv, index) => (
          <SpotlightCard
            key={index}
            className="bg-[#0B1629] border border-[#1F2A3C] rounded-xl p-6 text-left h-full"
            spotlightColor="rgba(0, 229, 255, 0.1)"
          >
            <div className="flex flex-col gap-3">
              <img src={adv.icon} alt={adv.title} className="w-6 h-6" />
              <h3 className="text-white font-semibold text-lg">{adv.title}</h3>
              <p className="text-[#B0B8C1] text-sm leading-snug">{adv.description}</p>
            </div>
          </SpotlightCard>
        ))}
      </motion.div>
    </section>
  );
}
