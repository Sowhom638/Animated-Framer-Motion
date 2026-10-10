import { ReactLenis } from "lenis/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import MaskCursor from "./components/MaskCursor";
import MultiLayerParallax from "./components/MultiLayerParallax";
import Gallery from "./components/Gallery";
import { motion } from "motion/react";

function App() {
  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.05, // decreasing lerp value will increase scrolling speed
          // infinite: true --> This will restart the scrolling from start useful for image gallery with infinite scrolling
        }}
      >
        {/* <Nav />
      <MultiLayerParallax />
      <MaskCursor />
      <Hero />
      <Gallery />
      <Schedule /> */}
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
          {/* --- BACKGROUND GRADIENTS --- */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-slate-900" />

          {/* Animated Background Blobs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, -100, 0], y: [0, 50, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />

          {/* --- CONTENT --- */}
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Text Side */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight"
              >
                Build the{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                  Future
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-slate-300 max-w-lg mx-auto md:mx-0"
              >
                Experience the next generation of web design. Fast, responsive,
                and beautiful interfaces built for scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <button className="px-8 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors shadow-lg shadow-purple-500/20">
                  Get Started
                </button>
                <button className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Learn More
                </button>
              </motion.div>
            </div>

            {/* Floating Card Side */}
            <div className="flex-1 relative w-full max-w-md flex justify-center">
              {/* Decorative Back Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity, // Loop forever
                  repeatType: "loop", // Restart from beginning
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-linear-to-tr from-indigo-600 to-purple-600 rounded-3xl transform rotate-6 scale-95 opacity-50 blur-sm"
              />

              {/* THE FLOATING CARD */}
              <motion.div
                // Initial state before animation starts
                initial={{ opacity: 0, y: 50 }}
                // The continuous floating animation
                animate={{
                  y: [0, -25, 0], // Moves up 25px and back down
                  rotate: [0, 2, -2, 0], // Slight tilt left and right
                  scale: [1, 1.02, 1], // Slight breathe effect
                }}
                // Configuration for smooth, weightless movement
                transition={{
                  duration: 5, // Slow duration for weightlessness
                  repeat: Infinity, // Loop forever
                  ease: "easeInOut", // Smooth acceleration/deceleration
                  repeatType: "reverse", // Smoothly reverses direction
                }}
                whileHover={{ scale: 1.05, rotate: 0, y: -10 }} // Interactive lift on hover
                className="relative w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden group cursor-default"
              >
                {/* Internal Card Content */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    AI
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">
                      Analytics Pro
                    </h3>
                    <p className="text-slate-400 text-sm">Real-time insights</p>
                  </div>
                </div>

                {/* Fake Graph */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Revenue</span>
                    <span className="text-green-400">+24%</span>
                  </div>
                  <div className="h-24 w-full bg-slate-800/50 rounded-xl flex items-end justify-between p-2 gap-2">
                    {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                        className="w-full bg-linear-to-t from-indigo-500 to-purple-400 rounded-t-sm opacity-80"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-white font-medium">View Report</span>
                  <span className="text-white/50 hover:text-white cursor-pointer transition-colors">
                    →
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ReactLenis>
    </>
  );
}

export default App;
