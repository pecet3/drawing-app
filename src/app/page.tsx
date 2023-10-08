"use client";
import Image from "next/image";
import { useDraw } from "../hooks/useDraw";
import { SketchPicker } from "react-color";
import { useState } from "react";
export default function Home() {
  const { canvasRef, onMouseDown } = useDraw(drawLine);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState<number | string>(0);
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;

    let startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.strokeStyle = color;

    ctx.moveTo(startPoint.x, startPoint.y);

    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, size, 0, 4 * Math.PI);

    ctx.fill();
    ctx.closePath();
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <SketchPicker color={color} onChange={(e) => setColor(e.hex)} />
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={size}
        onChange={(e) => setSize((prev) => (prev = e.target.value))}
      />
      size: {size}
      <canvas
        width={720}
        height={720}
        className="border-2 border-gray-900"
        ref={canvasRef}
        onMouseDown={onMouseDown}
      />
    </main>
  );
}
