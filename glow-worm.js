const puppeteer = require('puppeteer');
const fs = require('fs');
let WormDbMgr = require('./worm-dbMgr.js');
let db = new WormDbMgr();

async function checkTech(arr){
    const browser = await puppeteer.launch({headless: false});
    let outArr = [];

    for (var i = 0; i < arr.length; i++) {
        const page = await browser.newPage();
        console.log('Scanning ' + arr[i][1])
        await page.goto(arr[i][1], {timeout: 65000}).catch(err => {
        //   console.log(err);
          console.log(arr[i])
          return false;
        });
       
        const toolSearch = await page.evaluate(() => { 
            const toolsObj = [
                {  
                    "var": window.wsHost,
                    "name": "webspectator"
                },{          
                    "var": window.ONFOCUS,
                    "name": "adagio/onfocus"
                },{
                    "var": window.MoatSuperV26,
                    "name": "moat"
                },{
                    "var": window._sf_async_config,
                    "name": "chartbeat"
                }
            ]
            let isTool = false
            for (var j = 0; j < toolsObj.length; j++){
                if(toolsObj[j].var){
                    isTool = true
                    return isTool
                } else {
                    isTool = isTool
                }
            }
            return isTool
        }).catch(err => {
            return false
        });

        const toolName = await page.evaluate(() => { 
            const toolsObj = [
                {  
                    "var": window.wsHost,
                    "name": "webspectator"
                },{          
                    "var": window.ONFOCUS,
                    "name": "adagio/onfocus"
                },{
                    "var": window.MoatSuperV26,
                    "name": "moat"
                },{
                    "var": window._sf_endpt,
                    "name": "chartbeat"
                }
            ]
            let toolNameIs = ''
            for (var j = 0; j < toolsObj.length; j++){
                if(toolsObj[j].var){
                    toolNameIs += (toolsObj[j].name + ' ')
                } else {
                    toolNameIs += ''                   
                }                 
            }
            return toolNameIs
        }).catch(err => {
            return false
        });

        outArr.push({
            url: arr[i][1],
            usesViewTool: toolSearch,
            company: toolName
        });
        await db.addCrawl(toolName, arr[i][0], toolSearch, arr[i][1])
        page.close();
    }
    await browser.close();
    return outArr;
    
}

async function crawlSites(inFile) {
    const x = [];
    fs.readFile(inFile, function(err, data) {
      var x = data.toString().split('\n');
      for (var i = 0; i < x.length; i++) {
        if (x[i] !== '') {
          y = x[i].split('\t');
          x[i] = y;
        } else
          x.splice(i, 1);
        }
  
        checkTech(x).then(outArr => {
            require('fs').writeFile('./wormed.json', JSON.stringify(outArr), function(err){
                if(err){
                    console.log('not today satan')
                }
            });
        });
    });
  }

// crawlSites("./test-worm.txt");
crawlSites("./cave-dive.txt");