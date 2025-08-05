setTimeout(function(){
    console.log("5 seconds delay completed");
}, 5000);

setTimeout(() => {
    console.log("5 seconds delay completed");
}, 5000);

console.log("Hello world");


//here we used multithreading ..this is the way of doing multithreading in javascript..
//this is known as event loop

//callback queue me data aayega 



//setInterval will run the function every 2 seconds
//basically the function wil lrun after every interval 
let timerId = setInterval(() => {
    console.log("This will run every 2 seconds");
}, 2000);

//setInterval will count as one task 
//increase the thread count by one
setTimeout(() => {
    clearInterval(timerId); //this will stop the interval after 10 seconds
    console.log("Interval stopped");
}, 11000);


//ajex asynchronus javascript and xml 
//this is used to make api calls
//