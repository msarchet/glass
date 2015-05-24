var jade = require('jade');

function template(templatePath) {
  return jade.compileFile(templatePath, {pretty : true});        
}

module.exports = {
  template : template
}
