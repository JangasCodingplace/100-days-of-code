import React, {FormEventHandler, useEffect, useRef} from 'react';

import './MyCanvas.css';

interface MyCanvasProps {
    imageUrl: string;
}

interface Point {
    x: number,
    y: number
}

interface Rect {
    x: number,
    width: number,
    y: number,
    height: number
}

export const MyCanvas = ({ imageUrl }: MyCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
    const [startPoint, setStartPoint] = React.useState<Point>({x: 0, y: 0})
    const [currentPoint, setCurrentPoint] = React.useState<Point>({x: 0, y: 0})
    const [rect, setRect] = React.useState<Rect>({x: 0, width: 0, y: 0, height: 0})
    const [corners, setCorners] = React.useState<Rect[]>([])

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const image = new Image();

        if (!context || !image) {
            return;
        }

        image.src = imageUrl;
        image.onload = () => {
            const canvasWidth = canvas?.offsetWidth;
            const canvasHeight = canvas?.offsetHeight;
            context.drawImage(image, 0, 0, canvasWidth ? canvasWidth : 400, canvasHeight ? canvasHeight : 400);
        }
    }, [imageUrl]);

    const getMousePositionInCanvas = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
        if (!canvasRef.current) return {x: 0, y: 0}
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;
        return {x: x, y: y}
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return
        setIsDrawing(true);
        const position = getMousePositionInCanvas(e)
        setStartPoint(position)
        setCurrentPoint(position)
    }


    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing) {
            if (!canvasRef.current) return
            setCurrentPoint(getMousePositionInCanvas(e))
            const ctx = canvasRef.current?.getContext('2d');
            if (ctx) drawRectangle();
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return
        setCorners([...corners, rect])
        setIsDrawing(false);
        setRect({x: 0, y: 0, width: 0, height: 0})
    }

    const drawRectangle = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;


        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'red';
        setRect({x: startPoint.x, y: startPoint.y, width: currentPoint.x - startPoint.x, height: currentPoint.y - startPoint.y})
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Process the form data here
    };

    const getFormValue = (index: number) => {
        if (index > corners.length - 1) return ""
        else {
            const corner = corners[index]
            return `{x: ${corner.x}, y: ${corner.y}, width: ${corner.width}, height: ${corner.height}`
        }
    }

    return (
        <div className="containerStyle">
            <div className="leftComponentStyle">
                <canvas
                    ref={canvasRef}
                    id="myCanvas"
                    width={400}
                    height={400}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                ></canvas>
            </div>
            <div className="rightComponentStyle">
                <form onSubmit={handleSubmit}>
                    <label>
                        Corner 1:
                        <input
                            type="text"
                            value={getFormValue(0)}
                            readOnly
                        />
                    </label>
                    <br />
                    <label>
                        Corner 2:
                        <input
                            type="text"
                            value={getFormValue(1)}
                            readOnly
                        />
                    </label>
                    <br />
                    <label>
                        Corner 3:
                        <input
                            type="text"
                            value={getFormValue(2)}
                            readOnly
                        />
                    </label>
                    <br />
                    <label>
                        Corner 4:
                        <input
                            type="text"
                            value={getFormValue(3)}
                            readOnly
                        />
                    </label>
                    <br />
                    <button type="submit">Submit and Next</button>
                </form>
            </div>
        </div>
    )
}
