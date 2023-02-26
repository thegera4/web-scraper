import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';
import ServerlessHttp from 'serverless-http';

export const app = express();
const url = 'https://www.elsiglodetorreon.com.mx';

const router = express.Router();

router.get('/', (req, res) => {
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
      res.status(200).send(articles);
    })
    .catch(error => {
      console.error(error)
      res.status(500).send(error);
    });
});

app.use('/.netlify/functions/index', router);
export const handler = ServerlessHttp(app);

//app.listen(3001, () => console.log(`Server running on port 3001`));