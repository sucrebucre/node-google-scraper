const GoogleScraper = require('google-scraper');
const Scraper = require("email-crawler");
const each = require('promise-each');

const options = {
  keyword: "nu contact",
  language: "nl",
  tld:"nl",
  results: 10
};

let url_array = [];

const scrape = new GoogleScraper(options);

scrape.getGoogleLinks.then(function(value) {

  for (i=0; i < value.length; i++){
    url_array.push(value[i]);
  }

})

.then(function(value) {
//
//   console.log("Everything is loaded");
//   console.log(url_array);
//
//     //http://bluebirdjs.com/docs/api/promise.each.html
//     //https://stackoverflow.com/questions/41607804/promise-each-without-bluebird
//
//     let emailscraper = new Scraper(url_array[0]);
//
//     emailscraper.getLevels(1)
//     .then((emails) => {
//       console.log(emails);
//     })

Promise.resolve(url_array)

  .then(each((val) =>
    console.log(val)
  ))


//
 })
.catch(function(e) {
  console.log(e);
})
