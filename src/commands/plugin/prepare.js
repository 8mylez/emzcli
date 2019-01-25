const {Command, flags} = require('@oclif/command')
const del = require('del');
const zipFolder = require('folder-zip-sync');

class PreparePlugin extends Command {
    async run() {
        const { flags } = this.parse(PreparePlugin);

        if(flags.pluginName) {
            del.sync(['./'+flags.pluginName+'/**/.DS_Store']);
            del.sync(['./'+flags.pluginName+'/**/.git']);
            del.sync(['./'+flags.pluginName+'/**/.gitignore']);
            del.sync(['./'+flags.pluginName+'/**/.editorconfig']);
            del.sync(['./'+flags.pluginName+'/**/.php_cs.dist']);
            this.log('Deleted unnecessary files');
            
            zipFolder('./'+flags.pluginName, flags.pluginName+'.zip');
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