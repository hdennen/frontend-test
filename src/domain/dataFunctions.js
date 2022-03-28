export function separateData(data) {
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

export function aggregateBalances(dataByGrade) { // make it totally unreadable
  return dataByGrade.map(grade => grade.reduce((acc, curr) => acc + parseFloat(curr.currentBalance), 0) / grade.length);
}

export function filterBySelection(data, selection, fieldName) {
  return data.map(gradeData => gradeData.filter(item => item[fieldName] === selection));
}