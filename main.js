var require = function(path) {
  return module.exports;
};

var greetings = require("src/any2pdf.js");
greetings.sayHelloInEnglish();
console.log(greetings);