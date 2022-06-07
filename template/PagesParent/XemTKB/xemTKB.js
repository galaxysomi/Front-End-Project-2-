
const host = 'http://localhost:3000'
axios.get(host + '/api/parent/schedule', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (result.data.status === 'ok') {
    console.log(result);
    let activities = result.data.schedule.activityList;
    console.log(activities);
    let info = " ";
    $.each(activities, function (index, value) {
      info += `
          <tr>
            <td>${new Date(value.start).getDate()}/${new Date(value.start).getMonth() + 1}/${new Date(value.start).getFullYear()}  </td>
            <td> ${new Date(value.start).getHours()}:${new Date(value.start).getMinutes()}  - ${new Date(value.end).getHours()}:${new Date(value.end).getMinutes()} </td>
            <td> ${value.content}</td>                        
                 
          </tr>             
            `;
    });
    $('#information').html(info);
  }
})

function getActivityByDate() {
  let activityDate = document.getElementById("activityDate").value;
  axios.get('http://localhost:3000/api/parent/schedule/?date=' + activityDate, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(data => {
    console.log(data)
    if (data.data.status === "ok") {
      let activities = data.data.schedule[0].activityList;
      let info = " ";
      $.each(activities, function (index, value) {
        info += `
          <tr>
          <td>${new Date(value.start).getDate()}/${new Date(value.start).getMonth() + 1}/${new Date(value.start).getFullYear()}  </td>
          <td> ${new Date(value.start).getHours()}:${new Date(value.start).getMinutes()}  - ${new Date(value.end).getHours()}:${new Date(value.end).getMinutes()} </td>
          <td> ${value.content}</td>                       
          </tr>            
           `
      });
      $('#information').html(info);
    } else if(data.data.msg==="cannot find schedule") {
      $('#information').html("");
    }

  })
}




function findActivity() {
  axios.get("http://localhost:3000/api/parent/schedule")  // dien link api vao
    .then((activities) => {
      console.log(activities.data);
      let info = " ";
      $.each(activities.data, function (index, value) {
        info += `
          <tr>
            <td> ${value.date}  </td>
            <td> ${value.timeStart} - ${value.timeFinish} </td>
            <td> ${value.title}</td>                        
            <td> ${value.place}</td>
            
            
          </tr>            
           `
      });
      $('#information').html(info);
    });
}

