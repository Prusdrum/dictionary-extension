import {MERRIAM_WEBSTER_API_KEY as API_KEY} from '../../config.json';
import {parseString} from 'xml2js';
import mapEntryResponse from './mapEntryResponse'

const parseXML = (text) => {
    return new Promise((resolve) => {
        parseString(text, (err, result) => {
            resolve(result);
        });
    });
}

const termTypes = {
    NOUN: 'noun',
    VERB: 'verb'
}


const mapResponse = (data) => {
    if (data.entry_list.entry) {
        return data.entry_list.entry.map(mapEntryResponse);
    } else {
        return [];
    }
}

export const searchEnglishTerm = (term) => {
    const url =  `https://www.dictionaryapi.com/api/v1/references/learners/xml/${term}?key=${API_KEY}`;
  
    return fetch(url)
    .then(response => response.text())
    .then(parseXML)
    .then(mapResponse);
}