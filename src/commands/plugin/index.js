const {Command, flags} = require('@oclif/command');

class PluginCommand extends Command {
    async run() {
        this.log('PLUGIN!');
    }
}

PluginCommand.description = `Index Plugin`

module.exports = PluginCommand