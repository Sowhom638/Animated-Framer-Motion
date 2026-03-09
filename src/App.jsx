
import { ReactLenis } from 'lenis/react'
import Nav from "./components/Nav";
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import MaskCursor from './components/MaskCursor';
import MultiLayerParallax from './components/MultiLayerParallax';
import Gallery from './components/Gallery';


function App() {
  return (
    <>
    <ReactLenis root
    options={{
      lerp: 0.05, // decreasing lerp value will increase scrolling speed
      // infinite: true --> This will restart the scrolling from start useful for image gallery with infinite scrolling
    }}
    >
      <Nav />
      <MultiLayerParallax />
      <MaskCursor />
      <Hero />
      <Gallery />
      <Schedule />
      </ReactLenis>
    </>
  );
}

export default App;
