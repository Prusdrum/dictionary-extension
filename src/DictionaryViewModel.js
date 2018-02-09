import {searchEnglishTerm} from './dictionary';
import ko from 'knockout';

export default class DictionaryViewModel {
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
  