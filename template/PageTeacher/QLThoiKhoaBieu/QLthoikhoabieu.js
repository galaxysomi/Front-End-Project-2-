function findActivity() {
const host = 'http://localhost:3000'
axios.get(host + '/api/teacher/schedule', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (result.data.status === 'ok') {
     console.log(result.data.schedules[0]);
    document.getElementById("invisibleID").value = result.data.schedules[0]._id;
    // console.log(document.getElementById("invisibleID").value);
    let activities = result.data.schedules[0].activityList;
    let info = " ";
    $.each(activities, function (index, value) {
      //const time = value.start.slice(12,16)
      console.log(value.start)
      info += `
          <tr>            
          <td> ${new Date(value.start).getDate()}/${new Date(value.start).getMonth() + 1}/${new Date(value.start).getFullYear()} </td>
          <td> ${value.start.slice(12,16)} </td>
               
          <td> ${value.content} </td>
          <td>
          <button type="button" onclick="deleteActivity('${result.data.schedules[0]._id}','${value._id}')" class="btn btn-danger" >
            Xóa
          </button>
          </td>                             
        </tr>            
             `

    });
    $('#information').html(info);
  }
})
}


function addActivity() {
 
  axios.post('http://localhost:3000/api/teacher/activity', {
    
    date: document.getElementById("date").value,
    newActivity: {
      start: document.getElementById("start").value,
      end: document.getElementById("end").value,
      content: document.getElementById("content").value
    }
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((rs) => {
      console.log(rs);
      if (rs.data.status =="ok") {
        alert(rs.data.msg);
      } else {
        alert(rs.data.msg);
      }
      findActivityByDate();
    })
}


function deleteActivity(scheduleId , activityId) {
  axios.delete('http://localhost:3000/api/teacher/activity',{
    headers: 
    { Authorization: 'Bearer ' + localStorage.token 
    },
    data:{
    scheduleId : scheduleId ,
    activityId : activityId
  }})
    .then((rs) => {
      console.log(rs);
      if (rs.data.status == "ok") {
        alert("Xóa thành công")
        // window.location.reload();
        findActivityByDate();

      }
    })
}


function findActivityByDate() {
  const date = document.getElementById("date").value ;
  const host = 'http://localhost:3000'
  axios.get(host + '/api/teacher/schedule/?date='+date, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(result => {
    if (result.data.status === 'ok') {
      console.log(result);
      // console.log(result.data.schedules[0]);
      document.getElementById("invisibleID").value = result.data.schedules[0]._id;
      // console.log(document.getElementById("invisibleID").value);
      let schedules = result.data.schedules[0].activityList;
      let info = " ";
      $.each(schedules, function (index, value) {
        info += `
          <tr>            
          <td> ${new Date(value.start).getDate()}/${new Date(value.start).getMonth() + 1}/${new Date(value.start).getFullYear()} </td>
          <td> ${value.start.slice(11,16)} - ${value.end.slice(11,16)} </td>           
          <td> ${value.content} </td>
          <td>
          <button    type="button" onclick="deleteActivity('${result.data.schedules[0]._id}','${value._id}')" class="btn btn-danger" data-toggle="modal" data-target="#deleteActivity">
            Xóa
          </button>
          </td>                          
        </tr>                     
             `
      });
      $('#information').html(info);
    } else if(result.data.msg==="cannot find any schedule with this teacher and date") {
      $('#information').html("")
    }
  })
}

$( document ).ready(function() {
  console.log( "ready!" );
});