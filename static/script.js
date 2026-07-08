const API_URL = "/employees/";

const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable");

let editingId = null;

// =======================
// Load Employees
// =======================
async function loadEmployees() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load employees");
        }

        const employees = await response.json();

        table.innerHTML = "";

        employees.forEach(employee => {

            table.innerHTML += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>

                    <td>

                        <button class="edit-btn"
                            onclick="editEmployee(
                                ${employee.id},
                                '${employee.name}',
                                '${employee.email}',
                                '${employee.department}',
                                ${employee.salary}
                            )">
                            Edit
                        </button>

                        <button class="delete-btn"
                            onclick="deleteEmployee(${employee.id})">
                            Delete
                        </button>

                    </td>
                </tr>
            `;

        });

    } catch (error) {
        console.error(error);
    }

}

// =======================
// Add / Update Employee
// =======================
form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const employee = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        department: document.getElementById("department").value,

        salary: Number(document.getElementById("salary").value)

    };

    try {

        if (editingId === null) {

            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(employee)

            });

        } else {

            await fetch(`${API_URL}${editingId}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(employee)

            });

            editingId = null;

            form.querySelector("button").textContent = "Add Employee";

        }

        form.reset();

        loadEmployees();

    } catch (error) {

        console.error(error);

    }

});

// =======================
// Delete Employee
// =======================
async function deleteEmployee(id) {

    if (!confirm("Delete this employee?")) {
        return;
    }

    try {

        await fetch(`${API_URL}${id}`, {

            method: "DELETE"

        });

        loadEmployees();

    } catch (error) {

        console.error(error);

    }

}

// =======================
// Edit Employee
// =======================
function editEmployee(id, name, email, department, salary) {

    editingId = id;

    document.getElementById("name").value = name;

    document.getElementById("email").value = email;

    document.getElementById("department").value = department;

    document.getElementById("salary").value = salary;

    form.querySelector("button").textContent = "Update Employee";

}

// =======================
// Initial Load
// =======================
loadEmployees();