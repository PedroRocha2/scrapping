const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({   
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
    timeout: 60000,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], });
  const page = await browser.newPage();

  let titulos = [];
  let linksEmpresas = [];
  const leads = []

  // pegando as informações nescessárias dos leads pelo google

  try {
    await page.goto('https://www.google.com/search?q=site%3Alinkedin.com%2Fcompany+%2211-50+funcion%C3%A1rios%22&sca_esv=560734445&rlz=1C1VDKB_pt-PTBR1058BR1058&ei=nt_sZKrKIIKY1sQPz9Wg0A0&ved=0ahUKEwiqkaO59v-AAxUCjJUCHc8qCNoQ4dUDCA8&uact=5&oq=site%3Alinkedin.com%2Fcompany+%2211-50+funcion%C3%A1rios%22&gs_lp=Egxnd3Mtd2l6LXNlcnAiL3NpdGU6bGlua2VkaW4uY29tL2NvbXBhbnkgIjExLTUwIGZ1bmNpb27DoXJpb3MiSJX3H1AAWABwA3gAkAEAmAEAoAEAqgEAuAEDyAEA4gMEGAEgQYgGAQ&sclient=gws-wiz-serp');
    await page.waitForSelector("div .MjjYud");

    titulos = await page.evaluate(() => {
      const empresas = Array.from(document.querySelectorAll("div .yuRUbf h3"));
      return empresas.map(el => el.textContent);
    });

  } catch(error) {
    console.error('Erro durante o web scraping dos títulos:', error);
  }

  try {
    linksEmpresas = await page.evaluate(() => {
      const linkes = Array.from(document.querySelectorAll("div .yuRUbf a"));
      return linkes.map(el => el.getAttribute('href'));
    });
   
  } catch (error) {
    console.error('Erro durante o web scraping dos links:', error);
  }
  try {
    setor = await page.evaluate(() => {
      const descricao = Array.from(document.querySelectorAll("div .VwiC3b span"));
      return descricao.map(el => el.textContent);
    });
   
  } catch (error) {
    console.error('Erro durante o web scraping dos links:', error);
  }
  finally {
    await browser.close();
  }

  for (let i = 0; i < titulos.length; i++) {
    const lead = {
      titulo: titulos[i],
      link: linksEmpresas[i],
      setores: setor[i]
    };
    leads.push(lead);
  }
console.log(leads);

})()

;