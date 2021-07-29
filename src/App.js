import './App.css';
import { useRef } from 'react';
import DrawingBoard from './components/DrawingBoard';

function App() {
  const drawing = useRef(false);
  const mouseDown = useRef(false);

  const handleMouseUp = e => {
    drawing.current = false;
    mouseDown.current = false;
  };

  return (
    <div className="App" onMouseUp={ handleMouseUp }>
      <h1>Drawing App</h1>
      <DrawingBoard
        drawing={ drawing }
        mouseDown={ mouseDown }
      />
    </div>
  );
}

export default App;
