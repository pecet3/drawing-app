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
    <main className="flex min-h-screen justify-center items-center gap-2 p-8">
      <section className="flex flex-col justify-between bg-purple-400 p-2 rounded-md gap-2 shadow-md shadow-slate-500">
        <SketchPicker color={color} onChange={(e) => setColor(e.hex)} />
        <div className="flex flex-col">
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={size}
            onChange={(e) => setSize((prev) => (prev = e.target.value))}
          />
          size: {size}
        </div>
      </section>
      <canvas
        width={720}
        height={720}
        className="border-2 border-purple-600"
        ref={canvasRef}
        onMouseDown={onMouseDown}
      />
    </main>
  );
}
