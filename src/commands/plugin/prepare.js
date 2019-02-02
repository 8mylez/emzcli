const {Command, flags} = require('@oclif/command')
const del = require('del');
const copydir = require('copy-dir');
const zipper = require('zip-local');
const emzTmpFolder = './emz_tmp/';

class PreparePlugin extends Command {
    async run() {
        const { flags } = this.parse(PreparePlugin);

        if(flags.pluginName) {
            copydir.sync('./'+flags.pluginName, emzTmpFolder+flags.pluginName+'/');

            del.sync([emzTmpFolder+flags.pluginName+'/**/.DS_Store']);
            del.sync([emzTmpFolder+flags.pluginName+'/**/.git']);
            del.sync([emzTmpFolder+flags.pluginName+'/**/.gitignore']);
            del.sync([emzTmpFolder+flags.pluginName+'/**/.editorconfig']);
            del.sync([emzTmpFolder+flags.pluginName+'/**/.php_cs.dist']);
            this.log('Deleted unnecessary files');
            
            zipper.sync.zip(emzTmpFolder).compress().save(flags.pluginName+'.zip');
            del.sync([emzTmpFolder]);
            console.log('zipped '+flags.pluginName+'.zip');
        }

        this.log('Plugin ready for upload!');
    }
}

PreparePlugin.description = `Prepares the plugin for upload in the shopware backend.`

PreparePlugin.flags = {
    pluginName: flags.string({char: 'p', description: 'name of plugin'}),
}

module.exports = PreparePlugin