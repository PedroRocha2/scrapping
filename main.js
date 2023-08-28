const puppeteer = require('puppeteer');
const linkEmpresa = document.querySelector('[data-id]')

(async () => {
  const browser = await puppeteer.launch({   
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
    timeout: 60000,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], });
  const page = await browser.newPage();

  try {
    await page.goto(`${linkEmpresa}`);
    await page.waitForSelector("div .MjjYud");


    const titulos = await page.evaluate(() => {
      const empresas = Array.from(document.querySelectorAll("div .yuRUbf h3"));
      return empresas.map(el => el.textContent);
    });

    console.log(titulos);

  } 

  catch (error) {
    console.error('Erro durante o web scraping:', error);
  } finally {
    await browser.close();
  }
})();