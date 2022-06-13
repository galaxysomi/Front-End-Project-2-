function findTeacher() {
    axios.get("http://localhost:8082/admin/getAllTeachers", {
        headers: { Authorization: localStorage.getItem("token") }
    })  // dien link api vao
        .then((teacher) => {
            console.log(teacher);
            let info = " ";
            $.each(teacher.data.data, function (index, value) {
                info += `
            <tr>
              <td> ${index + 1} </td>
              <td> ${value.teacherName} </td>
              <td> ${value.teacherGender}</td>
              <td> ${value.teacherDob}</td>
              <td> ${value.teacherPhoneNumber}</td>
              <td> ${value.teacherAddress}</td>
              <td> ${value.teacherEmail}</td>
              <td> ${value.teacherAddress}</td>
              <td> ${value.subject}</td>
              <td>
              <button onClick="getTeacherById('${value.teacherID}')" style="margin-top: 20px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeTeacher">
              Sửa
              </button>
              <button type="button" onClick = "deleteTeacherOnClick('${value.teacherID}')"style="margin-top: 20px;" type="button" class="btn btn-danger">
              Xóa
              </button>  
              </td>                                
            </tr>            
             `
            });
            $('#information').html(info);
        });
}

$(document).ready(findTeacher());

function deleteTeacherOnClick(id) {
    deleteTeacher(id);
    alert("Xóa thành công");
    refreshPage()
}

function refreshPage() {
    window.location.reload();
}


function addTeacher() {


    axios.post('http://localhost:8082/admin/addNewTeacher', {
        teacherName: document.getElementById("Name").value,
        teacherDob: document.getElementById("Dob").value,
        teacherGender: document.getElementById("Gender").value,
        subject: document.getElementById("Subject").value,
        teacherPhoneNumber: document.getElementById("Number").value,
        teacherAddress: document.getElementById("Address").value,
        teacherEmail: document.getElementById("Mail").value,
    }, {
        headers: { Authorization: 'Bearer ' + localStorage.token },


    })
        .then((rs) => {
            console.log(rs.data);
            if (rs.data.success) {
                alert(rs.data.message);
            } else {
                alert(rs.data.message)
            }
            refreshPage();
        })
}

function deleteTeacher(id) {
    // const id = document.getElementById("invisibleID").value;
    axios.delete('http://localhost:8082/admin/deleteTeacher/', {
        headers: { Authorization: localStorage.getItem("token") },
        params: { teacherID: id }
    })
        .then((rs) => {
            alert('Bạn có muốn xóa giáo viên này không?')
            if (rs.data.success) {
                alert(rs.data.message)
                refreshPage();
            } else {
                alert(rs.data.message)
                refreshPage();
            }
        })
}

function getTeacherById(id) {
    axios.get('http://localhost:8082/admin/getTeacher/', {
        headers: { Authorization: 'Bearer ' + localStorage.token },
        params: { teacherID: id }
    }).then(data => {
        console.log(data.data.data);
        document.getElementById("changeName").value = data.data.data.teacherName;
        document.getElementById("changeDob").value = data.data.data.teacherDob;
        document.getElementById("changeSubject").value = data.data.data.subject;
        document.getElementById("changeNumber").value = data.data.data.teacherPhoneNumber;
        document.getElementById("changeGender").value = data.data.data.teacherGender;
        document.getElementById("changeAddress").value = data.data.data.teacherAddress;
        document.getElementById("changeMail").value = data.data.data.teacherEmail;
        document.getElementById("invisibleID").value = data.data.data.teacherID;
    })
}

function changeTeacherByID() {
    const id = document.getElementById("invisibleID").value;
    console.log(id);
    axios.put('http://localhost:8082/admin/updateTeacher', {
        teacherID: id,
        teacherName: document.getElementById("changeName").value,
        teacherDob: document.getElementById("changeDob").value,
        teacherGender: document.getElementById("changeGender").value,
        subject: document.getElementById("changeSubject").value,
        teacherPhoneNumber: document.getElementById("changeNumber").value,
        teacherAddress: document.getElementById("changeAddress").value,
        teacherEmail: document.getElementById("changeMail").value,
    }, {
        headers: { Authorization: 'Bearer ' + localStorage.token },
        params: { teacherID: id }

    })
        .then((rs) => {
            console.log(rs.data);
            if (rs.data.success) {
                alert(rs.data.message);
            } else {
                alert(rs.data.message)
            }
            refreshPage();
        })

}