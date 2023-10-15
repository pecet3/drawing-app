
import { useEffect, useRef, useState } from "react"
export const useDraw = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) => {
    const [isMouseDown, setIsMouseDown] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const prevPoint = useRef<null | Point>(null)

    const onMouseDown = () => setIsMouseDown(true)

    const clear = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (!isMouseDown) return
            const currentPoint = computePointInCanvas(e);
            const ctx = canvasRef.current?.getContext("2d")
            if (!ctx || !currentPoint) return
            // ctx.fillText("test", currentPoint.x, currentPoint.y);



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
            const x = Math.floor(e.clientX - rect.left)
            const y = Math.floor(e.clientY - rect.top)

            return { x, y }
        }
        canvasRef.current?.addEventListener('mousemove', handler)
        window.addEventListener('mouseup', mouseUpHandler)
        return () => {
            canvasRef.current?.removeEventListener('mousemove', handler)

            window.removeEventListener('mouseup', mouseUpHandler)
        }
    }, [onDraw])

    return { canvasRef, onMouseDown, clear }
}