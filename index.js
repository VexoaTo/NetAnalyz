const puppeteer = require('puppeteer');
const request = require('request-promise-native');
const poll = require('promise-poller').default;
const fs = require('fs');
const numeral = require('numeral');
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');
const chalk = require('chalk');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var center = require('center-align');
var colors = require("colors");
var setTitle = require('console-title');

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

const chromeOptions = {
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless: false,
    slowMo: 10,
    defaultViewport: null
}

function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
  }

// cooldowns.set("send3", Date.now() + 900000);

async function startBot() {
    var o = '>>>>>>>>>>>>>>>>>>>>>>>>>>';
    var i = '<<<<<<<<<<<<<<<<<<<<<<<<<<';
    const browser = await puppeteer.launch(chromeOptions)
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    await page.on('request', interceptedRequest => {
        if(!interceptedRequest.method()) return;
        if(interceptedRequest.url().includes("https://") || interceptedRequest.url().includes("http://") && interceptedRequest.method() == "POST" && interceptedRequest.postData() !== null && interceptedRequest.postData() !== undefined){
            if(interceptedRequest.postData() == undefined) {
                interceptedRequest.continue()
                return;
            }
             console.log(chalk.green(o))
            const postdata = decodeURIComponent(interceptedRequest.postData())
            console.log('URL: ' + interceptedRequest.url())
            console.log('Headers:\n' + JSON.stringify(interceptedRequest.headers(), null, '\t'))
            console.log('Post Data:\n' + postdata)
            console.log(chalk.green(i))
            console.log("\n")
        }
        interceptedRequest.continue();
    })

}

//- ## Console Functions ## - \\
console.clear()

setTitle("Nai v1");
console.log(" ");
console.log(" ");
console.log(center(`

███▄    █  ▄▄▄       ██▓    ▄▄▄▄ ▓██   ██▓     ██████ ▓█████  ▄████▄   █    ██  ██▀███  ▓█████ 
██ ▀█   █ ▒████▄    ▓██▒   ▓█████▄▒██  ██▒   ▒██    ▒ ▓█   ▀ ▒██▀ ▀█   ██  ▓██▒▓██ ▒ ██▒▓█   ▀ 
▓██  ▀█ ██▒▒██  ▀█▄  ▒██▒   ▒██▒ ▄██▒██ ██░   ░ ▓██▄   ▒███   ▒▓█    ▄ ▓██  ▒██░▓██ ░▄█ ▒▒███   
▓██▒  ▐▌██▒░██▄▄▄▄██ ░██░   ▒██░█▀  ░ ▐██▓░     ▒   ██▒▒▓█  ▄ ▒▓▓▄ ▄██▒▓▓█  ░██░▒██▀▀█▄  ▒▓█  ▄ 
▒██░   ▓██░ ▓█   ▓██▒░██░   ░▓█  ▀█▓░ ██▒▓░   ▒██████▒▒░▒████▒▒ ▓███▀ ░▒▒█████▓ ░██▓ ▒██▒░▒████▒
░ ▒░   ▒ ▒  ▒▒   ▓▒█░░▓     ░▒▓███▀▒ ██▒▒▒    ▒ ▒▓▒ ▒ ░░░ ▒░ ░░ ░▒ ▒  ░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░░░ ▒░ ░
░ ░░   ░ ▒░  ▒   ▒▒ ░ ▒ ░   ▒░▒   ░▓██ ░▒░    ░ ░▒  ░ ░ ░ ░  ░  ░  ▒   ░░▒░ ░ ░   ░▒ ░ ▒░ ░ ░  ░
  ░   ░ ░   ░   ▒    ▒ ░    ░    ░▒ ▒ ░░     ░  ░  ░     ░   ░         ░░░ ░ ░   ░░   ░    ░   
        ░       ░  ░ ░      ░     ░ ░              ░     ░  ░░ ░         ░        ░        ░  ░
                                 ░░ ░                        ░                                 
`.blue, 120));
console.log(center(`GO TO URLS TO GET THE DATA!?!`.yellow, 125))

startBot()
