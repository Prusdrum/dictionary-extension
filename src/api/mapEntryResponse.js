export default (entry) => {
    return {
        pronunciation: entry.pr ? entry.pr[0] : '',
        partOfSpeech: entry.fl ? entry.fl[0]: '',
        term: entry.$ ? entry.$.id : ''
    }
}