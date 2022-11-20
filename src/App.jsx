import { useState } from 'react';
import './App.css'

function App() {

  const [circles, setCircles] = useState([]);
  const [circlesToForwards, setCirclesToForwards] = useState([]);

  function addCircle(e) {
    const {clientX, clientY, target} = e;
    setCircles([...circles, {x: clientX, y: clientY, target: target}])
  }

  function removeCircle() {
    const removedCircles = [...circles];
    const removed = removedCircles.pop();
    if(!removed) return;
    setCirclesToForwards([...circlesToForwards, removed]);
    setCircles(removedCircles);
  }

  function returnCircle() {
    const returnedCircles = [...circlesToForwards];
    const returned = returnedCircles.pop();
    if(!returned) return;
    setCircles([...circles, returned]);
    setCirclesToForwards(returnedCircles);
  }

  return (
    <>
      <button disabled={circles.length === 0} onClick={removeCircle} className='buttons button-back'>Step back</button>
      <button disabled={circlesToForwards.length === 0} onClick={returnCircle} className='buttons button-forward'>Step forward</button>
      <div onClick={addCircle} className="App">
        {circles.map((circle, index) => (
         circle.target.className === 'buttons' || circle.target.className === 'circle' ? null : <div key={index} className='circle' style={{top: circle.y + 'px', left: circle.x + 'px'}}></div>
        ))}
      </div>
    </>
  )
}

export default App
