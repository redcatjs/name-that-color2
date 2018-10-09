#! /usr/bin/env node
const oneColor = require('onecolor')
const chalk = require('chalk')
const ntc = require('./ntc')

let color = oneColor(process.argv[2]).hex()
let [ hexStart, name, exact ] = ntc.name(color)

color = color.slice(1)
hexStart = hexStart.slice(1)

function colName(n) {
  var ordA = 'a'.charCodeAt(0)
  var ordZ = 'z'.charCodeAt(0)
  var len = ordZ - ordA + 1

  var s = "";
  while(n >= 0) {
    s = String.fromCharCode(n % len + ordA) + s
    n = Math.floor(n / len) - 1
  }
  return s
}

function toSnakeCase(name){
  name = name.replace(/\'/g, '')
  name = name.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '-' + b.toLowerCase())
    .replace(/[^A-Za-z0-9]+|_+/g, '-')
    .toLowerCase()
  return name
}

name = toSnakeCase(name)

if(!exact){
  let cursorUp = parseInt(hexStart,16)
  let cursorDown = parseInt(hexStart,16)
  let cursor = 0
  while(true){
    cursor++
    if(cursor%2 == 0){
      cursorUp++
      if(cursorUp.toString(16).padStart(6, '0')===color)
        break
    }
    else{
      cursorDown--
      if(cursorDown.toString(16).padStart(6, '0')===color)
        break
    }
  }
  name += '-'+(colName(cursor).padStart(4, 'a'))
}

console.log(chalk.magenta(process.argv[2]) + ' name is ' + chalk.cyan(name))
