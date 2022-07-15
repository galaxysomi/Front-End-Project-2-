
async function findStudent() {
  const host = 'http://localhost:8082/'
  let num = 0;
  await axios.get(host + 'student/allStudentInfor', {
    headers: { Authorization: localStorage.getItem("token") },
  }).then(result => {


    let students = result.data.data;
    let info = " ";
    $.each(students, async function (index, value) {
      await getParentByID(value.parentID).then(parent => {

        num++;
        info += `
      <tr>
            <td> ${num}</td>

            <td> ${value.studentName}   </td>
            <td> ${convertDateToString(value.dateOfBirth)}    </td>
            <td>  ${convertGender(value.studentGender)}    </td>
            <td> ${parent.parentName} </td>
            <td> ${convertDateToString(parent.parentDob)}   </td>
            <td> ${parent.parentEmail}    </td>
            <td>   ${convertGender(parent.parentGender)}  </td>

            
            <td>
            <button onClick="getStudentById('${value.studentID}')" style="margin-top: 50px;  margin-bottom: 50px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeStudent">
            Sửa
          </button>
          <button onClick="deleteStudentByID('${value.studentID}')" style="margin-top: 50px;  margin-bottom: 50px;" type="button" class="btn btn-danger">
            Xóa
          </button>
            </td>                                                                  
          </tr>     
      
      
            `;
      })
      $('#information').html(info);
    });


  })
}

$(document).ready(findStudent());

async function getParentByID(id) {
  const res = await axios.get("http://localhost:8082/parent/getParent/", {
    headers: { Authorization: localStorage.getItem("token") },
    params: { parentID: id }
  })
  let data = await res.data.data;
  return data;

}

function getStudentById(id) {

  console.log(id);
  axios.get('http://localhost:8082/student/getStudentInfor', {
    headers: { Authorization: 'Bearer ' + localStorage.token },
    params: { studentID: id }
  }).then(data => {
    console.log(data.data.data);
    document.getElementById("changeStudentName").value = data.data.data.studentName;
    document.getElementById("changeStudentGender").value = data.data.data.dateOfBirth;
    document.getElementById("changeGender").value = convertGender(data.data.data.studentGender);
    document.getElementById("changeStudentBirth").value = convertDateToString(data.data.data.dateOfBirth);
    localStorage.setItem("studentID", data.data.data.studentID);
    localStorage.setItem("parentID", data.data.data.parentID);
  })
}



function refreshPage() {
  window.location.reload();
}


function changeStudentById() {
  axios.put('http://localhost:8082/student/changeStudentInfor', {
    studentID: localStorage.getItem("studentID"),
    studentName: document.getElementById("changeStudentName").value,
    dateOfBirth: document.getElementById("changeStudentBirth").value,
    studentGender: document.getElementById("changeStudentGender").value,
    classID: document.getElementById("changeClass").value,
    parentID: localStorage.getItem("parentID"),
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(rs => {
    if (true) {
      alert(rs.data.msg);
      refreshPage()
    }

  })
}
function addNewStudent() {

  axios.post("http://localhost:8082/student/addNewStudent", {
    studentName: document.getElementById("studentName").value,
    classID: document.getElementById("classID").value,
    dateOfBirth: document.getElementById("dateOfBirth").value,
    studentGender: document.getElementById("studentGender").value,
    parentName: document.getElementById("parentName").value,
    parentDob: document.getElementById("parentDob").value,
    parentAddress: document.getElementById("parentAddress").value,
    parentEmail: document.getElementById("parentEmail").value,
    parentGender: document.getElementById("parentGender").value
  },
    {
      headers: { Authorization: localStorage.getItem("token") },

    }).then((rs) => {
      if (true) {
        alert(rs.data.message);
        refreshPage();
      } else {
        alert(rs.data.message);
      }
    })
}

function sendStudent(sInfo, pInfo) {
  axios.post('http://localhost:3000/api/teacher/student/', {
    sInfo: sInfo,
    pInfo: pInfo
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(rs => {
    if (rs.data.status == 'ok') {
      alert(rs.data.msg);
      refreshPage()
    } else {
      alert(rs.data.msg);
      refreshPage()
    }
  })
}



function deleteStudentByID(id) {
  axios.delete('http://localhost:8082/student/deleteStudent', {
    headers: { Authorization: 'Bearer ' + localStorage.token },
    params: { studentID: id }
  }).then(rs => {
    if (true) {
      alert("Xoá học sinh thành công !")
      refreshPage()
    }
  })
}
console.log(localStorage.getItem("token"));
function clearFieldAdd() {
  document.getElementById("name").value = ''
  document.getElementById("sex").value = ''
  document.getElementById("nameParent").value = ''
  document.getElementById("sexParent").value = ''
  document.getElementById("address").value = ''
  document.getElementById("phoneNumber").value = ''
  document.getElementById("username").value = ''
  document.getElementById("password").value = ''

}

function convertDateToString(date) {
  const d = new Date(date)
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year
}
function convertGender(gender) {
  if (gender == 0) return "Nam";
  else return "Nữ";
}