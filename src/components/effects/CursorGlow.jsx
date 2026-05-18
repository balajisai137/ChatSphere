import {
  useEffect,
  useState,
} from "react";

export default function CursorGlow() {
  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
    };
  }, []);

  return (
    <div
      className="
        pointer-events-none
        fixed
        z-9999
        h-72
        w-72
        rounded-full
        bg-fuchsia-500/10
        blur-3xl
        transition-transform
        duration-200
      "
      style={{
        left: position.x - 144,
        top: position.y - 144,
      }}
    />
  );
}