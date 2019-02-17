const { Command, flags } = require("@oclif/command");
const Git = require("nodegit");
const fs = require("fs");

class CreateLDE extends Command {
  async run() {
    const { flags } = this.parse(CreateLDE);

    if (flags.projectName) {

        const shopName = "shop_" + flags.projectName.split('.').join("");
        const databaseName = flags.projectName.split('.').join("");

      Git.Clone(
        "https://github.com/8mylez/local-development-environment",
        flags.projectName
      ).then(function(repository) {
        const filePath = "./" + flags.projectName + "/";

        fs.readFile(filePath + 'docker/docker-compose.yml', "utf8", function(err, data) {
          if (err) return console.error(err);

          console.log("Read file: ", filePath + 'docker/docker-compose.yml');

          let result = data.replace(/shop_8mylez-demo-shop/g, shopName);
          result = result.replace(/8mylezdemoshop/g, databaseName);

          fs.writeFile(filePath + 'docker/docker-compose.yml', result, "utf8", function(
            err
          ) {
            if (err) return console.error(err);

            console.log("Replaced docker-compose.yml");
          });
        });

        fs.readFile(filePath + "docker/bash-shop.sh", "utf8", function(
          err,
          data
        ) {
          if (err) return console.error(err);

          console.log("Read docker/bash-shop.sh");

          let result = data.replace(/shop_8mylez-demo-shop/g, shopName);

          fs.writeFile(
            filePath + "docker/bash-shop.sh",
            result,
            "utf8",
            function(err) {
              if (err) return console.error(err);

              console.log("Replaced docker/bash-shop.sh");
            }
          );
        });

        fs.readFile(filePath + "docker/init.sh", "utf8", function(
            err,
            data
          ) {
            if (err) return console.error(err);
  
            console.log("Read docker/init.sh");
  
            let result = data.replace(/shop_8mylez-demo-shop/g, shopName);
  
            fs.writeFile(
              filePath + "docker/init.sh",
              result,
              "utf8",
              function(err) {
                if (err) return console.error(err);
  
                console.log("Replaced docker/init.sh");
              }
            );
          });
      });
    }
  }
}

CreateLDE.description = `Creates local development environment!`;

CreateLDE.flags = {
  projectName: flags.string({ char: "n", description: "Name of domain" })
};

module.exports = CreateLDE;
