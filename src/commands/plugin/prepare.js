const {Command, flags} = require('@oclif/command')
const del = require('del');
const copydir = require('copy-dir');
const zipper = require('zip-local');
const emzTmpFolder = './emz_tmp/';
const fs = require('fs');

class PreparePlugin extends Command {
    async run() {
        const { flags } = this.parse(PreparePlugin);

        console.log('flags', flags);

        if(flags.pluginName) {
            copydir.sync('./'+flags.pluginName, emzTmpFolder+flags.pluginName+'/');

            del.sync([emzTmpFolder+flags.pluginName+'/**/.DS_Store']);
            del.sync([emzTmpFolder+flags.pluginName+'/**/.git']);
            del.sync([emzTmpFolder+flags.pluginName+'/**/.gitignore']);
            del.sync([emzTmpFolder+flags.pluginName+'/**/.editorconfig']);
            del.sync([emzTmpFolder+flags.pluginName+'/**/.php_cs.dist']);
            this.log('Deleted unnecessary files');

            if(flags.legacy) {
                let bootstrapFile = fs.readFileSync(emzTmpFolder+flags.pluginName+'/Bootstrap.php', "utf8");
                let pluginType = '';
                let bootstrapMatches = bootstrapFile.match(new RegExp("class Shopware_Plugins_(Frontend|Backend)_(.+)_Bootstrap extends"));
                
                this.log("Read bootstrap file");

                if (bootstrapMatches && 
                    bootstrapMatches.length > 1 && 
                    (bootstrapMatches[1] == 'Frontend' || 
                        bootstrapMatches[1] == 'Backend')) 
                {
                    pluginType = bootstrapMatches[1];
                    this.log("Create new folder: " + pluginType);

                    copydir.sync(emzTmpFolder+flags.pluginName, emzTmpFolder+pluginType+'/'+flags.pluginName+'/');
                    del.sync([emzTmpFolder+flags.pluginName]);
                }          
            }
            
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
    legacy: flags.boolean({char: 'l', description: 'activates legacy mode'}),
}

module.exports = PreparePlugin