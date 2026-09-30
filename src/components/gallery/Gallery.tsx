import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { GalleryPhotoItem, weddingData } from "../../data/weddingData";

export const Gallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % weddingData.gallery.length);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + weddingData.gallery.length) % weddingData.gallery.length
    );
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto text-stone-100">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
          Momen Abadi
        </p>
        <h2
          className="text-4xl sm:text-5xl font-serif text-white tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Galeri Prewedding
        </h2>
        <p className="text-sm text-stone-300 font-light">
          Setiap bingkai merangkum kehangatan cinta dan indahnya janji masa depan.
        </p>
      </div>

      {/* Responsive Masonry / Bento Grid for Multi-Aspect Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weddingData.gallery.map((photo, index) => {
          // Dynamic span for panorama/landscape
          const isPanorama = photo.aspect === "panorama";
          const isLandscape = photo.aspect === "landscape";

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className={`group relative rounded-3xl overflow-hidden bg-stone-950/75 border border-stone-800/80 backdrop-blur-md shadow-2xl cursor-pointer hover:border-amber-400/50 transition-all duration-300 ${
                isPanorama ? "sm:col-span-2 lg:col-span-3" : isLandscape ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Photo Container adhering to object-fit: contain & full photo preservation */}
              <div
                className={`w-full overflow-hidden flex items-center justify-center bg-stone-950 p-2 sm:p-3 ${
                  isPanorama ? "h-72 sm:h-96" : "h-72 sm:h-80"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-contain rounded-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 border border-amber-400/40 text-amber-200 text-xs tracking-wider uppercase backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Lihat Foto</span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 border-t border-stone-800/60 text-center">
                <p className="text-xs text-stone-300 italic font-light">
                  {photo.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* PhotoViewer Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-stone-950/95 backdrop-blur-xl animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Tutup penampil foto"
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            aria-label="Foto selanjutnya"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/60 p-2 border border-stone-800">
              <img
                src={weddingData.gallery[selectedPhotoIndex].src}
                alt={weddingData.gallery[selectedPhotoIndex].alt}
                className="max-w-full max-h-[72vh] object-contain rounded-xl"
              />
            </div>
            <div className="mt-4 text-center px-4">
              <p className="text-sm sm:text-base font-serif text-amber-200" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {weddingData.gallery[selectedPhotoIndex].caption}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {selectedPhotoIndex + 1} dari {weddingData.gallery.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
