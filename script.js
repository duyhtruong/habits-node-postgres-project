let main_body = document.getElementById("main-body");


//Display All Users
async function displayAllUsers(){
    let response = await fetch('http://localhost:3000/users/');
    let data = await response.json();
    data.map(function(row){
        let userBody = document.createElement('DIV');
        let firstName = document.createElement('P');
        let email = document.createElement('P');
        let deleteButton = document.createElement('BUTTON');
        
        let userID = row.id;
        deleteButton.addEventListener("click", function(){deleteUser(userID)},false);
        //deleteButton.onclick = deleteUser(userID);
        firstName.innerHTML = row.name;
        email.innerHTML = row.email;

        deleteButton.innerHTML = 'X';

        userBody.classList.add('body--user-card')


        userBody.appendChild(firstName);
        userBody.appendChild(email);
        userBody.appendChild(deleteButton);
        main_body.appendChild(userBody);
    
    })

}
displayAllUsers();

function addNewUser() {

    fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "testing",
            email: "testing@gmail.com"
        })
    })
}

function deleteUser(id){
    let deleteURL = 'http://localhost:3000/users/' + id;
    fetch(deleteURL,{
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        }
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