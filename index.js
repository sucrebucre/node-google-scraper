const GoogleScraper = require('google-scraper');
const tinyreq = require("tinyreq");
const getEmails = require('get-emails');
const emailRegex = require('email-regex');
const {parse, tldExists} = require('tldjs');

const options = {
  keyword: "elektronica contact",
  language: "nl",
  tld:"nl",
  results: 100
};

const scrape = new GoogleScraper(options);

let email_array = [];

scrape.getGoogleLinks.then(function(value) {

  console.log(value.length);

  for(i=0;i<value.length;i++){

  tinyreq(value[i], (err, body) => {

      if (body != null) {
        let remove_javascript = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi);
        let cleanText = remove_javascript.replace(/<\/?[^>]+(>|$)/g, "");
        let tld_check = cleanText.match(emailRegex());

        let substring_check = "@media";
        let substring_check_2 = "&nbsp";

        if (tldExists(tld_check) == true){

          for (i=0; i<tld_check.length; i++){

            if(tld_check[i].includes(substring_check) == false && tld_check[i].includes(substring_check_2) == false) {
              console.log(tld_check[i]);
            }
          }

        }
      }

  });

}

}).catch(function(e) {
  console.log(e);
})
