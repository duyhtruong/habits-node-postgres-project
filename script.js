let main_body = document.getElementById("main-body");

//create Element
function create(x){
    return document.createElement(x);
}

//Display All Users
async function displayAllUsers(){
    let response = await fetch('http://localhost:3000/users/');
    let data = await response.json();
    data.map(function(row){
        let userBody = create('DIV');
            userBody.classList.add('body--user-card');
        let firstName = create('P');
            firstName.innerHTML = row.name;
        let email = create('P');
            email.innerHTML = row.email;
        let userID = row.id;

        let deleteButton = create('BUTTON');
            deleteButton.innerHTML = 'X';
            deleteButton.onclick = function(){deleteUser(userID)};
           
        let viewSingleButton = create('BUTTON');
            viewSingleButton.innerHTML = 'edit';
            viewSingleButton.id = "viewSingleBtn";
            viewSingleButton.onclick = function(){viewSingleUser(userID,row.name,row.email)};
           

        let addHabitsButton = create('BUTTON');
            addHabitsButton.innerHTML = 'add new habit';
            addHabitsButton.id = "addHabitBtn";
            addHabitsButton.onclick = function(){
                addHabitModal.style.display = "block";
            }

        

        userBody.appendChild(firstName);
        userBody.appendChild(email);
        userBody.appendChild(deleteButton);
        userBody.appendChild(viewSingleButton);
        userBody.appendChild(addHabitsButton);
        main_body.appendChild(userBody);
    
    })

}
displayAllUsers();



//Function to add new Habits
function addNewHabit(userid){
    let userInputHabit = document.getElementById('addHabitName').value;
    let addNewHabitURL = "http://localhost:3000/habits/" + userid;

    fetch(addNewHabitURL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            habitName: userInputHabit
        })
    })
}


//Function to add new users
function addNewUser() {
    let userInputName = document.getElementById('addFName').value;
    let userInputEmail = document.getElementById('addEmail').value;

    fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userInputName,
            email: userInputEmail
        })
    })
}

//Function to delete users
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

//Function to view a single user's modal
function viewSingleUser(userID,userName,userEmail){
    viewModal.style.display = "block";
    console.log(userID)
    let editUserValue = document.getElementById("editFName");
    let editEmailValue = document.getElementById("editEmail");
    editUserValue.value = userName;
    editEmailValue.value = userEmail;
    editUserValue.placeholder = userName;
    editEmailValue.placeholder = userEmail;
    let editForm = document.getElementById('editForm');
    editForm.onsubmit = function(){editUser(userID)};


}

function editUser(userID){
    let newUserValue = document.getElementById("editFName").value;
    let newEmailValue = document.getElementById("editEmail").value;
    let editURL = 'http://localhost:3000/users/' + userID;

    fetch(editURL, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newUserValue,
            email: newEmailValue
        })
    })

}





// ADD NEW USER MODAL

// Get the modal
var modal = document.getElementById("addModal");
var viewModal = document.getElementById("viewSingleUserModal");
var addHabitModal = document.getElementById("addHabitModal");

// Get the button that opens the modal
var addBtn = document.getElementById("addBtn");
var viewSingleBtn = document.getElementById("viewSingleBtn");
var addHabit = document.getElementById("addHabitBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanView = document.getElementsByClassName("viewClose")[0];
var spanHabit = document.getElementsByClassName("habitClose")[0];

// When the user clicks on the button, open the modal
addBtn.onclick = function() {
  modal.style.display = "block";
}

//addHabit.onclick = function(){
 //   addHabitModal.style.display = "block";
//}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

spanView.onclick = function(){
    viewModal.style.display="none";
}

spanHabit.onclick = function(){
    addHabitModal.style.display="none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event){
    if(event.target == modal){
        modal.style.display="none"; 
  }
  if(event.target == viewModal){
      viewModal.style.display="none";
  }
  if(event.target == addHabitModal){
      addHabitModal.style.display="none";
  }
}
