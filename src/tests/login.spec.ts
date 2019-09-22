import * as puppeteer from 'puppeteer';
import { expect } from 'chai';
const config = require('../config/config');
const { loadUrl, click, typeText, getText } = require('../helper/helper.js');

describe('ecosystem-catalog tests', () => {
    let browser;
    let page;

    before(async () => {
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            timeout: config.launchTimeout,
            devtools: config.isDevTool,
        });
        page = await browser.newPage();
        await page.setDefaultTimeout(config.waitingTimeout);
        await page.setViewport({ width: config.viewportWidth, height: config.viewportHeight });
    });

    after(async () => {
        await browser.close();
    });

    it('Explore Home-> Hardware-> Hardware', async () => {
        await loadUrl(page, config.baseUrl);
        await click(page, '.en > #root > div > .eco-home');
        await click(page, '.container > .row > .pfe-l-grid > .card:nth-child(1) > .btn');
        await click(page, '.eco-hardware > .container > .pfe-l-grid > .pfe-m-12-col-on-xs:nth-child(1) > .btn');

        const url = await page.url();
        const title = await page.title();
        expect(url).to.contain('hardware');
        expect(title).to.contains('Hardware');
    });

    it('Explore Home-> Hardware-> Hardware and search hardware', async (done) => {
        await loadUrl(page, config.baseUrl);
        await click(page, '.en > #root > div > .eco-home');
        await click(page, '.container > .row > .pfe-l-grid > .card:nth-child(1) > .btn');
        await click(page, '.eco-hardware > .container > .pfe-l-grid > .pfe-m-12-col-on-xs:nth-child(1) > .btn');

        await click(page, '.row #searchBar');
        await typeText(page, 'make hardware', '.row #searchBar');
        await click(page, '.row > .col-xs-12 > .eco-search-bar > .pf-c-input-group > .pf-c-button');
        // await page.waitForNavigation();
        await click(page, '.pfe-l-grid > .pf-c-card > .eco-search-result-container--link > .pf-c-card__body > .eco-search-result--body__title');
        const title = await getText(page, '.eco-cloud-detail--masthead > .container > .row > .col-xs-12 > .eco-cloud-detail--masthead-title');
        expect(title).to.contain('make hardware granularity');
        // page.on('console', msg => console.log('PAGE LOG:', msg.text));
        done();
    });
});
