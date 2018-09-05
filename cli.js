#!/usr/bin/env node
const { getAddress } = require('guld-mail')
const { getName } = require('guld-user')
const { generate, listKeys, listSecretKeys, getPublicKey, getSecretKey } = require('keyring-gpg')
const { setupConfig, getConfig } = require('guld-git-config')
const { setSecureDefaults, setDefaultKey } = require('gpg-conf')
const program = require('commander')
const thispkg = require(`${__dirname}/package.json`)
const inquirer = require('inquirer')
const runCLI = require('guld-cli-run')
var guldname
var guldmail

/* eslint-disable no-console */
program
  .name(thispkg.name.replace('-cli', ''))
  .version(thispkg.version)
  .description(thispkg.description)
  .option('-s, --secret', 'Perform action on secret keys.')
  // .option('-u, --user', 'Use a specific key for the operation.')
  .option('-a, --ascii', 'ASCII armor any output.')
  .option('-f, --file', 'The file to read as input.')
  .option('-o, --out', 'The file to write as output.')
program
  .command('init [fingerprint]')
  .description('Intialize a PGP key with the guld network.')
program
  .command('list')
  .description('List PGP keys as fingerprint UID pairs. ("*" for all)')
program
  .command('import')
  .description('Import a PGP key.')
program
  .command('export')
  .description('Export a PGP key.')

async function inquireSecKey (fpr) {
  guldname = guldname || await getName()
  guldmail = guldmail || await getAddress()
  try {
    var seckeys = await listSecretKeys()
    var fprs = Object.keys(seckeys)
    var i = fprs.indexOf(fpr)
    var choices = fprs.map(f => `${f} ${seckeys[f]}`)
    inquirer
      .prompt([
        {
          name: 'signingkey',
          type: 'list',
          message: 'Which of these is your PGP key id?',
          choices: choices,
          default: i
        }
      ])
      .then(async answers => {
        fpr = answers.signingkey.split(' ')[0]
        await setupConfig({
          user: {signingkey: fpr},
          commit: {gpgsign: true}
        }, guldname)
        await setDefaultKey(fpr)
        await setSecureDefaults()
      })
  } catch (e) {
    fpr = generate({
      userIds: [{
        name: guldname,
        email: guldmail
      }]
    })
    await setupConfig({
      user: {signingkey: fpr},
      commit: {gpgsign: true}
    }, guldname)
    await setDefaultKey(fpr)
    await setSecureDefaults()
  }
}

function joinPrint (line) {
  console.log(Object.keys(line).map(l => `${l} ${line[l]}`).join('\n'))
}

async function exportKey () {
  guldname = guldname || await getName()
  guldmail = guldmail || await getAddress()
  var cfg = await getConfig('merged', guldname)
  if (program.secret) getSecretKey(cfg.user.signingkey).then(console.log)
  else getPublicKey(cfg.user.signingkey).then(console.log)
}

var cmd = program.args && program.args.length > 0 ? program.args[0] : undefined
/* eslint-disable no-console */
function runner () {
  switch (cmd) {
    case 'init':
      if (program.args.length > 1) inquireSecKey(program.args[1])
      else {
        getConfig().then(cfg => {
          if (cfg && cfg.user && cfg.user.signingkey) inquireSecKey(cfg.user.signingkey)
          else {
            inquireSecKey()
          }
        })
      }
      break
    case 'export':
      if (program.args.length > 1) {
        if (program.secret) getSecretKey(program.args[1]).then(console.log)
        else getPublicKey(program.args[1]).then(console.log)
      } else {
        exportKey()
      }
      break
    case 'list':
    default:
      if (program.args[1] === '*') {
        if (program.secret) listSecretKeys().then(joinPrint)
        else listKeys().then(joinPrint)
      } else if (program.args.length > 1) {
        listKeys(program.args[1]).then(joinPrint)
      } else {
        getName().then(async guldname => {
          var conf = await getConfig('merged', guldname)
          if (program.secret) listSecretKeys(conf.user.signingkey).then(joinPrint)
          else listKeys(conf.user.signingkey).then(joinPrint)
        })
      }
      break
  }
}
/* eslint-enable no-console */
runCLI.bind(program)(program.help, runner)
module.exports = program
