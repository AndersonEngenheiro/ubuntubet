import express from 'express';
import scrap from './scraping.js'
import { chromium, webkit, firefox } from "playwright-chromium";

const app = express()

const port = process.env.PORT || 8000

app.get('/', (req, res)=>{
    res.send('bot is working')

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    scrap.callAll();
})
