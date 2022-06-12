function getActivityById(id) {
  axios.get('http://localhost:8082/getActivities' + id, {
    //headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJzdHVkZW50OndyaXRlIn0seyJhdXRob3JpdHkiOiJzdHVkZW50OnJlYWQifSx7ImF1dGhvcml0eSI6ImNvdXJzZTpyZWFkIn0seyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn0seyJhdXRob3JpdHkiOiJjb3Vyc2U6d3JpdGUifV0sImlhdCI6MTY1NDQwMzg2MSwiZXhwIjoxNjU1MjI2MDAwfQ.OcykgC36hwVb7gRWlnvxdiGqL3Viq6RZog9emJXbRJaKMqpOmGyUl4IVB5j9DKBBEAk91bVywawMnWEXJBsO_w' }
  }).then(data => {
    //document.getElementById("changeDate").value = data.data.date ;
    document.getElementById("updateTitle").value = data.data.activityName;
    document.getElementById("updateDescription").value = data.data.activityContent;
    // document.getElementById("updateTimeStart").value = data.data.timeStart;
    document.getElementById("invisibleID").value = activityID;
    document.getElementById("updateTimeFinish").value = data.data.activityTime;
    document.getElementById("updatePlace").value = data.data.activityNote;

  })
}


function refreshPage() {
  window.location.reload();
}




function findActivity() {
  axios.get("http://localhost:8082/getActivities", {

    headers: { Authorization: localStorage.getItem("token") }
  })  // dien link api vao
    .then((activities) => {
      let info = " ";
      $.each(activities.data.data, function (index, value) {


        info += `
          <tr>
           
            <td> ${value.activityTime}  </td>
            <td> ${value.activityName}</td>  
            <td> ${value.activityContent}</td>                        
            <td> ${value.activityNote}</td>

            <td>
            <button onClick="getActivityById('${value._id}')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeActivity">
            Sửa
          </button>
          <button  onClick="getActivityById('${value._id}')"  type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteActivity">
            Xóa
          </button>
          <button  onClick="thongBao('${value._id}')"  type="button" class="btn btn-success" ">
            Gửi thông báo
          </button>
          <button   type="button" class="btn btn-success" ">
          <a href="../registerActivity/QLYregisterActivity.html?${value._id}"> Xem danh sách</a>
          </button>
          </td>        
          </tr>            
           `;
        console.log(value._id);
      });
      $('#information').html(info);
    });
}

function addMenu() {
  axios.post('http://localhost:3000/api/admin/activities', {
    date: document.getElementById("Date").value,
    description: document.getElementById("description").value,
    title: document.getElementById("title").value,
    timeStart: document.getElementById("timeStart").value,
    timeFinish: document.getElementById("timeFinish").value,
    place: document.getElementById("place").value
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((rs) => {
      if (rs.data.success) {
        alert(rs.data.message);
      } else {
        alert(rs.data.message);
      }
      //refreshPage();               
    })
}

function deleteActivity() {
  const id = document.getElementById("invisibleID").value
  axios.delete('http://localhost:3000/api/admin/activities/' + id, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((rs) => {
      console.log(rs);
      if (rs.data.success) {
        alert(rs.data.message)
        refreshPage()
      } else {
        alert(rs.data.message)
        refreshPage()
      }
    })
}

// $(document).ready(function () {
//   findActivity();
//   $('#menuTable').DataTable();
// });

$(document).ready(findActivity());

function changeAcivityByID() {
  const id = document.getElementById("invisibleID").value
  console.log(id);
  axios.put('http://localhost:3000/api/admin/activities/' + id, {
    date: document.getElementById("updateDate").value,
    title: document.getElementById("updateTitle").value,
    description: document.getElementById("updateDescription").value,
    timeStart: document.getElementById("updateTimeStart").value,
    timeFinish: document.getElementById("updateTimeFinish").value,
    place: document.getElementById("updatePlace").value
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((rs) => {
      if (rs.data.success) {
        alert(rs.data.message);
        refreshPage()
      } else {
        alert(rs.data.message)
        refreshPage()
      }
    })
}

// function thongBao(id) {
//   console.log(id);
//   axios.get('http://localhost:8082/api/admin/activities/sendnoti/'+id, {
//     headers: { Authorization: 'Bearer ' + localStorage.token }
//   })
//     .then((rs) => {
//       console.log(rs);
//       if (rs.data.status==="ok") {
//         alert(rs.data.msg);
//       } else {
//         alert(rs.data.msg);
//       }
//       //refreshPage();
//     })
// }