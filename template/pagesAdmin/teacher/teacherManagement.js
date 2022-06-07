function findTeacher() {
  axios.get("http://localhost:8082/teacher/teacherInfor", {
    headers: { Authorization: localStorage.getItem("token") }
  })  // dien link api vao
    .then((teacher) => {
      console.log(teacher);
      let info = " ";
      $.each(teacher.data.data, function (index, value) {
        info += `
          <tr>
            <td> ${index + 1} </td>
            <td> ${value.teacher_name} </td>
            <td> ${value.teacher_age}</td>
            <td> ${value.teacher_address}</td>
            <td> ${value.subject}</td>
            <td> ${value.numStudent}</td>
            <td>
            <button onClick="getTeacherById('${value._id}')" style="margin-top: 20px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeTeacher">
            Sửa
            </button>
            <button type="button" onClick = "deleteTeacher('${value._id}')"style="margin-top: 20px;" type="button" class="btn btn-danger">Xóa</button>  
            </td>                                
          </tr>            
           `
      });
      $('#information').html(info);
    });
}

$(document).ready(findTeacher());


function refreshPage() {
  window.location.reload();
}


function addTeacher() {
  axios.post('http://localhost:3000/api/admin/teacher', {
    name: document.getElementById("name").value,
    birth: document.getElementById("birth").value,
    sex: document.getElementById("sex").value,
    username: document.getElementById("uername").value,
    password: document.getElementById("password").value,
    password2: document.getElementById("password2").value,
    className: document.getElementById("className").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    numStudent: document.getElementById("numStudent").value,
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

function deleteTeacher(id) {
  axios.delete('http://localhost:3000/api/admin/teacher/' + id, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
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
  axios.get('http://localhost:8082/teacher/teacherInfor' + id, {
    // headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(data => {
    document.getElementById("changeName").value = data.data.teacher_name;
    // document.getElementById("changeAge").value 
    document.getElementById("changeSex").value = data.data.teacher_age;
    document.getElementById("changeClass").value = data.data.subject;
    document.getElementById("changeNumber").value = data.data.teacher_address;
    document.getElementById("changeNumStudent").value = data.data.numStudent;
    document.getElementById("changePassword").value = data.data.password;
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