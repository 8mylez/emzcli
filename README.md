emzcli
======

Commandline interface to do some 8mylez shopware stuff

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/emzcli.svg)](https://npmjs.org/package/emzcli)
[![Downloads/week](https://img.shields.io/npm/dw/emzcli.svg)](https://npmjs.org/package/emzcli)
[![License](https://img.shields.io/npm/l/emzcli.svg)](https://github.com/8mylez/emzcli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g emzcli
$ emz COMMAND
running command...
$ emz (-v|--version|version)
emzcli/1.3.0 darwin-x64 node-v10.15.3
$ emz --help [COMMAND]
USAGE
  $ emz COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`emz help [COMMAND]`](#emz-help-command)
* [`emz ieplugin:create`](#emz-ieplugincreate)
* [`emz lde:create`](#emz-ldecreate)
* [`emz plugin:create`](#emz-plugincreate)
* [`emz plugin:prepare`](#emz-pluginprepare)

## `emz help [COMMAND]`

display help for emz

```
USAGE
  $ emz help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `emz ieplugin:create`

Bootstraping for shopware 5.2 import export plugins.

```
USAGE
  $ emz ieplugin:create

OPTIONS
  -m, --boilerplateMode=boilerplateMode  mode of boilerplate, could be: import, export or importexport
```

_See code: [src/commands/ieplugin/create.js](https://github.com/8mylez/emzcli/blob/v1.3.0/src/commands/ieplugin/create.js)_

## `emz lde:create`

Creates local development environment!

```
USAGE
  $ emz lde:create

OPTIONS
  -n, --projectName=projectName  Name of domain
```

_See code: [src/commands/lde/create.js](https://github.com/8mylez/emzcli/blob/v1.3.0/src/commands/lde/create.js)_

## `emz plugin:create`

Bootstraping for shopware 5.2 plugin.

```
USAGE
  $ emz plugin:create

OPTIONS
  -p, --pluginName=pluginName  name of plugin
```

_See code: [src/commands/plugin/create.js](https://github.com/8mylez/emzcli/blob/v1.3.0/src/commands/plugin/create.js)_

## `emz plugin:prepare`

Prepares the plugin for upload in the shopware backend.

```
USAGE
  $ emz plugin:prepare

OPTIONS
  -l, --legacy                 activates legacy mode
  -p, --pluginName=pluginName  name of plugin
```

_See code: [src/commands/plugin/prepare.js](https://github.com/8mylez/emzcli/blob/v1.3.0/src/commands/plugin/prepare.js)_
<!-- commandsstop -->
