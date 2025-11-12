$(document).ready(function(){// matalab ye datatables ko ready kar rahi hai
var table = $('#userTable').DataTable( {//datatables ko ye isis (id) se target karega
    ajax: {
        url: 'http://localhost:3000/api/users',
        dataSrc: 'data'//server se jo data milega wo isis me save hoga.0
    },
    columns: [

        {
            data: null,
            title: 'S.No.',
            render: function(data, type, row, meta) {
                return meta.row + 1;
            }
        },

        {data: 'name'},
        {data: 'email'},
        {data: 'age'},

        {
            data: '_id',
            render :function(data, type, row){
                return `
                <button onclick="viewUser('${data}')">View</button>
                <button onclick="updateUser('${data}')">Update</button>
                <button onclick="deleteUser('${data}')">Delete</button>

                `
            }
        }
    ],
    layout: {
        topStart: {
            buttons: ['excelHtml5', 'pdfHtml5', 'csvHtml5', 'copyHtml5']
        }
    }
} );
})

// Function definitions for actions
function viewUser(id) {
    $.get('/api/users/' + id, function(data) {
        alert('Name: ' + data.name + '\nEmail: ' + data.email + '\nAge: ' + data.age);
    }).fail(function() {
        alert('Error fetching user');
    });
}

function updateUser(id) {
    var name = prompt('Enter new name:');
    var email = prompt('Enter new email:');
    var age = prompt('Enter new age:');
    if (name && email && age) {
        $.ajax({
            url: '/api/users/' + id,
            type: 'PUT',
            data: { name: name, email: email, age: parseInt(age) },
            success: function() {
                table.ajax.reload();
            },
            error: function() {
                alert('Error updating user');
            }
        });
    }
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        $.ajax({
            url: '/api/users/' + id,
            type: 'DELETE',
            success: function() {
                table.ajax.reload();
            },
            error: function() {
                alert('Error deleting user');
            }
        });
    }
}
