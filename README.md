# Glassy

> A simple html project templator

`npm install -g glassy`

## Quick Start

** A CLI `new <projectname>` will be coming soon **

 - create a glassfile

```` js
module.exports = {
  paths = {
      javascript : [/* globs */] // passed to template as javascript,
      css : [/* globs */] //passed to template as css
  },
  relative : strings, // passed to template as relative
  templatePath : string, // jade file to use
  output : string, // path to output to
}
````

`glassy` your project
