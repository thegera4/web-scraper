import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';

export const app = express();
const url = 'https://www.elsiglodetorreon.com.mx';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles: { title: string; url: string | undefined; }[] = [];
    $('article', html).each(function() {
      const title = $(this).text();
      const link = $(this).find('a').attr('href');
      articles.push({ title, url: url + link });
    });
    console.log(articles);
  })
  .catch(error => console.error(error));

app.listen(3001, () => console.log(`Server running on port 3001`));