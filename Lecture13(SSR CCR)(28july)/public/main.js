// const { get } = require("../../Lecture11(todo-list)(22july)/Project/routes/todo.route");

const container = document.getElementById('container');

//this function will send the data to backend and will show a request 
async function getUser(){
    let res = await axios.get('http://localhost:3000/about'); // Sending a GET request to the '/about' endpoint 
    //axios ko bola hai ek get request bhejo iss path par...
    //for now..we are sending the request from the same server to the server ...
    container.innerHTML = `<p>Name: ${res.data.user.name}</p>
                           <p>Age: ${res.data.user.age}</p>
                           <p>Email: ${res.data.user.email}</p>`;


  const h1 = document.createElement("h1"); // Creating a new h1 element
  h1.innerText = `{${res.data.user.name}}`; // Setting the text content of the h1 element
  //this h1.innerText = ---- it will basically override all the content of the container 
  container.appendChild(h1); // Append the h1 element to the container
container.innerHTML += `<p>Welcome ${res.data.user.name}! you are just ${res.data.user.age}years old son! </p>`; // Adding a welcome message to the container
//if we want that it should be at the top then 
    container.prepend(h1); // Prepend the h1 element to the container
    //prepend is opposite of append 

}

getUser(); // it wil make sure that the function is called when the script is loaded 
