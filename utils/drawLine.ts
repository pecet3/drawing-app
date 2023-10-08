export const drawLine = ({ prevPoint, currentPoint, ctx, color, size }: Draw & { color: string; size: number }) => {
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