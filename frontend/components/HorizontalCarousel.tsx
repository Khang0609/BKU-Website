import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface HorizontalCarouselProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  children,
  className = "",
  itemClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10); // buffer
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`group relative ${className}`}>
      {/* Scroll Buttons (Desktop Hover) */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 hidden -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white p-2 text-gray-600 shadow-lg transition-transform hover:scale-110 md:group-hover:flex"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-3 items-center justify-center rounded-full border border-gray-100 bg-white p-2 text-gray-600 shadow-lg transition-transform hover:scale-110 md:group-hover:flex"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Container */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className={`scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0 ${itemClassName}`}
        style={{ scrollBehavior: "smooth" }}
      >
        {React.Children.map(children, (child) => (
          <div className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1rem)]">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ServiceCarousel: React.FC<HorizontalCarouselProps> = ({
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0"
      >
        {React.Children.map(children, (child) => (
          <div className="w-[85%] shrink-0 snap-center sm:w-auto md:w-auto md:snap-align-none">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
