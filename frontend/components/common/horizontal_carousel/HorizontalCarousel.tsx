"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHorizontalCarousel } from "../../../hooks/useHorizontalCarousel";

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
  const { containerRef, showLeft, showRight, scroll, checkScroll } =
    useHorizontalCarousel([children]);

  return (
    <div className={`group/carousel relative ${className}`}>
      {/* Scroll Buttons (Desktop Hover) */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 hidden -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white p-2 text-gray-600 shadow-lg transition-transform hover:scale-110 md:group-hover/carousel:flex"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-3 items-center justify-center rounded-full border border-gray-100 bg-white p-2 text-gray-600 shadow-lg transition-transform hover:scale-110 md:group-hover/carousel:flex"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Container */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className={`scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 md:px-0 ${itemClassName}`}
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
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0"
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
