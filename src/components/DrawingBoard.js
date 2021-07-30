import { useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function DrawingBoard(props) {
    const canvas = useRef(null);
    const ctx = useRef(null);
    const socket = useRef(null);
    let startX = useRef(null);
    let startY = useRef(null);

    // const socket = io(process.env.REACT_APP_SOCKET_IO_URL);

    // get canvas context after component has rendered
    useEffect(() => {
        ctx.current = canvas.current.getContext('2d');
    }, []);

    // create socket after component has rendered
    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET_IO_URL);
    }, []);

    //  manually add touch events (necessary to preventDefault())
    useEffect(() => {    
        const handleTouchStart = e => {
            e.preventDefault();
            const touch = e.touches[0];
            [startX.current, startY.current] = [touch.pageX - e.target.offsetLeft, touch.pageY - e.target.offsetTop];
            props.mouseStatus.down = true;
            props.mouseStatus.drawing = true;
        };
        const handleTouchMove = e => {
            e.preventDefault();
            const touch = e.touches[0];
            const [x, y] = [touch.pageX - e.target.offsetLeft, touch.pageY - e.target.offsetTop];
            if (props.mouseStatus.drawing) {
                ctx.current.beginPath();
                ctx.current.moveTo(startX.current, startY.current);
                ctx.current.lineTo(x, y);
                ctx.current.lineWidth = 2;
                ctx.current.stroke();
            }
            [startX.current, startY.current] = [x, y];
        };

        canvas.current.addEventListener('touchstart', handleTouchStart, {passive: false});
        canvas.current.addEventListener('touchmove', handleTouchMove, {passive: false});
    }, []);

    const handleMouseDown = e => {
        const nativeEvent = e.nativeEvent;
        [startX.current, startY.current] = [nativeEvent.offsetX, nativeEvent.offsetY];
        props.mouseStatus.down = true;
        props.mouseStatus.drawing = true;
    };

    const handleMouseMove = e => {
        const nativeEvent = e.nativeEvent;
        if (props.mouseStatus.drawing) {
            ctx.current.beginPath();
            ctx.current.moveTo(startX.current, startY.current);
            ctx.current.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
            ctx.current.lineWidth = 2;
            ctx.current.stroke();
        }
        [startX.current, startY.current] = [nativeEvent.offsetX, nativeEvent.offsetY];
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
            [startX.current, startY.current] = [nativeEvent.offsetX, nativeEvent.offsetY];
            props.mouseStatus.drawing = true;
        }
    }

    const handleSubmit = e => {
        const imgData = canvas.current.toDataURL('image/png');
        socket.current.emit('roomImage', imgData, 'react');
    }

    return (
        <>
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
            <button onClick={ handleSubmit }>Send</button>
        </>
    );
};