

async function findTeacher() {
    axios.get("http://localhost:8082/admin/getAllTeachers", {
        headers: { Authorization: localStorage.getItem("token") }
    })  // dien link api vao
        .then((teacher) => {
            console.log(teacher);
            let info = " ";
            let num = 0;
            $.each(teacher.data.data, async function (index, value) {
                await getClassByTeacherID(value.teacherID).then(data => {
                    info += `
            <tr>
            ${num++}
              <td> ${num} </td>
              <td> ${value.teacherName} </td>
              <td> ${converGender(value.teacherGender)}</td>
              <td> ${convertDateToString(value.teacherDob)}</td>
              <td> ${value.teacherPhoneNumber}</td>
              <td> ${value.teacherAddress}</td>
              <td> ${value.teacherEmail}</td>
              <td> ${checkClass(data.className)}</td>
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
                        ;
                })
                    .catch(err => {
                        console.log(err);
                    })
                $('#information').html(info);
            })
        });
}

$(document).ready(findTeacher());

function convertDateToString(date) {
    const d = new Date(date)
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    return curr_date + "/" + curr_month + "/" + curr_year
}

function converGender(gender) {
    if (gender == 0) return "Nam";
    else return "Nữ";
}
function deleteTeacherOnClick(id) {
    if (confirm("Bạn muốn xoá giáo viên này không ?")) {
        deleteTeacher(id);
    }
}
async function getClassByTeacherID(id) {
    const res = await axios.get('http://localhost:8082/getClassByTeacher', {
        headers: { Authorization: localStorage.getItem("token") },
        params: { teacherID: id }
    })
    let data = await res.data.data;
    return data;
}



function refreshPage() {
    window.location.reload();
}
function checkClass(className) {
    if (className == null) return "Chưa có lớp";
    else return className;
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

            if (true) {
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
        document.getElementById("changeName").value = data.data.data[0].teacherName;
        document.getElementById("changeDob").value = data.data.data[0].teacherDob;
        document.getElementById("changeSubject").value = data.data.data[0].subject;
        document.getElementById("changeNumber").value = data.data.data[0].teacherPhoneNumber;
        document.getElementById("changeGender").value = data.data.data[0].teacherGender;
        document.getElementById("changeAddress").value = data.data.data[0].teacherAddress;
        document.getElementById("changeMail").value = data.data.data[0].teacherEmail;
        document.getElementById("invisibleID").value = data.data.data[0].teacherID;
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

function getToken() {
    return localStorage.getItem("token");
}