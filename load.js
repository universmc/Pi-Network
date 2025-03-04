const fs = require('fs');
const path = require('path');

function loadConfig(
) {
  return new Promise((resolve, reject) => {
    const configPath = path.join(process.resourcesPath, 'config.json');

    fs.readFile(configPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const config = JSON.parse(data);
        resolve(config);
      } catch (error) {
        reject(error);
      }
    });
  });
}

module.exports = {
  loadConfig
};
