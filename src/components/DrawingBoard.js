import { useRef, useEffect } from 'react';

export default function DrawingBoard(props) {
    const canvas = useRef(null);
    let ctx = null;
    let startX = null;
    let startY = null;

    // get canvas context after component has rendered
    useEffect(() => {
        ctx = canvas.current.getContext('2d');
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
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        [startX, startY] = [nativeEvent.offsetX, nativeEvent.offsetY];
    };

    const handleMouseLeave = e => {
        if (props.mouseStatus.drawing) {
            const nativeEvent = e.nativeEvent;
            ctx.beginPath();
            ctx.moveTo(startX.current, startY.current);
            ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
            ctx.lineWidth = 2;
            ctx.stroke();
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