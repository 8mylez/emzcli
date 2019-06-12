const { Command, flags } = require("@oclif/command");
const Git = require("nodegit");
const del = require('del');
const { cli } = require('cli-ux');

class CreateIEPlugin extends Command {
  async run() {
    const { flags } = this.parse(CreateIEPlugin);

    if (flags.boilerplateMode) {

        const gitLabUserName = await cli.prompt('What is gitlab username?');
        const gitLabPassword = await cli.prompt('What is gitlab password?', {type: 'hide'});

        if(gitLabUserName && gitLabPassword) {
            let cloneOptions = {
                fetchOpts: {
                    callbacks: {
                        certificateCheck: function() { return 1; },
                        credentials: () => {
                            return Git.Cred.userpassPlaintextNew(gitLabUserName, gitLabPassword);
                        } 
                    }
                }
            };

            if(flags.boilerplateMode == 'import') {
                console.log('Start clone EmzImportBoilerplate');
                Git.Clone(
                    "https://gitlab.com/EmzPlugins/EmzImportBoilerplate.git",
                    "EmzImportBoilerplate",
                    cloneOptions
                ).then(function(repository) {
                    console.log('Cloned EmzImportBoilerplate');

                    del.sync(['./EmzImportBoilerplate/**/.git']);
                }).catch(function(err) { console.log(err); });
            }

            // if(flags.boilerplateMode == 'export') {
            //     Git.Clone(
            //         "git@gitlab.com:EmzPlugins/EmzExportBoilerplate.git",
            //         "EmzExportBoilerplate",
            //         cloneOptions
            //     ).then(function(repository) {        
            //         del.sync(['./EmzExportBoilerplate/**/.git']);
            //     });
            // }

            if(flags.boilerplateMode == 'importexport') {
                Git.Clone(
                    "https://gitlab.com/EmzPlugins/EmzImportExportBoilerplate.git",
                    "EmzImportExportBoilerplate",
                    cloneOptions
                ).then(function(repository) {        
                    del.sync(['./EmzImportExportBoilerplate/**/.git']);
                });
            }

            console.log('Done!');
        }
    }
  }
}

CreateIEPlugin.description = `Bootstraping for shopware 5.2 import export plugins.`;

CreateIEPlugin.flags = {
  boilerplateMode: flags.string({ char: "m", description: "mode of boilerplate, could be: import, export or importexport" })
};

module.exports = CreateIEPlugin;