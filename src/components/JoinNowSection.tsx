import React from "react";
import { NeonGradientCard } from "./magicui/neon-gradient-card";

function JoinNowSection() {
  return (
    <div className="m-13">
      <NeonGradientCard
        borderSize={2}
        borderRadius={20}
        neonColors={{ firstColor: "#ff00aa", secondColor: "#00FFF1" }}
      >
        <div className="text-center px-12 py-10 max-w-3xl mx-auto">
          <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            JOIN NOW
          </span>
          <p className="mt-4">
            "Sign up" to become a part of our dynamic community. Gain access to a vast pool of knowledge...
          </p>
        </div>
      </NeonGradientCard>
    </div>
  )
}

export default JoinNowSection
