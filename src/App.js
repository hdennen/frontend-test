import React, { Component } from 'react'
import './App.css'
import HousingGradeTable from './components/HousingGradeTable.js'
import SelectOwnership from './components/Filter.js'
import SelectQuarter from './components/Filter.js'
import SelectTerm from './components/Filter.js'
import SelectYear from './components/Filter.js'
import { getData } from './request/api.js'

function separateData(data) {
  const dataByGrade = [],  
        ownershipValues = new Set(),
        quarterValues = new Set(),
        termValues = new Set(),
        yearValues = new Set();

  data.forEach(element => { // who's for premature optimization? let's do it in the first pass.
    if (!element.grade) return;

    ownershipValues.add(element.homeOwnership);
    quarterValues.add(element.quarter);
    termValues.add(element.term);
    yearValues.add(element.year);

    // terrible ideas
    if (!dataByGrade[parseInt(element.grade)-1]) dataByGrade[parseInt(element.grade)-1] = [];
    dataByGrade[parseInt(element.grade)-1].push(element);
  });

  return {
    dataByGrade,
    ownershipValues: [...ownershipValues],
    quarterValues: [...quarterValues],
    termValues: [...termValues],
    yearValues: [...yearValues]
  };
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
      aggregateBalanceByGrade: [],
      ownershipValues: [],
      quarterValues: [],
      termValues: [],
      yearValues: []
    };
  }

  componentDidMount() {
    getData().then(result => {
      const { dataByGrade,
              ownershipValues,
              quarterValues,
              termValues,
              yearValues } = separateData(result),
              aggregateBalanceByGrade = aggregateBalances(dataByGrade);

      console.log(dataByGrade);

      this.setState({
        dataByGrade,
        ownershipValues,
        quarterValues,
        termValues,
        yearValues,
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
        <SelectOwnership values = {this.state.ownershipValues} title = 'Ownership'/>
        <SelectQuarter values = {this.state.quarterValues} title = 'Quarter'/>
        <SelectTerm values = {this.state.termValues} title = 'Term'/>
        <SelectYear values = {this.state.yearValues} title = 'Year'/>
      </div>
      </>
    )
  }
}

export default App
