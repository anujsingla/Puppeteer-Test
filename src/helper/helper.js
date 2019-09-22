module.exports = {
    click: async function(page, selector) {
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
        } catch(error) {
            throw new Error(`Could not click on selector ${selector} ${error}`);
        }
    },
    typeText: async function(page, text, selector) {
        try {
            await page.waitForSelector(selector);
            await page.type(selector, text);
        } catch(error) {
            throw new Error(`Could not type text on selector ${selector} ${error}`);
        }
    },
    loadUrl: async function(page, url) {
        try {
            await page.goto(url);
        } catch(error) {
            throw new Error(`Could not load url on selector ${url} ${error}`);
        }
    },
    getText: async function(page, selector) {
        try {
            await page.waitForSelector(selector);
            return page.$eval(selector, e => e.innerHTML);
        } catch(error) {
            throw new Error(`Could not get text on selector ${selector} ${error}`);
        }
    },

    getCount: async function(page, selector) {
        try {
            await page.waitForSelector(selector);
            return page.$$eval(selector, items => items.length);
        } catch(error) {
            throw new Error(`Could not get count on selector ${selector} ${error}`);
        }
    },

    waitForText: async function(page, selector, text) {
        try {
            await page.waitForSelector(selector);
            return page.waitForFunction((selector, text) =>
                document.querySelector(selector).innerText.includes(text),
            {}, selector, text);
        } catch(error) {
            throw new Error(`Could not waitForText on selector ${selector} ${error}`);
        }
    },

    pressKey: async function(page, key) {
        try {
            await page.keyboard.press(key);
        } catch(error) {
            throw new Error(`Could not pressKey on key ${key} ${error}`);
        }
    },

    shouldExist: async function(page, selector) {
        try {
            await page.waitForSelector(selector, {visible: true});
        } catch(error) {
            throw new Error(`selector Could not exist shouldExist  ${selector} ${error}`);
        }
    },

    shouldNotExist: async function(page, selector) {
        try {
            await page.waitFor(() => !document.querySelector(selector));
        } catch(error) {
            throw new Error(`selector Could not exist shouldNotExist  ${selector} ${error}`);
        }
    },
}
// list of cards after search
// 