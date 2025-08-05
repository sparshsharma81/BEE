let url = "https://dummyjson.com/products/1"; //ye url hai jahan se data fetch karna hai

fetch(url) //this fetch method will return a promise    
    .then((data)=>{
        return data.json(); //ye data ko JSON format me convert karega

    }).then(data=>{
        console.log(data); //ye data ko console me print karega
    }).catch(error=>{
        console.error("Error fetching data:", error); //ye error ko console me print karega
    });