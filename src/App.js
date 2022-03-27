import React, { Component } from 'react'
import './App.css'
import HousingGradeTable from './components/HousingGradeTable.js'

function createData(
  grade1: number,
  grade2: number,
  grade3: number,
  grade4: number,
) {
  return { grade1, grade2, grade3, grade4 };
}

class App extends Component {
  render() {
    return (
      <>
      <div className="App">
        <p>CHARTS AND GRAPHS</p>
        <HousingGradeTable {... createData(159, 6.0, 24, 4.0)}/>
      </div>
      </>
    )
  }
}

// fetch
// wrangle
// render

export default App
