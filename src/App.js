import React, { Component } from 'react'
import './App.css'
import HousingGradeTable from './components/HousingGradeTable.js'
import { getData } from './request/api.js'

function separateByGrade(data) {
  const dataByGrade = [];
  
  data.forEach(element => {
    if (!element.grade) return;  

    // terrible ideas
    if (!dataByGrade[parseInt(element.grade)-1]) dataByGrade[parseInt(element.grade)-1] = [];
    dataByGrade[parseInt(element.grade)-1].push(element);
  });

  return dataByGrade;
}

function aggregateBalances(dataByGrade) { // make it totally unreadable
  return dataByGrade.map(grade => grade.reduce((acc, curr) => acc + parseFloat(curr.currentBalance), 0) / grade.length);
}

class App extends Component { 
  constructor() {
    super();
    // this state will go in a store so we can reset/recall api
    this.state = {
      dataByGrade: [], 
      aggregateBalanceByGrade: []
    };
  }

  componentDidMount() {
    getData().then(result => {
      const dataByGrade = separateByGrade(result),
      aggregateBalanceByGrade = aggregateBalances(dataByGrade)

      this.setState({
        dataByGrade,
        aggregateBalanceByGrade
      })
    }) 
  }

  render() {
    return (
      <>
      <div className="App">
        <p>CHARTS AND GRAPHS</p>
        <HousingGradeTable aggregates = {this.state.aggregateBalanceByGrade}/>
      </div>
      </>
    )
  }
}

// fetch
// wrangle
// render

export default App
