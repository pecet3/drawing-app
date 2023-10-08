"use client";
import Image from "next/image";
import { useDraw } from "../hooks/useDraw";

export default function Home() {
  const { canvasRef } = useDraw();
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
