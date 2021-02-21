let main_body = document.getElementById("main-body");

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