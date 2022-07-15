async function findClass() {

    axios
        .get("http://localhost:8082/admin/getClasses", {
            headers: { Authorization: localStorage.getItem("token") }
        })  // dien link api vao day
        .then((data) => {
            let info = " ";
            let num = 0;
            const getTeacherName = data.data.data
            $.each(getTeacherName, async function (index, value) {
                await getTeacherByTeacherId(value.teacherID).then(data => {
                    console.log(data)
                    info += `
            <tr>
            ${num += 1}
              <td> ${num} </td>
              <td> ${data[0].teacherName} </td>
              <td> ${value.className}</td> 
              <td>${data[1].numberOfStudent}</td>}                             
              <td>
              <button type="button" onClick = "deleteClass('${value.classID}')" class="btn btn-danger">Xóa</button>  
              
              <button   type="button" class="btn btn-success"><a href="./classInfo.html?${value.classID}"> Xem danh sách</a></button>  
              
              </td>                   
            </tr>            
             `
                        ;
                })
                $('#information').html(info);
            })
        });
}

function getClassByTeacherID(id) {
    const res = axios.get('http://localhost:8082/getClassByTeacher', {
        headers: { Authorization: localStorage.getItem("token") },
        params: { teacherID: id }
    })
    return res;
}

console.log(getClassByTeacherID("111852d2-415e-4915-b949-4c2cf0d3a439"))

async function getTeacherByTeacherId(id) {
    const res = await axios.get('http://localhost:8082/admin/getTeacher/', {
        headers: { Authorization: 'Bearer ' + localStorage.token },
        params: { teacherID: id }
    })
    let data = await res.data.data;
    return data;
}

async function getClassInfo(id) {
    const res = await axios.get('http://localhost:8082/student/getAllStudentsInClass', {
        headers: { Authorization: localStorage.getItem("token") },
        params: { classID: id }
    })
    let data = await res.data.data;
    return data;
}




$(document).ready(findClass());


function refreshPage() {
    window.location.reload();
}


function addClass() {
    axios.post('http://localhost:8082/admin/addNewClass/', {
        className: document.getElementById("className").value,
        teacherID: document.getElementById("teacherID").value,
    }, {
        headers: { Authorization: 'Bearer ' + localStorage.token }
    })
        .then((rs) => {
            console.log(rs.data);
            if (rs.data.success) {
                alert(rs.data.message);
            } else {
                alert(rs.data.message);
            }
            refreshPage();
        })
}

function deleteClass(id) {
    axios.delete('http://localhost:8082/admin/deleteClass/', {
        headers: { Authorization: 'Bearer ' + localStorage.token },
        params: { classID: id }
    })
        .then((rs) => {
            alert('Bạn có muốn xóa lớp học này không?')
            if (rs.data.success) {
                alert(rs.data.message)
                refreshPage();
            } else {
                alert(rs.data.message)
                refreshPage();
            }
        })
}

function getClassByID(id) {
    axios.get('http://localhost:8082/admin/getClasses' + id, {
        headers: { Authorization: localStorage.getItem("token") }
    }).then(data => {
        document.getElementById("changeName").value = data.data.class_Name;
        // document.getElementById("changeAge").value 
        document.getElementById("changeSex").value = data.data.parent_age;
        document.getElementById("changeClass").value = data.data.className;
        document.getElementById("changeNumber").value = data.data.parent_address;
        document.getElementById("changeNumStudent").value = data.data.parentEmail;
        document.getElementById("changePassword").value = data.data.parentEmail;
        document.getElementById("invisibleID").value = teacher_ID;
    })
}

function changeTeacherByID() {
    const id = document.getElementById("invisibleID").value;
    console.log(id);
    axios.put('http://localhost:3000/api/admin/teacher/' + id, {
        name: document.getElementById("changeName").value,
        sex: document.getElementById("changeSex").value,
        className: document.getElementById("changeClass").value,
        password: document.getElementById("changePassword").value,
        phoneNumber: document.getElementById("changeNumber").value,
        numStudent: document.getElementById("changeNumStudent").value
    }, {
        headers: { Authorization: 'Bearer ' + localStorage.token }
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