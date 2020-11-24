/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("FUCK YOU");
'use strict';

const fs = require('fs');
const fetch = require("node-fetch");


process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function stripProperty(obj, prop) {
  console.log("WTF WTF ORIG: "+JSON.stringify(obj));
  const objNew = {}; 
  Object.keys(obj).forEach(key => {
    console.log("WTF WTF WTF: "+key + "=" + prop);
    if (key !== prop) {
        objNew[key] = obj[key];
    }
  });
  return objNew;
}

async function getCountryName(code) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
    try {
        let res = await fetch('https://jsonmock.hackerrank.com/api/countries?page=1');
        let resJson = await res.json();
        let resData = resJson.data;
        for (let pageNo = 2; pageNo < resJson.total_pages; pageNo++) {
            for (let dataNo = 0; dataNo < resData.length; dataNo++) {
                console.log("WTF WTF WTF CHECK: "+JSON.stringify(resData[dataNo])+"/"+code);
                if (resData[dataNo].alpha2Code === code) {
                    return resData[dataNo].name;
                }
            }
            res = await fetch('https://jsonmock.hackerrank.com/api/countries?page='+pageNo);
            resJson = await res.json();
            resData = resJson.data;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}

async function main() {
  console.log("WTF: "+process.stdout);
  
// const ws = fs.createWriteStream(process.stdout);

//  const n = parseInt(readLine().trim(), 10);

  const obj = {};

  n = 6;
  for (let i = 0; i < 5; i+=2) {
      const params = ["foo", "2", "bar", "3", "baz", "3"];
//    const params = readLine().trim().split(' ');
    const k = params[i];
    const v = parseInt(params[i+1], 10);
    obj[k] = v;
  }

//  const prop = readLine().trim();
const prop = "foo";

  const result = stripProperty(obj, prop);

  console.log(JSON.stringify(result));
  Object.keys(result).sort().forEach(k => {
      console.log(`${k} ${result[k]}\n`);
//    ws.write(`${k} ${result[k]}\n`);
  });
//  ws.end();

    const name = await getCountryName("CO");
    console.log("WTF WTF WTF: "+name);
    return name;
}

main().then(name => { console.log('FINISHED: '+name); process.exit(); });
