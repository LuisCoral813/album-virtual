import { useState } from "react";
import Hero from "./components/Hero";
import DedicationLetter from "./components/DedicationLetter";
import MemoryTimeline from "./components/MemoryTimeline";
import MusicButton from "./components/MusicButton";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background ambient lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#f4d1ae]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#e8c4a3]/20 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-[#d4b896]/15 rounded-full blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Hero />
        <DedicationLetter />
        <MemoryTimeline />
      </div>

      {/* Floating music button */}
      <MusicButton isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />
    </div>
  );
}