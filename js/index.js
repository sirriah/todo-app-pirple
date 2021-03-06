const content = document.getElementById("content");
const disabled = document.getElementById("disabled");
const firstMenu = document.getElementById("firstMenu");
const signupDiv = document.getElementById("signupDiv");
const loginDiv = document.getElementById("loginDiv");
const dashboard = document.getElementById("dashboard");
const newList = document.getElementById("new-list");
const nameList = document.getElementById("listName");
let listUL = document.getElementById("toDoList");

const login = document.getElementById("login");
const signup = document.getElementById("signup");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const noListsMessage = document.createElement("p");
let isNewList = true;
let foundedList = {};

let userMenu = document.getElementById("userMenu");
const userAccount = document.getElementById("userAccount");
const userAccountForm = document.getElementById("userAccountForm");

// global variable for logged user
let user = {};

// =============== firstmenu page ===============

// first page is the two button menu - log in and sign up
content.appendChild(firstMenu);


// check if the user is logged in
const isUserLogged = () => {
  if (user.name) {
    username.innerHTML = `${user.name} ${user.surname}`;
    userMenu.innerHTML = `You are logged in as `;
    userMenu.appendChild(username);
    userMenu.appendChild(buttonAccount);
    userMenu.appendChild(buttonLogout);
  } else {
    userMenu.innerHTML = `You are not logged in`;
  }
};
isUserLogged();


// Button "User account" in header
const buttonAccount = document.createElement("button");
buttonAccount.innerText = "User Account";
buttonAccount.classList.add("buttonAccount");

// username in header
const username = document.createElement("span");
username.classList.add("username");
username.id = "username";

// User account field in Account Form
const nameAccount = document.getElementById("nameAccount");
const surnameAccount = document.getElementById("surnameAccount");
const emailAccount = document.getElementById("emailAccount");
const passwordAccount = document.getElementById("passwordAccount");

buttonAccount.addEventListener("click", (e) => {
  content.innerHTML = ""; // delete the content
  
  nameAccount.value = user.name;
  surnameAccount.value = user.surname;
  emailAccount.value = user.email;
  passwordAccount.value = user.password;

  content.appendChild(userAccount);
});

// user logout button in header
const buttonLogout = document.createElement("button");
buttonLogout.innerHTML = "Log out";
buttonLogout.classList.add("button-logout");

buttonLogout.addEventListener("click", (e) => {
  user = {};
  isUserLogged();
  content.innerHTML = "";
  content.appendChild(firstMenu);
});

// saving Account form
userAccountForm.addEventListener("submit", (e) => {
  localStorage.removeItem(user.email);

  user.name = document.getElementById("nameAccount").value;
  user.surname = document.getElementById("surnameAccount").value;
  user.email = document.getElementById("emailAccount").value;
  user.password = document.getElementById("passwordAccount").value;

  console.log(user);

  localStorage.setItem(user.email, JSON.stringify(user));
  isUserLogged();
  content.innerHTML = ""; // delete the content
  content.appendChild(dashboard);
});



login.addEventListener("click", (e) => {
  content.innerHTML = ""; // delete the content

  isUserLogged();
  content.appendChild(loginDiv);
});

signup.addEventListener("click", (e) => {
  isUserLogged();
  content.innerHTML = ""; // delete the content
  content.appendChild(signupDiv);
});

// =============== Login page ===============

loginForm.addEventListener("submit", loginUser);
function loginUser(e) {
  e.preventDefault();
  const emailLogin = document.getElementById("email-login").value;
  const passwordLogin = document.getElementById("password-login").value;
  const loggedUser = JSON.parse(localStorage.getItem(emailLogin));

  if (loggedUser && passwordLogin === loggedUser["password"]) {
    console.log("this user exists");
    user = loggedUser;
    console.log(user);
    content.innerHTML = "";
    writeOutLists();
    content.appendChild(dashboard);
  } else if (loggedUser && passwordLogin !== loggedUser["password"]) {
    const errorLogin = document.getElementById("errorLogin");
    errorLogin.innerHTML = "You set a wrong password.";
    console.log("wrong password");
  } else {
    const errorLogin = document.getElementById("errorLogin");
    errorLogin.innerHTML = "User with this email does not exists.";
    console.log("this user not exists");
  }
  isUserLogged();
}

// =============== Signup page ===============
const nameSignup = document.getElementById("name");
const surnameSignup = document.getElementById("surname");
const emailSignup = document.getElementById("email");
const passwordSignup = document.getElementById("password");
const termsOfUse = document.getElementById("termsofuse");
let createNewUser = (e) => {
  console.log("before prevent");
  e.preventDefault();
  const errorSignup = document.getElementById("errorSignup");
  errorSignup.innerHTML = "";

  if (!termsOfUse.checked) {
    errorSignup.innerHTML = "You have to agree with the Terms of Use. <br/>";
  }

  if (nameSignup.value == "") {
    errorSignup.innerHTML += "Name field have to be filled. <br/>";
    nameSignup.classList.add("error-signup");
  }

  if (surnameSignup.value == "") {
    errorSignup.innerHTML += "Surname field have to be filled. <br/>";
    surnameSignup.classList.add("error-signup");
  }

  if (emailSignup.value == "") {
    errorSignup.innerHTML += "Email field have to be filled. <br/>";
    emailSignup.classList.add("error-signup");
  }

  if (passwordSignup.value == "") {
    errorSignup.innerHTML += "Password field have to be filled. ";
    passwordSignup.classList.add("error-signup");
  }

  if (errorSignup.innerHTML.length == "") {
    // form validation and new user is created
    validationSignup();

    // to the dashboard
    content.innerHTML = ""; // delete the content
    content.appendChild(dashboard);
  }
  isUserLogged();
};

// Sign up form listener
signupForm.addEventListener("submit", createNewUser);
let validationSignup = () => {
  //field validation

  user = {
    name: nameSignup.value,
    surname: surnameSignup.value,
    email: emailSignup.value,
    password: passwordSignup.value,
    lists: [],
  };

  console.log(user);
  localStorage.setItem(user.email, JSON.stringify(user));
};

// =============== DASHBOARD ===============

// dashboard - displays form

const createNewList = document.getElementById("createNewList");
createNewList.addEventListener("click", () => {
  content.innerHTML = "";

  content.appendChild(newList);
  nameList.value = "";
  listUL.innerHTML = "";
  document.getElementById("itemNew").value = "";
});

// dasboard displays lists

// add new item into the list

let listObject = {};
// inserts the new LI into the UL list
const listItemForm = document.getElementById("listItemForm");
listItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newItem = document.getElementById("itemNew").value;
  const newLI = document.createElement("li");
  newLI.innerHTML = newItem;
  listUL.appendChild(newLI);
  document.getElementById("itemNew").value = "";
});

// ============= SAVE THE FORM WITH LIST ============

// saves the whole list with the name and timestamp into the user.lists array
const listSaveForm = document.getElementById("listSaveForm");
listSaveForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isNewList) {
   
    let nameList = document.getElementById("listName").value;
    if (!nameList) {
      nameList = "Untitled";
    }
    // toISOString converts the UTC date-time to ISO object
    const creationDate = new Date().toISOString();

    listObject = {
      nameList: nameList,
      creationDate: creationDate,
      listUL: listUL.innerHTML,
    };
    user.lists.push(listObject);
    localStorage.setItem(user.email, JSON.stringify(user));
   

    // Write the lists
  } else {
    localStorage.removeItem(user.email);
    const renamedList = document.getElementById("listName").value;
    const renewedUL = document.getElementById("toDoList");

    for (const iterator of user.lists) {
      if (iterator.creationDate == foundedList.creationDate) {
        iterator.nameList = renamedList;
        iterator.listUL = renewedUL.innerHTML;
      }
    }
    localStorage.setItem(user.email, JSON.stringify(user));
    isNewList = true;
  }

  content.innerHTML = "";
  writeOutLists();
  content.appendChild(dashboard);
});

/*
function for write out the list of to-do lists on the Dashboard

*/
let listOfLists = document.createElement("div");
listOfLists.id = "list-of-lists";

const writeOutLists = () => {
  if (user.lists.length !== 0) {
    noListsMessage.innerHTML = "";
    listOfLists.innerHTML = "";

    user.lists.forEach((element) => {
      const listButton = document.createElement("div");
      listButton.classList.add("list--detail");

      // add headline tag with the name of the list into the button
      const listHeadline = document.createElement("h3");
      listHeadline.innerHTML = element.nameList;
      listHeadline.setAttribute("data-timestamp", element.creationDate);
      listButton.appendChild(listHeadline);

      // add date into the "button > span" in nicer format
      const listDate = document.createElement("span");
      listDate.setAttribute("data-timestamp", element.creationDate);
      const optionsDate = { day: "numeric", month: "short", year: "numeric" }; // format of the date

      // in the element.creationDate is not stored the Date object, but only a String - so it have to be parsed via "new Date"
      listDate.innerHTML = new Intl.DateTimeFormat("en-US", optionsDate).format(
        new Date(element.creationDate)
      );
      listButton.appendChild(listDate);

      // dataset https://stackoverflow.com/questions/33760520/how-can-i-get-the-values-of-data-attributes-in-javascript-code
      listButton.setAttribute("data-timestamp", element.creationDate);

      listOfLists.appendChild(listButton);
    });

    dashboard.appendChild(listOfLists);
  } else {
    noListsMessage.innerHTML = "You have not added any list yet.";
    dashboard.appendChild(noListsMessage);
  }
};

listOfLists.addEventListener("click", (e) => {
  //console.log(e.target);
  isNewList = false;
  const selectedList = e.target;
  
  console.log("E target " + selectedList);
  console.log("E current target " + e.currentTarget);

  console.log("dataset " + selectedList.getAttribute("data-timestamp"));

  // https://usefulangle.com/post/3/javascript-search-array-of-objects
  foundedList = user.lists.find((list, timestamp) => {
    if (list.creationDate == selectedList.getAttribute("data-timestamp")) {
      return true;
    }
  });

  nameList.value = foundedList.nameList;
  listUL.innerHTML = foundedList.listUL;

  // insert the list from e.target into the html form

  content.innerHTML = "";
  content.appendChild(newList);
});

// ============= CHECK AS "DONE" =============

listUL.addEventListener("click", (e) => {
  const itemLI = e.target;
  itemLI.classList.toggle("done");
});
