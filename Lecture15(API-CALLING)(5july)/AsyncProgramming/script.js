//setting up the request 
const a = document.getElementById("div"); //ye div ko select karega

let xhr = new XMLHttpRequest(); //ye request ko create karega
//this method is known as asynchronous javascript and xml 
//this is asynchrounous because it takes time to get the response from the server

// let url = "https://jsonplaceholder.typicode.com/posts"; //ye url hai jahan se data fetch karna hai
let url = "https://dummyjson.com/products/1"; //ye url hai jahan se data fetch karna hai

xhr.open("GET", url, true); //ye request ko open karega
//open method takes three parameters - method, url, and async (true for asynchronous)
//.open will tell the type of request and the url to which the request is sent

// xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         let response = JSON.parse(xhr.responseText);
//         console.log(response);
//     }
// };

// xhr.send(); //ye request ko bhej dega

xhr.onload = function(){
    console.log(this.responseText); //ye response ko console me print karega
    let response = JSON.parse(this.responseText); //ye response ko JSON format me convert karega
    a.innerText = response.title; //ye anchor tag me title ko set karega

    // document.querySelector("h1").textContent = response.title;

}
xhr.onerror = function(){
    console.error("Request failed"); //ye error ko console me print karega
}

xhr.send(); //ye request ko send karega 
