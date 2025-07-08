
// function formatDate(date){
//   let formatedDate = new Date(date).toLocaleDateString();
//   return formatedDate;
// }

// function anotherFormat(date){
//   let formatedDate = new Date(date).toLocaleString();
//   return formatedDate;
// }

// // module.exports = formatDate; // single function export
// module.exports = {formatDate,anotherFormat}; // multiple function 
// // export

// this will also exports an object
module.exports.formatDate = function(date){
  let formatedDate = new Date(date).toLocaleDateString();
  return formatedDate;
}

module.exports.anotherFormat = function(date){
  let formatedDate = new Date(date).toLocaleString();
  return formatedDate;
}