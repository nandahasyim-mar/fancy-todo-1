


$(document).ready(function() {
  const token = localStorage.getItem("access_token")
    
  if (token) {
    afterLogin()
    allToDo()
    getToDoDone()
  } else {
    beforeLogin()
  }
})

function afterLogin() {
  $("#content").show()
  $("#landing").hide()
  $("#nav-home").show()
  $("#nav-logout").show()
  $("#nav-add").show()
  $("#nav-login").hide()
  $("#register-form").hide()
  $("#todoList").show()
  $("#done-todo").show()
  $(".g-signin2").hide()


}

function beforeLogin() {
  $("#content").hide()
  $("#landing").show()
  $("#nav-home").hide()
  $("#nav-add").hide()
  $("#nav-logout").hide()
  $("#nav-login").hide()
  $("#register-form").hide()
  $(".g-signin2").show()
  $("#go-to-register").on("click", function() {
    $("#landing").hide()
    $("#nav-home").hide()
    $("#nav-add").hide()
    $("#nav-logout").hide()
    $("#nav-login").show()
    $("#register-form").show()
  })
  $("#go-to-login").on("click", function() {
    $("#landing").show()
    $("#nav-add").hide()
    $("#nav-home").hide()
    $("#nav-logout").hide()
    $("#register-form").hide()
    $("#nav-login").hide()
    $(".g-signin2").show()

  })
}

// Google Sign In
function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/googlelogin',
    data: {
      google_access_token
    }
  })
  .done(response => {
    console.log(response);
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("id", response.id);
    afterLogin()
  })
  .fail(err => {
    console.log(err);
  })
}

// Google Log out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}



function login(e) {
  e.preventDefault()
  afterLogin()
  const username = $("#login-username").val()
  const password = $("#login-password").val()

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/login",
    data: {
      email: username,
      password: password,
    }
  })
  .done(response => {
    const access_token = response.access_token
    localStorage.setItem("access_token", access_token)
    afterLogin();
  })
  .fail(err => {
    beforeLogin()
    Swal.fire("Failed!", `${err.responseJSON.message}`)
  })
}

function register(e) {
  e.preventDefault()
  const email = $("#register-email").val()
  const password = $("#register-password").val()

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/register",
    data: {
      email: email,
      password: password
    }
  })
  .done(respone => {
    console.log(respone);
    if (!respone.email) {
      Swal.fire(
        `Failed`,
        `Must be format email`,
        `error`
      )
    } else {
      beforeLogin()
    }
  })
  .fail(err => {
    $("#landing").hide()
    $("#nav-home").hide()
    $("#nav-add").hide()
    $("#nav-logout").hide()
    $("#nav-login").show()
    $("#register-form").show()
  })
}

function logout() {
  beforeLogin()
  localStorage.clear()
}


function allToDo() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/todos/all',
    headers: {
      access_token: localStorage.getItem('access_token'),
      id: localStorage.getItem('id')
    }
  })
  .done(response => {
    if (response.length == 0) {
      afterLogin()
    }
    response.forEach(el => {
      // console.log(el.title);
        $('#todoList').append(`
            <div class="card w-75">
            <div class="card-body">
                <h5 class="card-header pl-1 mb-2">${el.title}</h5>
                <small class="font-italic">Description:</small>
                <p class="card-text font-weight-light">${el.description}</p><hr>
                <small class="font-italic">Deadline:</small>
                <p class="card-text">${date(el.due_date)}</p>
                <button class="btn btn-warning" onclick="getToDoById(${el.id})" data-toggle="modal" data-target="#modal-edit">Edit</button>
                <button class="btn btn-success" onclick="patchToDo(${el.id}, event)">Done</button>
                <button class="btn btn-danger" onclick="deleteToDo(${el.id})">Delete</button>
            </div>
            </div>
        `);
    });
  })
  .fail(err => {
    console.log(err);
  })
}

function getToDoById(id) {
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/todos/${+id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    params: {
      id: +id
    }
  })
  .done(response => {
    $('#edit-todo').append(`
    <div class="modal fade" id="modal-edit" tabindex="-1" role="dialog" aria-labelledby="modal-edit" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-edit">Create your to do</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form onsubmit="putToDo(event, ${response.id})">
            <div class="form-group">
              <label for="title" class="col-form-label">Title:</label>
              <input type="text" class="form-control" id="title-edit" value="${response.title}">
            </div>
            <div class="form-group">
              <label for="description" class="col-form-label">Description:</label>
              <input type="text" class="form-control" id="description-edit" value="${response.description}"></input>
            </div>
            <div class="form-group">
              <label for="due-date" class="col-form-label">Deadline:</label>
              <input type="date" id="due-date-edit" class="form-control" value="${date(response.due_date)}">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    `)
  })
  .fail(err => {
    console.log(err);
  })
}

function createToDo(e) {
  e.preventDefault
  let access_token = localStorage.getItem('access_token')
  let userId = localStorage.getItem('id')
  const title = $("#title").val()
  const description = $("#description").val()
  const due_date = $("#due-date").val()

  $.ajax({
    method: "POST",
    url: `http://localhost:3000/todos`,
    headers: {
      access_token: access_token
    },
    data: {
      title,
      description,
      due_date,
      userId
    }
  })
  .done(response => {
    window.location.reload()
    afterLogin()
    $('#modal').hide()
  })
  .fail(err => {
    console.log(err);
  })
}

function putToDo(e, id) {
  e.preventDefault
  let userId = localStorage.getItem('id')
  let title = $('#title-edit').val()
  let description = $('#description-edit').val()
  let due_date = $('#due_date-edit').val()
  $.ajax({
    method: 'PUT',
    url: `http://localhost:3000/todos/${+id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      title,
      description,
      due_date,
      userId
    },
    params: {
      id: +id
    }
  })
  .done(respone => {
    window.location.reload()
    afterLogin()
    $('#modal-edit').hide()
  })
  .fail(err => {
    console.log(err);
  })
}

function patchToDo(id, e) {
  e.preventDefault()
  $.ajax({
    method: "PATCH",
    url: `http://localhost:3000/todos/${+id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    params: {
      id: +id
    }
  })
  .done(respone => {
    window.location.reload()
    afterLogin()
  })
  .fail(err => {
    console.log(err);
  })
}

function getToDoDone () {
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/todos`,
    headers: {
      access_token: localStorage.getItem('access_token'),
      id: localStorage.getItem('id')
    }
  })
  .done(response => {
    response.forEach(el => {
      $("#todoListDone").append(`
      <div class="card w-75">
      <div class="card-body">
          <h5 class="card-header pl-1 mb-2"><del>${el.title}</del></h5>
          <small class="font-italic">Description:</small>
          <p class="card-text font-weight-light">${el.description}</p><hr>
          <small class="font-italic">Deadline:</small>
          <p class="card-text">${date(el.due_date)}</p>
          <button class="btn btn-light" onclick="deleteToDo(${el.id})">Delete</button>
      </div>
      </div>
      `)
    })
  })
}

function deleteToDo(id) {
  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/todos/${+id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    params: {
      id: +id
    }
  })
  .done(response => {
    window.location.reload()
    $("#content").show()
    $("#landing").hide()
    $("#nav-home").show()
    $("#nav-logout").show()
    $("#nav-login").hide()
    $("#register-form").hide()
    $("#todoList").show()
  })
}

function date(date) {
  var d = new Date(date).toISOString().slice(0, 10)
  
  return d
}