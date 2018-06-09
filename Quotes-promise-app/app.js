const axios = require('axios');


const argv = require('yargs')
    .alias('c', 'cat')
    .describe('c', 'Category to get quotes about. Example - movies, cat, etc.')
    .alias('n', 'num-of-quotes')
    .describe('n', 'number of quotes to retrieve')
    //.demandCommand(1, minMsg = 'At least one command is required')
    //.demandOption(['t'], msg='Title required')
    .argv;

if (argv.n === undefined || argv.n <= 0) {
    argv.n = 1;
}

if (argv.c === '' || argv.c === undefined) {
    argv.c = "famous";
}

const url = `https://andruxnet-random-famous-quotes.p.mashape.com/?cat=${argv.c}&count=${argv.n}`;


axios.post(url, null, {
    headers: {'X-Mashape-Key': 'C1SMDyqFVsmshTdA0WE7yViOZQ9Ep1TT2z2jsnVM0FlK72AdtD',
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"}
}).then((data) => {
   data.data.forEach((quote) => {
       console.log("Quote by: " + quote.author);
       console.log("Quote: " + quote.quote);
   });
}).catch((err) => {
   console.log(err);
});


