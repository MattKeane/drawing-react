import { useRef, useEffect } from 'react';

export default function DrawingBoard(props) {
    const canvas = useRef(null);
    const ctx = useRef(null);
    let startX = null;
    let startY = null;

    // get canvas context after component has rendered
    useEffect(() => {
        ctx.current = canvas.current.getContext('2d');
    }, [])

    const handleMouseDown = e => {
        const nativeEvent = e.nativeEvent;
        [startX, startY] = [nativeEvent.offsetX, nativeEvent.offsetY];
        props.mouseStatus.down = true;
        props.mouseStatus.drawing = true;
    };

    const handleMouseMove = e => {
        const nativeEvent = e.nativeEvent;
        if (props.mouseStatus.drawing) {
            ctx.current.beginPath();
            ctx.current.moveTo(startX, startY);
            ctx.current.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
            ctx.current.lineWidth = 2;
            ctx.current.stroke();
        }
        [startX, startY] = [nativeEvent.offsetX, nativeEvent.offsetY];
    };

    const handleMouseLeave = e => {
        if (props.mouseStatus.drawing) {
            const nativeEvent = e.nativeEvent;
            ctx.current.beginPath();
            ctx.current.moveTo(startX.current, startY.current);
            ctx.current.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
            ctx.current.lineWidth = 2;
            ctx.current.stroke();
        }
        props.mouseStatus.drawing = false;
    };

    const handleMouseEnter = e => {
        if (props.mouseStatus.down) {
            const nativeEvent = e.nativeEvent;
            [startX, startY] = [nativeEvent.offsetX, nativeEvent.offsetY];
            props.mouseStatus.drawing = true;
        }
    }

    return (
        <canvas 
            id="drawingBoard" 
            height="500px" 
            width="750px"
            ref={ canvas }
            onMouseDown={ handleMouseDown }
            onMouseMove={ handleMouseMove }
            onMouseLeave={ handleMouseLeave }
            onMouseEnter={ handleMouseEnter }
        />
    );
};