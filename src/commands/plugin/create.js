const { Command, flags } = require("@oclif/command");
const Git = require("nodegit");
const fs = require("fs");

class CreatePlugin extends Command {
  async run() {
    const { flags } = this.parse(CreatePlugin);

    if (flags.pluginName) {
      Git.Clone(
        "https://github.com/8mylez/EmzPluginBoilerplate",
        flags.pluginName
      ).then(function(repository) {
        const fileNameOriginal = "EmzPluginBoilerplate.php";
        const fileNameRenamed = flags.pluginName + ".php";
        const filePath = "./" + flags.pluginName + "/";

        fs.readFile(filePath + fileNameOriginal, "utf8", function(err, data) {
          if (err) return console.error(err);

          console.log("Read file: ", filePath + fileNameOriginal);

          let result = data.replace(/EmzPluginBoilerplate/g, flags.pluginName);

          fs.writeFile(filePath + fileNameRenamed, result, "utf8", function(
            err
          ) {
            if (err) return console.error(err);

            console.log("Replaced mainfile", filePath + fileNameOriginal);

            fs.unlink(filePath + fileNameOriginal, function(err) {
              if (err) return console.error(err);

              console.log("Cleanup", filePath + fileNameOriginal);
            });
          });
        });

        fs.readFile(filePath + "Resources/services.xml", "utf8", function(
          err,
          data
        ) {
          if (err) return console.error(err);

          console.log("Read file: ", filePath + "Resources/services.xml");

          const transformedName = flags.pluginName
            .split(/(?=[A-Z])/)
            .join("_")
            .toLowerCase();

          let result = data.replace(/EmzPluginBoilerplate/g, flags.pluginName);
          result = result.replace(/emz_plugin_boilerplate/g, transformedName);

          fs.writeFile(
            filePath + "Resources/services.xml",
            result,
            "utf8",
            function(err) {
              if (err) return console.error(err);

              console.log("Replaced services.xml", filePath + fileNameOriginal);
            }
          );
        });

        fs.readFile(filePath + "Subscriber/TemplateRegistration.php", 'utf8', function(
          err,
          data
        ) {
          if (err) return console.error(err);

          console.log(
            "Read file: ",
            filePath + "Subscriber/TemplateRegistration.php"
          );

          let result = data.replace(/EmzPluginBoilerplate/g, flags.pluginName);

          fs.writeFile(
            filePath + "Subscriber/TemplateRegistration.php",
            result,
            function(err) {
              if (err) return console.log(err);

              console.log(
                "Replaced TemplateRegistration.php",
                filePath + "Subscriber/TemplateRegistration.php"
              );
            }
          );
        });
      });
    }
  }
}

CreatePlugin.description = `Bootstraping for shopware 5.2 plugin.`;

CreatePlugin.flags = {
  pluginName: flags.string({ char: "p", description: "name of plugin" })
};

module.exports = CreatePlugin;
