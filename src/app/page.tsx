"use client";
import Image from "next/image";
import { useDraw } from "../hooks/useDraw";

export default function Home() {
  const { canvasRef } = useDraw();

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const color = "#000";
    const lineWidth = 5;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <canvas
        width={750}
        height={750}
        className="border-2 border-gray-900"
        ref={canvasRef}
      />
    </main>
  );
}
