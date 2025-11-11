import { useState } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/Die'
import Confetti from 'react-confetti'

function App() {

  const [numArr, setNumArr] = useState(() => generateAllNewDice())

  const gameWon = numArr.every(die => die.isHeld) && numArr.every(die => die.value === numArr[0].value)


  // generate an array of 10 objects that contain a value, isHeld and id property
  function generateAllNewDice() {
    const newDice = []
    for (let i=0; i < 10; i++) {
      const rand = Math.ceil(Math.random() * 6)
      newDice.push({value: rand, isHeld: false, id: nanoid()})
    }
    return newDice
  }

  // Regenrate Dice onClick of Roll button if isHeld is false
  function rollDice() {
    if (gameWon) {
      setNumArr(generateAllNewDice())
    } else {
      setNumArr(prevNumArr => (
      prevNumArr.map(item => ( 
        item.isHeld ? item : {...item, value: Math.ceil(Math.random() * 6)}
      ))
    ))
    }
    
  }

  // function that holds the dice based on the id passed and flipping the isHeld property
  function hold(id) {
    setNumArr(prevNumArr => (
      prevNumArr.map(item => (
        item.id === id ? {...item, isHeld: !item.isHeld} : item
      ))
    ))
  }

  // Mapping over the numArr state to create instances of the Die Component
  const diceEl = numArr.map(itemObj => (
    <Die 
    key={itemObj.id} 
    value={itemObj.value} 
    isHeld={itemObj.isHeld}
    hold={hold}
    id={itemObj.id}/>))

  return (
    <main className='main'>
      {gameWon && <Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die-container'>
        {diceEl}
      </div>
      <button className='roll-button' onClick={rollDice}>{`${gameWon ? "New Game" : "Roll"}`}</button>
    </main>
    
  )
}

export default App
