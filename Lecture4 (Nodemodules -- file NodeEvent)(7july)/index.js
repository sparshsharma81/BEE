// // when module is exporting function directly 
// const formatDate = require("./utils/date-converter")

// const date = formatDate("07-07-2025");
// console.log(date);

// // when module is exporting multiple function by object
// const date_converter = require("./utils/date-converter")

// const date = date_converter.formatDate("07-07-2025");
// console.log(date);

// // destructure
const {formatDate,anotherFormat} = require("./utils/date-converter")

const date = anotherFormat("07-07-2025");
console.log(date);