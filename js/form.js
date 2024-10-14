function validateForm() {
    var ma = document.getElementById("id").value;
    var name = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var interestElems = document.querySelectorAll('input[name="interest"]:checked');
    var nationality = document.getElementById("nationality").value;

    var valid = true; // To keep track of form validity

    // Clear all error messages
    document.getElementById("maErr").innerHTML = "";
    document.getElementById("nameErr").innerHTML = "";
    document.getElementById("emailErr").innerHTML = "";
    document.getElementById("genderErr").innerHTML = "";
    document.getElementById("interestErr").innerHTML = "";
    document.getElementById("nationalityErr").innerHTML = "";

    if (ma.trim() === "") {
        document.getElementById("maErr").innerHTML = "SDT bắt buộc phải điền";
        valid = false;
    }
    if (name.trim() === "") {
        document.getElementById("nameErr").innerHTML = "Tên bắt buộc phải điền";
        valid = false;
    }
    if (email.trim() === "") {
        document.getElementById("emailErr").innerHTML = "Email không được để trống";
        valid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById("emailErr").innerHTML = "Địa chỉ Email không hợp lệ";
        valid = false;
    }
    if (!gender) {
        document.getElementById("genderErr").innerText = "Vui lòng chọn giới tính.";
        valid = false;
    }
    if (interestElems.length === 0) {
        document.getElementById("interestErr").innerText = "Vui lòng chọn sở thích.";
        valid = false;
    }
    if (nationality === "") {
        document.getElementById("nationalityErr").innerText = "Vui lòng chọn khu vuc.";
        valid = false;
    }

    // If the form is valid, process the submission
    if (valid) {
        validate(); // Call function to add data to the table
    }

    return false; // Prevent form submission
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validate() {
    var id = document.getElementById("id").value;
    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var sex = document.querySelector('input[name="gender"]:checked').value;
    var nationality = document.getElementById("nationality").value;
    var note = document.getElementById("note").value;

    // Collect interests
    var interests = [];
    document.querySelectorAll('input[name="interest"]:checked').forEach(function(checkbox) {
        interests.push(checkbox.value);
    });

    // Create a new row in the table
    var table = document.getElementById("danhSachSinhVien").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    // Add data to the new row
    newRow.insertCell(0).innerHTML = id;
    newRow.insertCell(1).innerHTML = fullname;
    newRow.insertCell(2).innerHTML = email;
    newRow.insertCell(3).innerHTML = sex;
    newRow.insertCell(4).innerHTML = nationality;
    newRow.insertCell(5).innerHTML = note;
    newRow.insertCell(6).innerHTML = '<button onclick="deleteRow(this)">Xóa</button>'; // Add delete button

    // Reset form after adding data to the table
    document.getElementById("id").value = "";
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("nationality").selectedIndex = 0;
    document.getElementById("note").value = "";
    document.querySelectorAll('input[name="interest"]:checked').forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}