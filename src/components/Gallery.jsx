import React from "react";
import { motion } from "motion/react";
import Anvaya from "../assets/Anvaya.png";
import KaviosPix from "../assets/KaviosPix.png";
import TRai from "../assets/TRai.png";
const Gallery = () => {
  // Optional: define image paths or use placeholders
  const imageSources = [ TRai, KaviosPix, Anvaya ];

  return (
    <div className="py-4 px-10 lg:px-20">
        <hr className=" text-gray-700"/>
      {/* Row 1 */}
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="flex flex-wrap-reverse sm:flex-nowrap items-center justify-between py-4 border-b border-gray-800"
      >
        <div>
        <h3 className="sm:text-4xl font-bold text-[#afaa8f] drop-shadow-md pt-2 md:pt-0">
          TRai
        </h3>
        <p className="text-zinc-600 py-4 pr-4">An AI trip planner which allows users to generate personalized travel itineraries by simply entering a destination name and the number of days they plan to stay.</p>
        </div>
        <div className="w-full md:w-48 h-auto md:h-24 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={imageSources[0]}
            alt="Heading 1"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling?.classList.remove("hidden");
            }}
          />
          <span className="text-gray-500 text-xs hidden">No image</span>
        </div>
      </motion.div>

      {/* Row 2 */}
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="flex flex-wrap-reverse sm:flex-nowrap items-center justify-between py-4 border-b border-gray-800"
      >
        <div>
        <h3 className="sm:text-4xl font-bold text-[#afaa8f] drop-shadow-md pt-2 md:pt-0">
          KaviosPix
        </h3>
        <p className="text-zinc-600 py-4 pr-4">An API-based image management system where users can create albums, share them with others, and upload images with various metadata.</p>
        </div>
        <div className="w-full md:w-48 h-auto md:h-24 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={imageSources[1]}
            alt="Heading 2"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling?.classList.remove("hidden");
            }}
          />
          <span className="text-gray-500 text-xs hidden">No image</span>
        </div>
      </motion.div>

      {/* Row 3 */}
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="flex flex-wrap-reverse sm:flex-nowrap items-center justify-between py-4 border-b border-gray-800"
      >
        <div>
        <h3 className="sm:text-4xl font-bold text-[#afaa8f] drop-shadow-md pt-2 md:pt-0">
          Anvaya CRM
        </h3>
         <p className="text-zinc-600 py-4 pr-4">A modern CRM application designed to streamline lead management for sales teams.</p>
        </div>
        <div className="w-full md:w-48 h-auto md:h-24 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={imageSources[2]}
            alt="Heading 3"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling?.classList.remove("hidden");
            }}
          />
          <span className="text-gray-500 text-xs hidden">No image</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
