const getDefinition = (entry) => {
    if (entry.def && entry.def[0] && entry.def[0].dt) {
        const dt = entry.def[0].dt[0];

        if (dt._) {
            return dt._;
        }

        if (typeof dt === 'string') {
            return dt;
        }

    } else {
        if (entry.dro[0] && entry.dro[0].def && entry.dro[0].def[0]) {
            const def = entry.dro[0].def[0];
            console.log(def);
    
            if (def.dt && def.dt[0] && def.dt[0].un && def.dt[0].un[0] && def.dt[0].un[0]._) {
                return def.dt[0].un[0]._;
            }
        }
    }

    return '';
}


export default (entry) => {
    return {
        pronunciation: entry.pr ? entry.pr[0] : '',
        partOfSpeech: entry.fl ? entry.fl[0]: '',
        term: entry.$ ? entry.$.id : '',
        definition: getDefinition(entry)
    }
}