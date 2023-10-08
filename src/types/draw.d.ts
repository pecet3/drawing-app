type Draw = {
    ctx: CanvasRedneringContext2D
    currentPoint: Point
    prevPoint: Point | null
}
type Point = {
    x: number;
    y: number;
}

type DrawWithProps = Draw & {
    color: string;
    size: number;
}

type SocketResponse = {
    color: string
    size: number
    currentPoint: Point
    prevPoint: Point | null
}