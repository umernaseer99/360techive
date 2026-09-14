import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home screen icon, and the favicon fallback for browsers without SVG
 * favicon support. Same mark as icon.svg: the navbar dot on the dark ground.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
        }}
      >
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 9999,
            background: "#DC2626",
          }}
        />
      </div>
    ),
    size
  );
}
