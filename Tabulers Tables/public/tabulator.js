//Build Tabulator
var table = new Tabulator("#userTable", {// set the id of their tables
    ajaxURL:"http://localhost:3000/api/users",// set the api routes
    ajaxResponse:function(url, params, response){
        //url - the URL of the request
        //params - the parameters passed with the request
        //response - the JSON object returned in the body of the response.

        return response.data; //return the tableData property of a response json object
    },
    layout: "fitColumns",
    pagination:true,
    paginationSize:10,
    paginationSizeSelector:[10, 25, 50, 100],
    printAsHtml:true,
    printHeader:"<h1>Usrs Data<h1>",
    printFooter:"",
    placeholder:"No Data Set",

    columns:[
        {title:"Name", field:"name", headerFilter:"input"},
        {title:"Email", field:"email",headerFilter:"input"},
        {title:"Age", field:"age"},
        {
            title: 'Actions',
            formatter: function(){
                return `
                <button onClick="viewUser()" >View</button>
                <button onClick="updateUser()" >Update</button>
                <button onClick="deleteUser()" >Delete</button>
                `
            }
        }

    ],
});


//search
var fieldEl = document.getElementById("filter-field");
var typeEl = document.getElementById("filter-type");
var valueEl = document.getElementById("filter-value");


function updateFilter(){
    var filterVal = fieldEl.value
    var typeVal = typeEl.value
    var filter = valueEl.value


  if(filterVal){
    table.setFilter(filterVal,typeVal, filter);
  }

}


valueEl.addEventListener("keyup", updateFilter)



// Define action functions
function viewUser() {
    alert("View user functionality not implemented yet.");
}

function updateUser() {
    alert("Update user functionality not implemented yet.");
}

function deleteUser() {
    alert("Delete user functionality not implemented yet.");
}


//Print button
// ye sab code se print button kaam kaerga
document.querySelector('#print-table').addEventListener('click', function(){
    table.print(false, true)
})