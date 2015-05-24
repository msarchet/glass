# Glassy

> A simple html project templator

`npm install -g glassy`

## What is it

Glassy is intended to be for all those times you just want to put some html/css/js on a page to test an idea.

Simply `npm install`, `bower install`, or whatever your javascript. 

Write a glass file pointing at the things you want.

Then `glassy`

## Quick Start

**A CLI `new <projectname>` will be coming soon**

 - create a glassfile

``` js
module.exports = {
  paths = {
      javascript : [/* globs */] // passed to template as javascript,
      css : [/* globs */] //passed to template as css
  },
  relative : strings, // passed to template as relative
  template : string, // jade file to use
  output : string, // path to output to
}
```

`glassy` your project

## Roadmap

- Allow more preprocessors
- Make a gulp plugin
- Add a project initializer
