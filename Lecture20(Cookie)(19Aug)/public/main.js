const form = document.querySelector('#task-form'); //ye form ko liya hai jisme hamne todo likha hai
const filterButtons = document.querySelector('#filter');
const todoContainer = document.getElementById("todo-container");


getAllTodos(); // when the script will load... it will run ....

console.log(form); //ye console me form ko print karega

form.addEventListener('submit', async (e) => {
    e.preventDefault(); //ye preventDefault se hamne default action ko roka hai

    const input = form.children; // ye form ka children return karega
    //ye basically list of all the elements return karega




    const task = input[0].value; //ye input se hamne task ko liya hai
    //jo hamne input me likha hai vo task me store ho jayega


    if (!task) return; //agar task nahi hai to return karega

    const res = await axios.post('https://opulent-palm-tree-ww9wvv69xprf9q4p-3000.app.github.dev//todo/create', { task }); //ye axios se post request bhej raha hai

    input.value = ""; //input will get empty afer todo is created 
    //.reset() method also does this same task 

    getAllTodos();


    //e -- event reference --- stores all information like event origin , time etc
    //e.target --- it stores the element that triggered the event -- basically the origin of the event

    // e.target  ---ye basically vo button hai jisme hamne click kiya hai
    //// dataset.filter ---ye data filter se hamne filter ko liya hai
    //e.target --- ye basically hame bataye hamne kis button pr click kiya hai

    // const button = e.target.id; //ye target se hamne button ko liya hai 
    //ye batayega konsa button pr click hua hai 

    // console.log(button); //ye console me button ko print karega
    // const filter = e.target.dataset.filter; //ye data filter se hamne filter ko liya hai
    // const todos = document.querySelectorAll('.todo'); //ye sabhi todos ko liya hai
    // todos.forEach(todo => {
    //     if (filter === 'all' || todo.classList.contains(filter)) {
    //         todo.style.display = 'block'; //ye display ko block kar diya hai
    //     } else {
    //         todo.style.display = 'none'; //ye display ko none kar diya hai
    //     }
    // });

    // if(!button)return;
    // if(button == "all"){
    //     e.target.className = "active"; //ye active class ko add karega
    // }
    // if(button == "active"){
    //     e.target.className = "active"; //ye active class ko add karega  
    // }   
    // if(button == "completed"){
    //     e.target.className   = "active";
    // }

})

// const filterbtn = filterButtons.children;
// for(let btn of filterbtn){
//     if(btn.id!=button){
//         btn.className = ""; //ye active class ko remove karega

//     }
// }

async function filterTodos(filterName){
    let res = await axios.get("https://opulent-palm-tree-ww9wvv69xprf9q4p-3000.app.github.dev/todo/all");
}

async function getAllTodos() {
    let res = await axios.get("https://opulent-palm-tree-ww9wvv69xprf9q4p-3000.app.github.dev/todo/all");

    let todos = res.data.todos;
    renderTodos(todos);
}

function renderTodos(todos) {
    todoContainer.innerHTML = "";
    for (let todo of todos) {
        const div = document.createElement("div");
        div.className = "todo";
        div.innerHTML = `<h4> ${todo.task}</h4> <div id = "${todo._id}">
            <button class= "status">${todo.status ? "Undo" : "Complete"}</button>
            <button class = "delete">delete </button>
            </div>
            `;

        todoContainer.prepend(div);

    }
}
//in javascript we can not select the dynamic element using selectors --- as the dynamic elements are created
//afterwords and selectors run first...so we can not select them
//so we have to use event delegation
//event delegation is a technique where we attach the event listener to a parent element
//and then we can capture the events from the child elements
//this way we can handle the events for dynamic elements as well
todoContainer.addEventListener('click', async (e) => {
    const btnClass = e.target.className;

    //if btnclass is not delete or status return from the funcion 
    const todoId = e.target.parentElement.id; //ye parent element se id ko liya hai
    if (btnClass != "delete" && btnClass != "status") return;

    if (btnClass == "delete") {
        await axios.delete(`https://opulent-palm-tree-ww9wvv69xprf9q4p-3000.app.github.dev/todo/delete/${todoId}`);
    } 
    if (btnClass == "status") {
        await axios.put(`https://opulent-palm-tree-ww9wvv69xprf9q4p-3000.app.github.dev/todo/update/${todoId}`)
    }
    getAllTodos();
});
