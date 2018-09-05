# guld-keys-cli

[![source](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-keys-cli) [![issues](https://img.shields.io/badge/issues-bitbucket-yellow.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-keys-cli/issues) [![documentation](https://img.shields.io/badge/docs-guld.tech-green.svg)](https://guld.tech/cli/guld-keys-cli.html)

[![node package manager](https://img.shields.io/npm/v/guld-keys-cli.svg)](https://www.npmjs.com/package/guld-keys-cli) [![travis-ci](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-keys-cli.svg)](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-keys-cli?branch=guld) [![lgtm](https://img.shields.io/lgtm/grade/javascript/b/guld/tech-js-node_modules-guld-keys-cli.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/b/guld/tech-js-node_modules-guld-keys-cli/context:javascript) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-keys-cli/status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-keys-cli) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-keys-cli/dev-status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-keys-cli?type=dev)

Cryptographic key storage and usage.

### Install

##### Node

```sh
npm i -g guld-keys-cli
```

### Usage

##### CLI

```sh
guld-keys --help

  Usage: guld-keys [options] [command]

  Cryptographic key storage and usage.

  Options:

    -V, --version       output the version number
    -s, --secret        Perform action on secret keys.
    -a, --ascii         ASCII armor any output.
    -f, --file          The file to read as input.
    -o, --out           The file to write as output.
    -h, --help          output usage information

  Commands:

    init [fingerprint]  Intialize a PGP key with the guld network.
    list                List PGP keys as fingerprint UID pairs. ("*" for all)
    import              Import a PGP key.
    export              Export a PGP key.

```

### License

MIT Copyright isysd
