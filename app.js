const puppeteer = require('puppeteer');

async function start() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250
    });
    const page = await browser.newPage();
    await page.goto('http://allwebco-templates.com/support/S_script_IFrame.htm', {waituntil: "networkidle0"});

    //Find the iFrame with the URL http://www.allwebco-templates.com/support/
    const frame = await page.frames().find(f => f.url() === 'http://www.allwebco-templates.com/support/');
    if(!frame){
        console.log("iFrame not found with the specified url");
        process.exit(0);
    }

    console.log("Frame found");

    //Get the link element of text "Updating for Mobile" and store the element into a variable
    const element = await frame.$('div.pagewrapper div[id="contentbox-h"] a');

    //Click the element
    await element.click();
    console.log(`Element has been clicked`);

    await page.waitFor(5000);
    await page.close();
    console.log(`Browser has been closed`);

    process.exit(0);
}

start();
