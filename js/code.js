const urlBase = 'php';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
let dark = 0;

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
  var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

//	let tmp = {login:login,password:password};
	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;

				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function darkMode(){
			
			theme = document.getElementById("theme");
      
      let minutes = 20;
      let darkDate = new Date();
      darkDate.setTime(darkDate.getTime()+(365*24*minutes*3*60*1000));
			
			
			if(theme.getAttribute("href") == "css/styles.css") 
			{
				theme.href = "css/dark.css";
				document.cookie = "dark=1;expires=" + darkDate.toGMTString();
        document.getElementById("darkModeButton").innerText = "Light Mode";
			}
			else
			{
				theme.href = "css/styles.css";
        document.cookie = "dark=0;expires=" + darkDate.toGMTString();
        document.getElementById("darkModeButton").innerText = "Dark Mode";
			}

		}
   
function load(){
    
      if(dark == 1) 
      {
        theme = document.getElementById("theme");
        theme.href = "css/dark.css";
        document.getElementById("darkModeButton").innerText = "Light Mode";
      }
    
    }

function doRegister()
{
	userId = "";
	firstName = "";
	lastName = "";

	let regFirst = document.getElementById("regFirst").value;
	let regLast = document.getElementById("regLast").value;

	let login = document.getElementById("regName").value;
	let password = document.getElementById("regPassword").value;
	var hash = md5( password );

	document.getElementById("registerResult").innerHTML = "";

	if (regFirst == "" || regLast == "" || login == "" || password == "") 
	{
		document.getElementById("registerResult").innerHTML = "All Fields Required";
    return;
	}

//	let tmp = {firstName:regFirst,lastName:regLast,login:login,password:password};
	let tmp = {firstName:regFirst,lastName:regLast,login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Register.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 500)
			{

				if( xhr.responseText == "" )
				{
					document.getElementById("registerResult").innerHTML = "Username is not available";
					return;
				}

				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("registerResult").innerHTML = err.message;
	}
}

function saveCookie()
{

	let minutes = 20;
	let date = new Date();
  let darkDate = date;
	date.setTime(date.getTime()+(minutes*60*1000));
  darkDate.setTime(date.getTime()+(365*24*minutes*3*60*1000));
 

	document.cookie = "firstName=" + firstName + ";expires=" + date.toGMTString();
	document.cookie = "lastName=" + lastName + ";expires=" + date.toGMTString();
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
  
  if (dark == 0) document.cookie = "dark=0;expires=" + darkDate.toGMTString();

}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(";");
	for(var i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
		else if ( tokens[0] == "dark")
		{
			dark = tokens[1];
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Water You Up To, " + firstName +"!";
	}

}

function readDark()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(";");
	for(var i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if ( tokens[0] == "dark")
		{
			dark = tokens[1];
		}
	}

}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	let newContactFirst = document.getElementById("contactFirst").value;
	let newContactLast  = document.getElementById("contactLast").value;
	let newContactEmail = document.getElementById("contactEmail").value;
	let newContactPhone = document.getElementById("contactPhone").value;

	document.getElementById("contactAddResult").innerHTML = "";

	if (newContactFirst == "" || newContactLast == "")
	{
		document.getElementById("contactAddResult").innerHTML = "Contact must have first and last name";
		return;
	}

	let tmp = {firstName:newContactFirst,lastName:newContactLast,phone:newContactPhone,email:newContactEmail,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

	setTimeout(searchContact, 100);

}

function searchContact()
{

	var Parent = document.getElementById("searchResultTable");
	while(Parent.hasChildNodes())
	{
	   Parent.removeChild(Parent.firstChild);
	}

	let srch = document.getElementById("searchQuery").value;

	let tmp = {userId:userId, search:srch};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );
				let contacts = jsonObject.results;
				// Get the container element where the table will be inserted
				let searchResultTable = document.getElementById("searchResultTable");

				// Create the table element
				let table = document.createElement("table");
				table.setAttribute("class", "resultTable");

				// Get the keys (column names) of the first object in the JSON data
				let cols = [" ", "First Name", "Last Name", "Phone Number", "E-mail Address", " "];

				// Create the header element
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");

				// Loop through the column names and create header cells
				cols.forEach((item) => {
					 let th = document.createElement("th");
					 th.innerText = item; // Set the column name as the text of the header cell
					 tr.appendChild(th); // Append the header cell to the header row
				 });
				 thead.appendChild(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table

				 // Loop through the JSON data and create table rows
				 contacts.forEach((item) => {
					 const editButton = document.createElement('button');
					 const deleteButton = document.createElement('button');

					 editButton.setAttribute("id", "" + item.contactId + "");
					 editButton.setAttribute("class", "contactBtn");
					 editButton.setAttribute("title", "Edit");
					 editButton.setAttribute("data-bs-toggle", "offcanvas");
					 editButton.setAttribute("data-bs-target", "#offcanvasTop");
					 editButton.setAttribute("aria-controls", "offcanvasTop");
					 editButton.innerHTML = '<i id ="icon" class="fa-solid fa-pen-to-square"></i>';
					 editButton.onclick = function(){openEdit(item.contactId, item.firstName, item.lastName, item.phone, item.email)};
					 
					 deleteButton.setAttribute("id", "" + item.contactId + "");
					 deleteButton.setAttribute("title", "Delete");
					 deleteButton.setAttribute("class", "contactBtn");
					 deleteButton.innerHTML = '<i id="icon" class="fa-solid fa-trash"></i>';
					 deleteButton.setAttribute("data-bs-toggle", "modal");
					 deleteButton.setAttribute("data-bs-target", "#delete-modal");
					 deleteButton.onclick = function(){delModal(item.contactId, item.firstName, item.lastName, deleteButton)};
					 
					 let tr = document.createElement("tr");

					 // Get the values of the current object in the JSON data
					 let vals = Object.values(item);

					 // Loop through the values and create table cells
					 vals.forEach((elem) => {
							let td = document.createElement("td");
							td.innerText = elem; // Set the value as the text of the table cell
							tr.appendChild(td); // Append the table cell to the table row

					 });
					 tr.appendChild(editButton);
					 tr.appendChild(deleteButton);
					 table.appendChild(tr); // Append the table row to the table
				});
         searchResultTable.appendChild(table) // Append the table to the container element
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}

function deleteContact(contactId)
{

	let tmp = {contactId:contactId};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/DeleteContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				//document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactDeleteResult").innerHTML = err.message;
	}

}

function openEdit(contactId, ogFirst, ogLast, ogPhone, ogEmail)
{

	document.getElementById("contactEditResult").innerHTML="";
	
	document.getElementById("contactEditFirst").name=contactId;
	document.getElementById("contactEditFirst").value=ogFirst;
	document.getElementById("contactEditLast").value=ogLast;
	document.getElementById("contactEditPhone").value=ogPhone;
	document.getElementById("contactEditEmail").value=ogEmail;

}

function editContact()
{

	let contactId = document.getElementById("contactEditFirst").name;
	let editFirst = document.getElementById("contactEditFirst").value;
	let editLast  = document.getElementById("contactEditLast").value;
	let editPhone = document.getElementById("contactEditPhone").value;
	let editEmail = document.getElementById("contactEditEmail").value;

	let tmp = {userId:userId,contactId:contactId,firstName:editFirst,lastName:editLast,phone:editPhone,email:editEmail};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/EditContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactEditResult").innerHTML = "Contact has been updated";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactEditResult").innerHTML = err.message;
	}

	setTimeout(searchContact, 100);

}

function delModal(contactId, firstName, lastName, button){
	const exampleModal = document.getElementById('delete-modal')
	if (exampleModal) {
		exampleModal.show;
		// Update the modal's content.
		document.getElementById("del-modal-btn").onclick = function(){deleteContact(contactId), button.closest("tr").remove()};
		document.getElementById("exampleModalLabel").innerText = "Are you sure you want to delete " + firstName + " " + lastName + "?";
	}
}

function deleteUser()
{

	let tmp = {userId:userId};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/DeleteUser.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				doLogout();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
	}

}
