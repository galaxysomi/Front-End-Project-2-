function findParents() {
  axios.get("http://localhost:8082/admin/getAllParents", {
    headers: { Authorization: localStorage.getItem("token") }
  })  // dien link api vao
    .then((parents) => {
      console.log(parents);
      let info = " ";
      $.each(parents.data.data, function (index, value) {
        info += `
          <tr>
            <td> ${index + 1} </td>
            <td> ${value.parentName} </td>
            <td> ${convertGender(value.parentGender)}</td>
            <td> ${convertDateToString(value.parentDob)}</td>
            <td> ${value.parentEmail}</td>
            <td> ${value.parentAddress}</td>
                                           
          </tr>            
           `
      });
      $('#information').html(info);
    });
}

$(document).ready(findParents());

function convertDateToString(date) {
  const d = new Date(date)
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year
}
function convertGender(gender) {
  if (gender == "0") return "Nam";
  else return "Nữ";
}

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

function getParentsById(id) {
  axios.get('http://localhost:8082/admin/getAllParents' + id, {
    headers: { Authorization: localStorage.getItem("token") }
  }).then(data => {
    document.getElementById("changeName").value = data.data.parent_name;
    // document.getElementById("changeAge").value 
    document.getElementById("changeSex").value = data.data.parent_age;
    document.getElementById("changeClass").value = data.data.subject;
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