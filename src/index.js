import ko from 'knockout';
import DictionaryViewModel from './DictionaryViewModel';

ko.applyBindings(new DictionaryViewModel(), document.querySelector('#mainBody'));