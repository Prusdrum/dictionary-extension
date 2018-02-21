import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';

const getDefinition = (entry) => {
    if (entry.definition && entry.definition[0] && entry.definition[0].dt) {
        const dt = entry.definition[0].dt[0];

        if (dt._) {
            return dt._;
        }

        if (typeof dt === 'string') {
            return dt;
        }

    } else {
        if (entry.definedRunOn[0] && entry.definedRunOn[0].def && entry.definedRunOn[0].def[0]) {
            const def = entry.definedRunOn[0].def[0];
    
            if (def.dt && def.dt[0] && def.dt[0].un && def.dt[0].un[0] && def.dt[0].un[0]._) {
                return def.dt[0].un[0]._;
            }
        }
    }

    return '';
}


const mapSelf = (self) => {
    return self.id;
}

const mapHeadword = (headword) => {
    if (isString(headword[0])) {
        //no highlight
        return {
            self: headword[0],
            highlight: false
        }
    } else {
        //highlight
        return {
            self: headword[0]._,
            highlight: true
        }
    }
}

const mapFunctionalLabel = (functionalLabel) => {
    const label = functionalLabel[0];

    return {
        name: label,
        isNoun: label === 'noun',
        isVerb: label === 'verb',
        isAdjective: label === 'adjective',
        isAdverb: label === 'adverb',
        isPreposition: label === 'preposition'
    }
}

const mapPronounciation = (pronunciation) => {
    if (isUndefined(pronunciation)) {
        return null;
    } else {
        return pronunciation[0];
    }
}

const mapResponse = (entry) => {
    return {
        self: mapSelf(entry.$),
        headword: mapHeadword(entry.hw),
        functionalLabel: mapFunctionalLabel(entry.fl),
        pronunciation: mapPronounciation(entry.pr),
        definition: entry.def,
        definedRunOn: entry.dro,
        inflection: entry.in
    }
}

const mapModel = (entry) => {
    return {
        pronunciation: entry.pronunciation ? entry.pronunciation[0] : '',
        partOfSpeech: entry.functionalLabel,
        term: entry.self ? entry.self : '',
        definition: getDefinition(entry)
    }
}


export default (data) => {
    if (data.entry_list.entry) {
        console.log('raw', data.entry_list.entry);
        console.log( data.entry_list.entry
            .map(mapResponse));
        return data.entry_list.entry
            .map(mapResponse)
            .map(mapModel);
    } else {
        return [];
    }
}