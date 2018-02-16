import {searchEnglishTerm} from './api/dictionary';
import {translateToPolish} from './api/toPolish';
import ko from 'knockout';

export default class DictionaryViewModel {
    constructor() {
      this.term = ko.observable('');
      this.results = ko.observableArray([]);
      this.translations = ko.observableArray([]);
      this.hasSearchedSomething = ko.observable(false);

      this.loading = ko.observable(false);
    }
  
    search() {
      this.hasSearchedSomething(true);
      this.loading(true);

      searchEnglishTerm(this.term()).then((results) => {
        this.results(results);
        this.loading(false);
      });

      translateToPolish(this.term()).then(translations => {
        this.translations(translations);
        this.loading(false);
      });
    }

  } 
  