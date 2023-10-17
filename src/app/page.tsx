"use client";
import { useDraw } from "../hooks/useDraw";
import { SketchPicker } from "react-color";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { drawLine } from "../../utils/drawLine";

const socket = io("https://paint-online-backend.onrender.com/");
export default function Home() {
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState<number>(1);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.emit("client-ready");

    socket.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL()) return;
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });

    socket.on("canvas-state-from-server", (state: string) => {
      const img = new Image();
      img.src = state;

      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });
    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color, size }: SocketResponse) => {
        if (!ctx) return;
        drawLine({ prevPoint, currentPoint, ctx, color, size });
      }
    );
    socket.on("clear", clear);

    return () => {
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("draw-line");
      socket.off("clear");
    };
  }, [canvasRef]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, ctx, color, size });
    drawLine({ prevPoint, currentPoint, ctx, color, size });
  }
  return (
    <main className="flex min-h-screen justify-center items-start gap-4 p-8">
      <section className="hidden sm:flex flex-col justify-between bg-purple-400 p-2 rounded-md gap-2 shadow-md shadow-slate-500">
        {/* <SketchPicker color={color} onChange={(e) => setColor(e.hex)} /> */}
        <div className="flex flex-col">
          <input
            type="range"
            min={1}
            max={3}
            step={1}
            value={size}
            onChange={(e) =>
              setSize((prev) => (prev = parseInt(e.target.value, 10)))
            }
          />
          size: {size}
        </div>
        {/* <button onClick={() => socket.emit("clear")} className="">
          Clear All
        </button> */}
      </section>
      <div className="h-[640px] sm:w-[640px] overflow-auto ring-4 rounded-lg ring-purple-400">
        <canvas
          width={3200}
          height={2000}
          className=" shadow-md shadow-slate-800 bg-white hover:cursor-crosshair"
          ref={canvasRef}
          onMouseDown={onMouseDown}
        />
      </div>
    </main>
  );
}
