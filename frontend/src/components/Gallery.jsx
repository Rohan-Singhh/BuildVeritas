import { CallSection } from "./Gallery/CallSection";
import { GallerySection } from "./Gallery/GallerySection";
import { HeroSection } from "./Gallery/HeroSection";

const Gallery = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <HeroSection />
    <GallerySection />
    <CallSection />
  </div>
);

export default Gallery;
