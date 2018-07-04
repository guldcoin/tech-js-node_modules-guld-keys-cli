# guld-keys-cli

Cryptographic key storage and usage.

### Install

```
npm i -g guld-keys-cli
```

### Usage


##### CLI

```
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
