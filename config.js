require('dotenv').config();

const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const CONFIG_TEMPLATE_FILE = path.resolve(__dirname, 'config.template.xml');

async function main() {
  loadCordovaConfigXml()
    .then(interpolateConfigXml)
    .then(writeCordovaConfigXml);
}

async function loadCordovaConfigXml() {
  return readFile(CONFIG_TEMPLATE_FILE)
    .then(buf => buf.toString())
    .catch(error => Promise.reject(error));
}

/**
 * @param {string} xmlStr
 */
function interpolateConfigXml(xmlStr) {
  let outXmlStr = xmlStr;

  for (envVarStr of xmlStr.match(/\{{2}\s*[A-Z_]+\s*\}\}/g)) {
    const envKey = envVarStr.match(/\s*([A-Z_]+)\s*/)[1];
    if (process.env[envKey]) outXmlStr = outXmlStr.replace(envVarStr, process.env[envKey]);
  }

  return Promise.resolve(outXmlStr);
}

function writeCordovaConfigXml(xmlStr) {
  writeFile(path.resolve(__dirname, 'config.xml'), xmlStr);
}

main().catch(console.error);
