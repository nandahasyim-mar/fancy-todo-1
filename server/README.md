**Create To DO**
----
  Add to do list to server.

* **URL**

  /todos

* **Method:**

  `POST`

* **URL Params**

   **Required:**

   `id=[integer]`  

* **Data Params**

  `
  title:[string],
  description:[string],
  status:[string],
  due_date:[date]
  `

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    `
    id,
    title,
    description,
    status,
    due_date
    `
 
* **Error Response:**

  if date has passed.

  * **Code:** 400 Validate due_date <br />
    **Content:** `{ error : "INVALID DATE" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

-------------------------------------------------------------------------------------

**Read All To Do**
----
  Show all available to do in server.

* **URL**

  /todos

* **Method:**
  
  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id",
        "title",
        "description",
        "status",
        "due_date"
    }
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error: Internal Server Error }`

---------------------------------------------------------------------------------

**Read Specific To Do**
----
  Show requested Data

* **URL**

  `/todos/:id`

* **Method:**

  `GET`
  
*  **URL Params**

  `/todos/:id`

   **Required:**
 
   `id=[integer]`

*  **Data Params**

  request params id

  `id=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
    {
        "id",
        "title",
        "description",
        "status",
        "due_date"
    }
  ]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid Id" }`

  OR

  * **Code:** 400 <br />
    **Content:** `{ error : "Internal server error" }`

------------------------------------------------------------------------------------------

**Add or Replace To Do**
----
  Add or replace to do in server.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  req params
  `id=[integer]`

  req body
  `
  title:[string],
  description:[string],
  status:[string],
  due_date:[date]
  `

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
      {
        "title",
        "description",
        "status",
        "due_date",
      }
    ]`
 
* **Error Response:**

  if date is passed

  * **Code:** 400 Validate due_date <br />
    **Content:** `{ error : "Invalid date" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`


------------------------------------------------------------------------------------------

**Replace Specific Params To Do**
----
  Replace spesific params status To Do in server

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   /todos/:id

   **Required:**
 
   `id=[integer]`

* **Data Params**

  req params body
  `status=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
      {
        title,
        description,
        status,
        due_date
      }
    ]`
 
* **Error Response:**

  * **Code:** 400 VALIDATE <br />
    **Content:** `{ error : "Invalid date" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error Not Found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

--------------------------------------------------------------------------------------------

**Delete To Do**
----
  Delete to do in server

* **URL**

  /todos/:id

* **Method:**
  
  <_The request type_>

  `DELETE`
  
*  **URL Params**

   /todos/:id

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: "todo success to delete" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`