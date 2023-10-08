"use client";
import Image from "next/image";
import { useDraw } from "../hooks/useDraw";
import { SketchPicker } from "react-color";
import { useState } from "react";
export default function Home() {
  const { canvasRef, onMouseDown } = useDraw(drawLine);
  const [color, setColor] = useState("#000");
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = "#000";
    const lineWidth = 2;

    let startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    ctx.moveTo(startPoint.x, startPoint.y);

    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 1, 0, 4 * Math.PI);

    ctx.fill();
    ctx.closePath();
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <SketchPicker color={color} onChange={(e) => setColor(e.hex)} />
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
