let main_body = document.getElementById("main-body");


//Display All Users
async function displayAllUsers(){
    let response = await fetch('http://localhost:3000/users/');
    let data = await response.json();
    data.map(function(row){
        let firstName = document.createElement('p');
        let email = document.createElement('p');

        firstName.innerHTML = row.name;
        email.innerHTML = row.email;

        main_body.appendChild(firstName);
        main_body.appendChild(email);
    })

}
displayAllUsers();

function addNewUser(){
    
fetch("http://localhost:3000/users/",{
    method: "POST",
    headers:{
        "Accept": "application/json",
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: "testing",
        email: "testing@gmail.com"
    })
})
    .then(response=>response.json()).then(data=>{console.log(data)})
    .catch(error=>{
        console.error(error);
    })

}


// ADD NEW USER MODAL

// Get the modal
var modal = document.getElementById("addModal");

// Get the button that opens the modal
var addBtn = document.getElementById("addBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
addBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}