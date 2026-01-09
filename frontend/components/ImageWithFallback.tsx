"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

interface Props extends Omit<ImageProps, "width" | "height"> {
  width?: number;
  height?: number;
}

export function ImageWithFallback(props: Props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, width, height, ...rest } = props;

  const handleError = () => {
    setDidError(true);
  };

  // Logic: If explicit dimensions provided, don't use fill.
  // Otherwise, default to fill mode.
  const hasDimensions = width !== undefined && height !== undefined;
  const shouldUseFill = !hasDimensions;

  if (didError) {
    return (
      <div
        className={`relative overflow-hidden bg-gray-100 text-center align-middle ${className ?? ""}`}
        style={{
          ...style,
          width: width || (style?.width as any) || "100%",
          height: height || (style?.height as any) || "100%",
        }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src={ERROR_IMG_SRC}
            alt="Error loading image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      fill={shouldUseFill}
      className={`${shouldUseFill ? "object-cover" : ""} ${className || ""}`}
      style={style}
    />
  );
}
