import puppeteer from 'puppeteer';
import {Parser} from 'acorn';

export async function getData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Extract the scripts and HTML tags
  const scripts = await page.$$eval('script', (elements) =>
    elements.map((element) => element.textContent)
  );
  
  const tags = await page.$$eval('*', (elements) =>
    elements.map((element) => element.tagName)
  );
  const javascriptSource = await page.$$eval('script', (elements) =>
    elements.map((element) => element.textContent)
  );
  const acorn = new Parser({sourceType:'module',ecmaVersion:'latest'})
  const ast = acorn.parse(javascriptSource.join('\n'));
  
  await browser.close()
  return {
    ast,
    tags,
    scripts
  }
  }