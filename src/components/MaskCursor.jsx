import { useState } from 'react';
import { motion } from 'motion/react';
import useMousePosition from '../utils/useMousePosition';

export default function MaskCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 450 : 100
  return (x === null || y === null) ? (
    <div>
    <div className="py-10 px-10 lg:px-20 h-full flex items-center justify-center text-[#afaa8f] text-[32px] md:text-[48px] lg:text-[64px] leading-[66px] cursor-default">
        <p>
          I&apos;m a <span>purpose-driven</span> product designer focused on delivering meaningful, high-quality digital solutions that resonate with users.
        </p>
      </div>
  </div>
  ) : (
    <main className="h-screen">
      <motion.div
        className="mask px-20 h-full flex items-center justify-center text-[#afaa8f] text-[64px] leading-[66px] cursor-default"
        animate={{
          maskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
          maskSize: `${size}px`
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
      >
        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          Crafting immersive digital experiences that combine creativity with functionality — only when the impact justifies it.
        </p>
      </motion.div>

      <div className="px-20 h-full flex items-center justify-center text-[#afaa8f] text-[64px] leading-[66px] cursor-default">
        <p>
          I&apos;m a <span>purpose-driven</span> product designer focused on delivering meaningful, high-quality digital solutions that resonate with users.
        </p>
      </div>

    </main>
  );
}