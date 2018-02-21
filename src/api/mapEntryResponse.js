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


const mapResponse = (entry) => {
    return {
        headword: entry.hw,
        pronunciation: entry.pr,
        definition: entry.def,
        definedRunOn: entry.dro,
        inflection: entry.in,
        functionalLabel: entry.fl,
        self: entry.$
    }
}


const mapModel = (entry) => {
    return {
        pronunciation: entry.pronunciation ? entry.pronunciation[0] : '',
        partOfSpeech: entry.functionalLabel ? entry.functionalLabel[0]: '',
        term: entry.self ? entry.self.id : '',
        definition: getDefinition(entry)
    }
}


export default (data) => {
    if (data.entry_list.entry) {
        return data.entry_list.entry
            .map(mapResponse)
            .map(mapModel);
    } else {
        return [];
    }
}