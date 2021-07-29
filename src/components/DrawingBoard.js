import { useRef, useEffect } from 'react';

export default function DrawingBoard(props) {
    const canvas = useRef(null);
    const ctx = useRef(null);
    const startX = useRef(null);
    const startY = useRef(null);
    // const drawing = useRef(false);
    // const mouseDown = useRef(false);

    // get canvas context after component has rendered
    useEffect(() => {
        ctx.current = canvas.current.getContext('2d');
    }, [])

    const handleMouseDown = e => {
        const nativeEvent = e.nativeEvent;
        [startX.current, startY.current] = [nativeEvent.offsetX, nativeEvent.offsetY];
        props.mouseDown.current = true;
        props.drawing.current = true;
    };

    const handleMouseMove = e => {
        const nativeEvent = e.nativeEvent;
        if (props.drawing.current) {
            ctx.current.beginPath();
            ctx.current.moveTo(startX.current, startY.current);
            ctx.current.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
            ctx.current.lineWidth = 2;
            ctx.current.stroke();
        }
        [startX.current, startY.current] = [nativeEvent.offsetX, nativeEvent.offsetY];
    };

    const handleMouseLeave = e => {
        if (props.drawing.current) {
            const nativeEvent = e.nativeEvent;
            ctx.current.beginPath();
            ctx.current.moveTo(startX.current, startY.current);
            ctx.current.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
            ctx.current.lineWidth = 2;
            ctx.current.stroke();
        }
        props.drawing.current = false;
    };

    const handleMouseEnter = e => {
        if (props.mouseDown.current) {
            const nativeEvent = e.nativeEvent;
            [startX.current, startY.current] = [nativeEvent.offsetX, nativeEvent.offsetY];
            props.drawing.current = true;
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