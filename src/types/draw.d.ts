type Draw = {
    ctx: CanvasRednerindContext2D
    currentPoint: Point
    prevPoint: Point | null
}
type Point = {
    x: number;
    y: number;
}