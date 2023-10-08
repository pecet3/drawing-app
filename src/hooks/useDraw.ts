
import { useEffect, useRef, useState } from "react"
export const useDraw = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) => {
    const [isMouseDown, setIsMouseDown] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const prevPoint = useRef<null | Point>(null)

    const onMouseDown = () => setIsMouseDown(true)


    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (!isMouseDown) return
            const currentPoint = computePointInCanvas(e);
            const ctx = canvasRef.current?.getContext("2d")
            if (!ctx || !currentPoint) return

            onDraw({ ctx, currentPoint, prevPoint: prevPoint.current })
            prevPoint.current = currentPoint

        }
        const mouseUpHandler = () => {
            setIsMouseDown(false)
            prevPoint.current = null
        }
        const computePointInCanvas = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top;

            return { x, y }
        }
        canvasRef.current?.addEventListener('mousemove', handler)
        window.addEventListener('mouseup', mouseUpHandler)
        return () => {
            canvasRef.current?.removeEventListener('mousemove', handler)

            window.removeEventListener('mouseup', mouseUpHandler)
        }
    }, [onDraw])

    return { canvasRef, onMouseDown }
}