import React, { Component } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import HousingGradeTable from './components/HousingGradeTable.js'
import SelectOwnership from './components/Filter.js'
import SelectQuarter from './components/Filter.js'
import SelectTerm from './components/Filter.js'
import SelectYear from './components/Filter.js'
import { getData } from './request/api.js'
import { separateData, aggregateBalances, filterBySelection } from './domain/dataFunctions.js'
import { FIELD_NAMES } from './domain/fields.js'

function defaultState() {
  return {
    dataByGrade: [], 
    filteredDataByGrade: [],
    aggregateBalanceByGrade: [],
    ownershipValues: [],
    quarterValues: [],
    termValues: [],
    yearValues: [],
    ownershipSelection: '',
    quarterSelection: '',
    termSelection: '',
    yearSelection: '',
  }
}

class App extends Component { 
  constructor() {
    super();
    this.state = defaultState();
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getData().then(result => {
      const { dataByGrade,
              ownershipValues,
              quarterValues,
              termValues,
              yearValues } = separateData(result),
              aggregateBalanceByGrade = aggregateBalances(dataByGrade);

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

  setOwnershipSelection(ownershipSelection) {
    this.setState({ownershipSelection}); 
    // heavy handed for now
    let newSet = filterBySelection(this.state.dataByGrade, ownershipSelection, FIELD_NAMES.OWNERSHIP)

    if (!!this.state.quarterSelection) newSet = filterBySelection(newSet, this.state.quarterSelection, FIELD_NAMES.QUARTER);
    if (!!this.state.termSelection) newSet = filterBySelection(newSet, this.state.termSelection, FIELD_NAMES.TERM);
    if (!!this.state.yearSelection) newSet = filterBySelection(newSet, this.state.yearSelection, FIELD_NAMES.YEAR);

    this.setState({aggregateBalanceByGrade: aggregateBalances(newSet)});
  }

  setQuarterSelection(quarterSelection) {
    this.setState({quarterSelection});
    let newSet = filterBySelection(this.state.dataByGrade, quarterSelection, FIELD_NAMES.QUARTER);

    if (!!this.state.ownershipSelection) newSet = filterBySelection(newSet, this.state.ownershipSelection, FIELD_NAMES.OWNERSHIP);
    if (!!this.state.termSelection) newSet = filterBySelection(newSet, this.state.termSelection, FIELD_NAMES.TERM);
    if (!!this.state.yearSelection) newSet = filterBySelection(newSet, this.state.yearSelection, FIELD_NAMES.YEAR);

    this.setState({aggregateBalanceByGrade: aggregateBalances(newSet)});
  }

  setTermSelection(termSelection) {
    this.setState({termSelection});
    let newSet = filterBySelection(this.state.dataByGrade, termSelection, FIELD_NAMES.TERM);

    if (!!this.state.ownershipSelection) newSet = filterBySelection(newSet, this.state.ownershipSelection, FIELD_NAMES.OWNERSHIP);
    if (!!this.state.quarterSelection) newSet = filterBySelection(newSet, this.state.quarterSelection, FIELD_NAMES.QUARTER);
    if (!!this.state.yearSelection) newSet = filterBySelection(newSet, this.state.yearSelection, FIELD_NAMES.YEAR);
    
    this.setState({aggregateBalanceByGrade: aggregateBalances(newSet)});
  }

  setYearSelection(yearSelection) {
    this.setState({yearSelection});
    let newSet = filterBySelection(this.state.dataByGrade, yearSelection, FIELD_NAMES.YEAR);

    if (!!this.state.ownershipSelection) newSet = filterBySelection(newSet, this.state.ownershipSelection, FIELD_NAMES.OWNERSHIP);
    if (!!this.state.quarterSelection) newSet = filterBySelection(newSet, this.state.quarterSelection, FIELD_NAMES.QUARTER);
    if (!!this.state.termSelection) newSet = filterBySelection(newSet, this.state.termSelection, FIELD_NAMES.TERM);

    this.setState({aggregateBalanceByGrade: aggregateBalances(newSet)});
  }

  resetState(){
    this.setState(defaultState());
    this.fetchData();
  }

  render() {
    return (
      <>
      <div className="App">
        <p>CHARTS AND GRAPHS</p>
        <div sx={{ margin: '20px'}}>
          <HousingGradeTable aggregates = {this.state.aggregateBalanceByGrade}/>
        </div>
        <div sx={{ margin: '20px'}}>
          <SelectOwnership title = 'Ownership' selection = {this.state.ownershipSelection} values = {this.state.ownershipValues} updateSelection = {this.setOwnershipSelection.bind(this)} />
          <SelectQuarter title = 'Quarter' selection = {this.state.quarterSelection} values = {this.state.quarterValues} updateSelection = {this.setQuarterSelection.bind(this)}/>
          <SelectTerm title = 'Term' selection = {this.state.termSelection} values = {this.state.termValues} updateSelection = {this.setTermSelection.bind(this)}/>
          <SelectYear title = 'Year' selection = {this.state.yearSelection} values = {this.state.yearValues} updateSelection = {this.setYearSelection.bind(this)}/>
        </div>
        <Button variant="contained" onClick={this.resetState.bind(this)}>Reset</Button>
      </div>
      </>
    )
  }
}

export default App
