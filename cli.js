#! /usr/bin/env node
const oneColor = require('onecolor')
const chalk = require('chalk')
const fs = require('fs')

const map = JSON.parse(fs.readFileSync('./colorsMap.json'))

console.log(chalk.magenta(process.argv[2]) + ' name is ' + chalk.cyan(map[oneColor(process.argv[2]).hex()][1]))
