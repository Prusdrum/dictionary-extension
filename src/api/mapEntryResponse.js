import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';

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

const mapDefiningText = (definingText) => {
    if (isUndefined(definingText)) {
        return {
            text: '',
            verbalIllustration: null,
            usageNode: null
        }
    } else if (isString(definingText[0])) {
        return {
            text: definingText[0],
            verbalIllustration: null,
            usageNode: null
        }
    } else {
        const node = definingText[0];

        return {
            text: node._,
            verbalIllustration: node.vi,
            usageNode: node.un
        }
    }
}

const mapDefinition = (definition) => {
    if (isUndefined(definition)) {
        return {
            definingText: mapDefiningText()
        }
    } else {
        const definitionNode = definition[0];

        return {
            definingText: mapDefiningText(definitionNode.dt)
        }
    }
}

const mapResponse = (entry) => {
    return {
        self: mapSelf(entry.$),
        headword: mapHeadword(entry.hw),
        functionalLabel: mapFunctionalLabel(entry.fl),
        pronunciation: mapPronounciation(entry.pr),
        definition: mapDefinition(entry.def),
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
        definition: entry.definition.definingText.text
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