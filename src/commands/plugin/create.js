const { Command, flags } = require("@oclif/command");
const Git = require("nodegit");
const fs = require("fs");
const del = require('del');

class CreatePlugin extends Command {
  async run() {
    const { flags } = this.parse(CreatePlugin);

    if (flags.pluginName) {
      if(flags.pluginName.includes('EmzPlatform')) {
        console.log('Building the plugin for Shopware 6');
        pluginForSix(flags);
      } else {
        console.log('Building the plugin for Shopware 5');
        pluginForFive(flags);
      }
    }
  }
}

CreatePlugin.description = `Bootstraping for shopware 5.2 plugin.`;

CreatePlugin.flags = {
  pluginName: flags.string({ char: "p", description: "name of plugin" })
};

module.exports = CreatePlugin;

function pluginForFive(flags) {
  Git.Clone(
    "https://github.com/8mylez/EmzPluginBoilerplate",
    flags.pluginName
  ).then(function(repository) {
    const fileNameOriginal = "EmzPluginBoilerplate.php";
    const fileNameRenamed = flags.pluginName + ".php";
    const filePath = "./" + flags.pluginName + "/";

    del.sync([filePath+'/**/.git']);

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

function pluginForSix(flags) {
  Git.Clone(
    "https://github.com/8mylez/EmzPlatformPluginBoilerplate",
    flags.pluginName
  ).then(function(repository) {
    const fileNameOriginal = "EmzPlatformPluginBoilerplate.php";
    const fileNameRenamed = flags.pluginName + ".php";
    const filePath = "./" + flags.pluginName + "/";
    const filePathSrc = filePath + "src/"

    del.sync([filePath+'/**/.git']);

    fs.readFile(filePathSrc + fileNameOriginal, "utf8", function(err, data) {
      if (err) return console.error(err);

      console.log("Read file: ", filePathSrc + fileNameOriginal);

      let result = data.replace(/EmzPlatformPluginBoilerplate/g, flags.pluginName);

      fs.writeFile(filePathSrc + fileNameRenamed, result, "utf8", function(
        err
      ) {
        if (err) return console.error(err);

        console.log("Replaced mainfile", filePathSrc + fileNameOriginal);

        fs.unlink(filePathSrc + fileNameOriginal, function(err) {
          if (err) return console.error(err);

          console.log("Cleanup", filePathSrc + fileNameOriginal);
        });
      });
    });

    fs.readFile(filePathSrc + "Resources/config/services.xml", "utf8", function(
      err,
      data
    ) {
      if (err) return console.error(err);

      console.log("Read file: ", filePathSrc + "Resources/config/services.xml");

      let result = data.replace(/EmzPlatformPluginBoilerplate/g, flags.pluginName);

      fs.writeFile(
        filePathSrc + "Resources/config/services.xml",
        result,
        "utf8",
        function(err) {
          if (err) return console.error(err);

          console.log("Replaced services.xml", filePathSrc + fileNameOriginal);
        }
      );
    });

    fs.readFile(filePathSrc + "Storefront/Pagelet/Header/Subscriber/HeaderPageletLoadedSubscriber.php", "utf8", function(
        err,
        data
      ) {
        if (err) return console.error(err);

        console.log("Read file: ", filePathSrc + "Storefront/Pagelet/Header/Subscriber/HeaderPageletLoadedSubscriber.php");

        let result = data.replace(/EmzPlatformPluginBoilerplate/g, flags.pluginName);

        fs.writeFile(
          filePathSrc + "Storefront/Pagelet/Header/Subscriber/HeaderPageletLoadedSubscriber.php",
          result,
          "utf8",
          function(err) {
            if (err) return console.error(err);

            console.log("Replaced HeaderPageletLoadedSubscriber.php", filePathSrc + fileNameOriginal);
          }
        );
      });

      fs.readFile(filePath + "composer.json", "utf8", function(
        err,
        data
      ) {
        if (err) return console.error(err);

        console.log("Read file: ", filePath + "composer.json");

        let kebapCasePluginName = flags.pluginName.replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/\s+/g, '-')
          .toLowerCase();

        let result = data.replace(/emz-platform-plugin-boilerplate/g, kebapCasePluginName);
        result = result.replace(/EmzPlatformPluginBoilerplate/g, flags.pluginName);

        fs.writeFile(
          filePath + "composer.json",
          result,
          "utf8",
          function(err) {
            if (err) return console.error(err);

            console.log("Replaced composer.json", filePath + fileNameOriginal);
          }
        );
      });
  });

}