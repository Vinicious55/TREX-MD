const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib00yUWs1aDk5NS9yRXpKL3F2U3FabFRkSmVUTkUwVmNCQlZvMlNscW5XQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEhwWVZXNXVPNFlCeFFLdzFGYm5MUHdyc0FkcDN0VzhXSHo5R1hUNjlGWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnTXBwSnNZQmJkR21wRHJQTUY0K3lrVTIxTmdQeWVpN1kyRUJtSlBRa1hRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtcDlpUzJzM25PL0ZDTjhRSnZmaVJXN1UxVEhCZVc3QVMrQzZQWXlkYlFFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBeUlveDFvYXlWR1BzNmQ1ZzV6OU8xb3pUS29LQnZvU2h0S0FoMUNkbG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlpUndFVzhpWkRmWU9rek5Gc3R4L0c5UG96ZDBQUGNSQ2ttZ1VGN2tSUlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUw0NTNYa0MzVlVoVHRNZHFlR1RGV2Y1M29RVFdtNU9NWGh6WEQ1SHJVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZE52TjgwSjZxTmpZZUdCUVkwRFg4RlRpbUVrZ0lxOVVWa0diQjFONURSOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndwM1RiV2JIY1E3SXhOZ3JWVnBmR1hrL2pHbG11Z3hPcUxhMnZzNjM2RTRia3czU3dEQ2YwWHRwRlFkdDJwQWc2Zmt1YUxXZUwvb0lZbmxSR3BEUEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMyLCJhZHZTZWNyZXRLZXkiOiIyQmR1M0l2bEJhTUsxLytad1VNMDJJV0E0ZnptNnVlbGtJaUFpT0JXTWM0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2dFpMSzZDM1NDeUpiVU04VjNRT0V3IiwicGhvbmVJZCI6IjA4OWVlOTBjLWNkOWMtNDA5Zi04MDFmLTliYWVmZmFkZTcyMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyak1rOWRRb3hpb2RET255QXlKMXg4cVRtYkk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU1xR3c2QmhGaEtuMUh3eDVwOFZOOTRyMjg4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlM4WkJIRVkyIiwibWUiOnsiaWQiOiIyNTY3MDM0NjcwNzU6NDFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0phRTd0NENFSlBpejdvR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxpTFVhaE9UODZaaHE5WFczVXlEVUY3M285aFE0RzlXRFZndHRMMUdSak09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkxkNEVCMTdBS2JFYzhIM0JYN1NlRXJIdXB6M1VtNXpJYzdKQnBZejl4ZmFNK2Q0NjVOOFNESnFpYlFVWlZHWTNuZGdwODJScE4vNGR5eFZwdTJuYkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJTYWptSjZ1Nkp1UytzSExHTTJTU0t6NU5qK1JUWDBmVlBOakRWMDA0ZlNKWUh3ZSs0Rm12K0ZtZVFQOEhRREJVNkRid2crYy9ZZlFYZVI5cjVUcmtEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NjcwMzQ2NzA3NTo0MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTNGkxR29Uay9PbVlhdlYxdDFNZzFCZTk2UFlVT0J2VmcxWUxiUzlSa1l6In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNTU0NDY0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Vinny",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "256703467075",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '𝗧𝗿𝗲𝘅 𝗠𝗱',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e883c3cc22b0ded5e380e.jpg,https://telegra.ph/file/eca1a1dffe21dba0bc7bc.jpg,https://telegra.ph/file/5d3631dccfd838f49a9a8.jpg,https://telegra.ph/file/23df275c8026b7a1f1746.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
