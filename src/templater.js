var jade = require('jade');

function template(templatePath) {
  return jade.compileFile(templatePath, {pretty: true});
}

function templateFromString(templateString) {
  return jade.compile(templateString, {pretty: true});
}

module.exports = {
  template: template,
  tempalteFromStrings: templateFromString
};
