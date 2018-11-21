const sqlite3 = require('sqlite3').verbose()

class WormDbMgr {
    constructor(){
        this.db = new sqlite3.Database('./glow-worm-data.db')
    }

    addCrawl(domain, username, usesViewTool, company){
        this.db.run(`INSERT INTO crawls(domain, username, usesViewTool, company) VALUES(?, ?, ?, ?)`, [
            domain, username, usesViewTool, company
        ], (err) => {
            if(err){
                console.log('error!', err);               
            }
        });
    }
}

module.exports = WormDbMgr