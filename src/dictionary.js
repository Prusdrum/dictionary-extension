import {MERRIAM_WEBSTER_API_KEY as API_KEY} from '../config.json';
import {parseString} from 'xml2js';

const parseXML = (text) => {
    return new Promise((resolve) => {
        parseString(text, (err, result) => {
            resolve(result);
        });
    });
}

export const searchEnglishTerm = (term) => {
    return new Promise((resolve, reject) => {
        const url =  `https://www.dictionaryapi.com/api/v1/references/learners/xml/${term}?key=${API_KEY}`;
  
        fetch(url)
        .then(response => response.text())
        .then(parseXML)
        .then((data) => {
            console.log(data);
            resolve(JSON.stringify(data, null, 2));
        })
      });
}