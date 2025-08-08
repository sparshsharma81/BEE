const form = document.querySelector('#task-form'); //ye form ko liya hai jisme hamne todo likha hai
const filterButtons= document.querySelector('#filter');

console.log(form); //ye console me form ko print karega

form.addEventListener('submit',async (e)=>{
    e.preventDefault(); //ye preventDefault se hamne default action ko roka hai

    const input = form.children; // ye form ka children return karega
    //ye basically list of all the elements return karega




    const task = input[0].value; //ye input se hamne task ko liya hai
//jo hamne input me likha hai vo task me store ho jayega


    if(!task) return; //agar task nahi hai to return karega

    const res = await axios.post('http://localhost:3000/todo/create', { task }); //ye axios se post request bhej raha hai

    
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