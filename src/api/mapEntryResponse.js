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
    const headwordNode = headword[0];
    if (isString(headwordNode)) {
        //no highlight
        return {
            self: headwordNode,
            highlight: false
        }
    } else {
        //highlight
        return {
            self: headwordNode._,
            highlight: headwordNode.$.highlight === "yes"
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

const mapModel = (term) => (entry) => {
    return {
        pronunciation: entry.pronunciation,
        partOfSpeech: entry.functionalLabel,
        highlight: entry.headword.highlight || entry.headword.self === term,
        term: entry.self ? entry.self : '',
        definition: getDefinition(entry)
    }
}


export default (term) => (data) => {
    if (data.entry_list.entry) {
        console.log('raw', data.entry_list.entry);
        console.log( data.entry_list.entry
            .map(mapResponse));
        return data.entry_list.entry
            .map(mapResponse)
            .map(mapModel(term));
    } else {
        return [];
    }
}