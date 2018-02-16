import cheerio from 'cheerio';

const mapPageToModel = (page) => {
    const $ = cheerio.load(page);

    const term = $('.quick-results').eq(0)
    .find('.quick-result-entry ')
    .text();

    const $entries = $('.quick-results').eq(0).find('.quick-result-entry').has('.quick-result-option');

    const terms = $entries.map((i, el) => ({
        term: $(el).find('.quick-result-option .babQuickResult').text(),
        translations: $(el)
            .find('.quick-result-overview .sense-group-results li > a')
            .map((i, translationElement) => $(translationElement).text()).get()
    })).get();

    return terms;
}



export const translateToPolish = (term) => {
    const url = `https://en.bab.la/dictionary/english-polish/${term}`;

    return fetch(url)
    .then(response => response.text())
    .then(mapPageToModel);
}