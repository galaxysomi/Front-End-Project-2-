

async function findActivity() {
  console.log("find activity");
  console.log(localStorage.getItem("token"));
  await axios.get('http://localhost:8082/admin/getAllTimeTable', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  }).then(result => {
    {

      // document.getElementById("invisibleID").value = result.data.schedules[0]._id;

      let activities = result.data.data;

      let info = " ";
      $.each(activities, async function (index, value) {
        await getClassbyId(value.classID).then(data => {
          info += `
          <tr>            
          <td> Thứ ${value.dayOfTheWeek} </td>
          <td> ${value.subject}</td>     
          <td> ${data.className} </td>
          <td>
          <button onClick="getTimeTableByID('${value.timeTableID}')" style="margin-top: 50px;  margin-bottom: 50px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeTimeTable">
            Sửa
          </button>
          <button type="button" onclick="deleteTimeTable('${value.timeTableID}')" class="btn btn-danger" >
            Xóa
          </button>
          </td>                             
        </tr>            
             `

            ;
        })
        $('#information').html(info);
      })
    }
  })
}

function getTimeTableByID(id) {
  axios.get('http://localhost:8082/teacher/timeTableInfor', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    params: {
      classID: id
    }
  }).then(result => {
    if (result.data.status == "ok") {
      document.getElementById("invisibleID").value = result.data.data.timeTableID;
      document.getElementById("changeClass").value = result.data.data.date;
      document.getElementById("changeDay").value = result.data.data.start;
      document.getElementById("changeSubject").value = result.data.data.end;
    }
  })
}

function changeTimeTable(id) {
  axios.put('http://localhost:8082/teacher/changeTimeTable', {
    classID: document.getElementById("Class").value,
    dayOfTheWeek: document.getElementById("Day").value,
    subject: document.getElementById("Subject").value
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },

  }).then(result => {
    if (true) {
      alert("Sửa thời khoá biểu thành công");
      refreshPage();
    }
  })
}


function deleteTimeTable(timeTableID) {
  axios.delete('http://localhost:8082/teacher/deleteTimeTable', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    params: {
      timeTableID: timeTableID
    }
  }).then(result => {
    if (true) {
      alert("Xoá thời khoá biểu thành công");
      refreshPage();
    }
  })
}

function refreshPage() {
  window.location.reload();
}

async function getClassbyId(id) {
  const res = await axios.get('http://localhost:8082/getClass/', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    params: { classID: id }
  })
  let data = await res.data.data;
  return data;
}



$(document).ready(findActivity());