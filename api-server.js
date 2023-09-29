const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Other CORS headers can be set here as needed
  next();
});

app.get('/scrape', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let leads = [];

  try {
    await page.goto('https://www.google.com/search?q=site%3Alinkedin.com%2Fcompany+%2211-50+funcion%C3%A1rios%22&rlz=1C1VDKB_pt-PTBR1058BR1058&oq=site&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg5MgsIAhBFGCcYOxiKBTINCAMQABiDARixAxiABDINCAQQABiDARixAxiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBBzYzN2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8');
    await page.waitForSelector("div .MjjYud");

    const titulos = await page.evaluate(() => {
      const empresas = Array.from(document.querySelectorAll("div .yuRUbf h3"));
      return empresas.map(el => el.textContent);
    });

    console.log(titulos);

    const linksEmpresas = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("div .yuRUbf a"));
      return links.map(el => el.getAttribute('href'));
    });
    console.log(linksEmpresas);

    const setores = await page.evaluate(() => {
      const setores = Array.from(document.querySelectorAll("div .VwiC3b span"));
      return setores.map(el => el.textContent);
    });
    

    console.log(setores)

    // Criar objetos e adicionar ao array leads
    for (let i = 0; i < titulos.length; i++) {
      const lead = {
        titulo: titulos[i],
        link: linksEmpresas[i],
        setor: setores[i]
      };
      leads.push(lead);
    }

    res.json(leads);

  } catch (error) {
    console.error('Erro durante o web scraping:', error);
    res.status(500).json({ error: 'Erro durante o web scraping' });
  } finally {
    await browser.close();
  }
});

app.listen(port, () => {
  console.log(`API está rodando em http://localhost:${port}`);
});