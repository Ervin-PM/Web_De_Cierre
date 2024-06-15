// main.js
$(document).ready(function() {
    var users = [];

    $('#userForm').on('submit', function(e) {
        e.preventDefault();

        var user = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            birthDate: new Date($('#birthDate').val()),
            email: $('#email').val(),
            position: $('#position').val(),
            entryDate: new Date($('#entryDate').val())
        };

        // Asegurarse de que las fechas no tengan tiempo
        user.birthDate.setHours(0, 0, 0, 0);
        user.entryDate.setHours(0, 0, 0, 0);

        // Validaciones
        if (users.find(u => u.email === user.email)) {
            alert('El correo electrónico ya está en uso.');
            return;
        }

        var eighteenYearsLater = new Date(user.birthDate.getTime());
        eighteenYearsLater.setFullYear(eighteenYearsLater.getFullYear() + 18);

        if (user.entryDate < eighteenYearsLater) {
            alert('El trabajador no pudo ingresar antes de cumplir 18 años.');
            return;
        }

        // Mostrar modal de confirmación
        $('.modal-body').html(`
            <p>Nombre: ${user.firstName} ${user.lastName}</p>
            <p>Correo Electrónico: ${user.email}</p>
            <p>Cargo: ${user.position}</p>
            <p>Fecha de Ingreso: ${user.entryDate.toISOString().split('T')[0]}</p>
        `);
        $('#confirmModal').modal('show');
    });

    $('#confirmButton').on('click', function() {
        var user = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            birthDate: new Date($('#birthDate').val()),
            email: $('#email').val(),
            position: $('#position').val(),
            entryDate: new Date($('#entryDate').val())
        };

        // Asegurarse de que las fechas no tengan tiempo
        user.birthDate.setHours(0, 0, 0, 0);
        user.entryDate.setHours(0, 0, 0, 0);

        users.push(user);

        var userElement = $(`
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text">${user.position}</p>
                        <p class="card-text">${user.entryDate.toISOString().split('T')[0]}</p>
                        <button class="btn btn-danger removeButton">Eliminar</button>
                    </div>
                </div>
            </div>
        `);

        userElement.find('.removeButton').on('click', function() {
            var index = users.findIndex(u => u.email === user.email);
            users.splice(index, 1);
            userElement.remove();
        });


        $('#userList').append(userElement);
        $('#confirmModal').modal('hide');
    });

    $('#resetButton').on('click', function() {
        $('#userForm')[0].reset();
    });
});