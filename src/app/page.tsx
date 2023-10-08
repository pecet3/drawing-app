"use client";
import Image from "next/image";
import { useDraw } from "../hooks/useDraw";
import { SketchPicker } from "react-color";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");
export default function Home() {
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState<number>(0);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color, size }: SocketResponse) => {
        if (!ctx) return;
        drawLine({ prevPoint, currentPoint, ctx, color, size });
      }
    );
  }, []);
  function drawLine({
    prevPoint,
    currentPoint,
    ctx,
    color,
    size,
  }: DrawWithProps) {
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

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, ctx, color, size });
    drawLine({ prevPoint, currentPoint, ctx, color, size });
  }
  return (
    <main className="flex min-h-screen justify-center items-start gap-4 p-8">
      <section className="flex flex-col justify-between bg-purple-400 p-2 rounded-md gap-2 shadow-md shadow-slate-500">
        <SketchPicker color={color} onChange={(e) => setColor(e.hex)} />
        <div className="flex flex-col">
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={size}
            onChange={(e) =>
              setSize((prev) => (prev = parseInt(e.target.value, 10)))
            }
          />
          size: {size}
        </div>
        <button onClick={clear} className="">
          Clear All
        </button>
      </section>
      <canvas
        width={720}
        height={720}
        className="border-4 rounded-lg border-purple-400 shadow-md shadow-slate-800 bg-white"
        ref={canvasRef}
        onMouseDown={onMouseDown}
      />
    </main>
  );
}
