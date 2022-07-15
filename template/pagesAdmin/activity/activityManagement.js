function getActivityById(id) {
  axios.get('http://localhost:8082/getActivity', {
    headers: { Authorization: localStorage.getItem("token") },
    params: { activityID: id }
  }).then(data => {
    console.log(data.data.data);
    document.getElementById("changeActivityTime").value = convertDateToString(data.data.data.activityTime);
    document.getElementById("changeActivityName").value = data.data.data.activityName;
    document.getElementById("changeActivityNote").value = data.data.data.activityNote;
    document.getElementById("changeActivityContent").value = data.data.data.activityContent;
    document.getElementById("invisibleID").value = data.data.data.activityID;


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
           
            <td> ${convertDateToString(value.activityTime)}  </td>
            <td> ${value.activityName}</td>  
            <td> ${value.activityContent}</td>                        
            <td> ${value.activityNote}</td>

            <td>
            <button onClick="getActivityById('${value.activityID}')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeActivity">
            Sửa
          </button>
          <button  onClick="deleteActivityOnClick('${value.activityID}')"  type="button" class="btn btn-danger"  data-target="#deleteActivity">
            Xóa
          </button>
            
          </td>        
          </tr>            
           `;

      });
      $('#information').html(info);
    });
}

function addActivity() {
  axios.post('http://localhost:8082/addNewActivity/', {
    // date: document.getElementById("Date").value,
    activityName: document.getElementById("activityName").value,
    activityTime: document.getElementById("activityTime").value,
    activityContent: document.getElementById("activityContent").value,
    activityNote: document.getElementById("activityNote").value,

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
  console.log(document.getElementById("activityNote").value);
}

function deleteActivity(id) {
  // const id = document.getElementById("invisibleID").value
  axios.delete('http://localhost:8082/deleteActivity/', {
    headers: { Authorization: localStorage.getItem("token") },
    params: { activityID: id }
  })
    .then((rs) => {

      if (rs.data.success) {
        alert(rs.data.message)
        refreshPage()
      } else {
        alert(rs.data.message)
        refreshPage()
      }
    })

}
function deleteActivityOnClick(id) {
  if (confirm("Bạn có chắc chắn muốn xóa hoạt động này không?")) {
    deleteActivity(id);
  }
}

// $(document).ready(function () {
//   findActivity();
//   $('#menuTable').DataTable();
// });

$(document).ready(findActivity());

function changeAcivityByID() {
  const id = document.getElementById("invisibleID").value
  console.log(id);
  axios.post('http://localhost:8082/addNewActivity/' + id, {
    activityName: document.getElementById("changeActivityName").value,
    activityNote: document.getElementById("changeActivityNote").value,
    activityContent: document.getElementById("changeActivityContent").value,
    activityTime: document.getElementById("changeActivityTime").value,

  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((rs) => {
      if (true) {
        alert(rs.data.message);
        refreshPage()
      }
    })
}
function convertDateToString(date) {
  const d = new Date(date)
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year
}

