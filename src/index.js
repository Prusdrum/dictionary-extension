import {searchEnglishTerm} from './dictionary';
import ko from 'knockout';

class DictionaryViewModel {
  constructor() {
    this.term = ko.observable('');
    this.results = ko.observable('');
  }

  search() {
    searchEnglishTerm(this.term())
    .then((results) => this.setResults(results));
  }

  setResults(results) {
    this.results(results);
  }
} 


ko.applyBindings(new DictionaryViewModel(), document.querySelector('#mainBody'));



// document.addEventListener('DOMContentLoaded', () => {
//     const input = document.querySelector('#termInput');
//     const btn = document.querySelector('#searchBtn');
//     const resultsDOM = document.querySelector('#results');
  
//     btn.addEventListener('click', () => {
//       const value = input.value;
//       searchEnglishTerm(value).then(setResults(resultsDOM));
//     });
  
//     const setResults = (resultsDOM) => (results) => {
//       console.log(results)
//       resultsDOM.text = results;
//     }
  
//   });
  