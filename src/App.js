import './App.css';
import DrawingBoard from './components/DrawingBoard';

function App() {
  const mouseStatus = {
    down: false,
    drawing: false,
  };

  const handleMouseUp = e => {
    mouseStatus.drawing = false;
    mouseStatus.down = false;
  };

  return (
    <div className="App" onMouseUp={ handleMouseUp }>
      <h1>Drawing App</h1>
      <DrawingBoard
        mouseStatus={ mouseStatus }
      />
    </div>
  );
}

export default App;
