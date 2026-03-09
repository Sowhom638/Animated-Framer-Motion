import React from 'react'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
const ParallaxImages = () => {
  return (
    <div className="mx-auto relative z-10 max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of orbiting satellite"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1447433865958-f402f562b843?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of orbiting satellite"
        start={-50}
        end={100}
        className="absolute right-20 h-1/4"
      />
      <ParallaxImg
        src="https://plus.unsplash.com/premium_photo-1679756099015-b06104fff761?q=80&w=804&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of orbiting satellite"
        start={-50}
        end={-100}
        className="ml-12 w-1/5"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;
  return (
    <motion.img
      style={{ opacity, transform }}
      ref={ref}
      src={src}
      alt={alt}
      className={className}
    />
  );
};
const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [25, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}%
${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%,
${clip1}% ${clip2}%)`;
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0],
  );
  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["150%", "100%"],
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        opacity,
        backgroundSize,
        clipPath,
        backgroundImage: `url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};
const SECTION_HEIGHT = 1500;
const Hero = () => {
  return (
    <>
      <div
        className="w-full relative"
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      >
        <CenterImage />
        <ParallaxImages />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
    </>
  );
};

export default Hero
