import cheerio from 'cheerio';

const mapPageToModel = (page) => {
    const $ = cheerio.load(page);

    const term = $('.quick-results .quick-result-entry .quick-result-option .babQuickResult');
    const translations = $('.quick-results:first-of-type .quick-result-entry .quick-result-overview .sense-group-results li > a').map((i ,el) => {
        return $(el).text();
    })
    console.log(term.html());
    console.log(translations);
}



export const translateToPolish = (term) => {
    const url = `https://en.bab.la/dictionary/english-polish/${term}`;

    return fetch(url)
    .then(response => response.text())
    .then(mapPageToModel);
}