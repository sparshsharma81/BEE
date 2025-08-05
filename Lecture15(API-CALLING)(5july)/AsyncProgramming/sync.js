function delay5sec(){
    let prevTime = new Date().getTime(); 
    //date object 1972 se lekar aaj tak ka time store karega
    // getTime() method se milliseconds me time milega 
    while(prevTime + 2000 !== new Date().getTime()){
        //ye loop tab tak chalega jab tak 5 second nahi ho jate
        //new Date().getTime() se current time milega
        //prevTime + 5000 se 5 second ka time add karega
    }
     
}

//this code is synchronous
delay5sec(); //ye function ko call karega
console.log("5 seconds delay completed"); //ye console me message print karega

//for asynchronous programming..we can use setTimeout

setTimeout(() => { 
    console.log("5 seconds delay completed");
}, 5000);
//settimeout ask for a function and a delay time 
