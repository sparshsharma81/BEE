let url = "https://dummyjson.com/products/1"; //ye url hai jahan se data fetch karna hai
//either we should make server or we should introduce cdn 

const d = document.getElementById("div"); //ye div ko select karega
const d2 = document.getElementById("div2"); 
const d3 = document.getElementById("div3"); //ye div3 ko select karega
const d4 = document.getElementById("div4"); //ye div4 ko select karega
const d5 = document.getElementById("div5"); //ye div5 ko select karega
//<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> 
//ye axios ka cdn hai jo hume axios library ko use karne deta hai
//iske andar axios library ka code hota hai jo hume axios library ko use karne deta hai

axios.get(url) //ye axios ka get method hai jo data ko fetch karega
    .then((response) => {
        console.log(response.data); //ye response ko console me print karega
        d.innerText = response.data.title; //ye div me title ko set karega
        d2.innerText = response.data.description; //ye div2 me description ko set karega
        d3.innerText = response.data.price; //ye div3 me price ko set karega
        d4.innerText = response.data.category; //ye div4 me category ko set kare
        d5.innerText = response.data.brand; //ye div5 me brand ko set karega
    })

    .catch((error) => {
        console.error("Error fetching data:", error); //ye error ko console me print karega
    });
    //this will return promise which will be resolved when the data is fetched 

    