import { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css'

function App() {

  const [circles, setCircles] = useState([]);
  const [circlesToForwards, setCirclesToForwards] = useState([]);
  const [dropped, setDropped] = useState(false);

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
      <div className='buttons'>
        <button disabled={circles.length === 0} onClick={removeCircle}>Step back</button>
        <button disabled={circlesToForwards.length === 0} onClick={returnCircle}>Step forward</button>
        <button disabled={circles.length === 0} onClick={() => {setDropped(!dropped)}}>Drop Circles</button>
      </div>

      <div onClick={addCircle} className="App">

        {circles.map((circle, index) => (
         circle.target.className === 'buttons' || circle.target.className === 'circle' ? null : 
         
          <motion.div 
            animate={{y : dropped ? 93 + 'vh': circle.y - 15 + 'px'}}
            whileHover={{backgroundColor: 'rgb(255, 0, 0)', boxShadow: '#FF0000 1px 3px 20px'}}
            transition={{type: dropped ? 'spring': undefined}}
            key={index} className='circle' 
            style={{ left: circle.x - 15 + 'px'}}>
          </motion.div>

        ))}

      </div>
    </>
  )
}

export default App
