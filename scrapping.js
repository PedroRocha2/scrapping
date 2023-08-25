const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({   headless: false,
    timeout: 60000,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.linkedin.com/company/exact-sales/');
    await page.waitForSelector("div .inline-block");

    // Extrair o link do LinkedIn
      const linkedinFuncionarios = await page.$("#ember331");
      const funcionarios = linkedinFuncionarios.value; 
      console.log (funcionarios)
      return funcionarios;

  } catch (error) {
    console.error('Erro durante o web scraping:', error);
  } finally {
    await browser.close();
  }
})();
