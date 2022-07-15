
const host = 'http://localhost:8082'
axios.get(host + '/getActivities', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (true) {
    console.log(result);
    let activities = result.data.data;
    console.log(localStorage.getItem('classID'));

    let info = " ";
    $.each(activities, function (index, value) {
      info += `
          <tr>
            <td>${convertDateToString(value.activityTime)}</td>
            <td> ${value.activityName}</td>
            <td> ${value.activityContent}</td>    
            <td> ${value.activityNote}</td>                    
                 
          </tr>             
            `;
    });
    $('#information').html(info);
  }
})






function findActivity(id) {
  axios.get("http://localhost:8082/teacher/timeTableInfor", {
    headers: { Authorization: 'Bearer ' + localStorage.token },
    params: { classID: id }
  })  // dien link api vao

    .then((activities) => {
      console.log(activities.data.data);

      let info = " ";
      $.each(activities.data.data, function (index, value) {
        info += `
          <tr>
            <td>   </td>
            <td>  </td>
            <td> </td>                        
            <td></td>
            
            
          </tr>            
           `
      });
      $('#timetableInformation').html(info);
    });
}
findActivity(localStorage.getItem('classID'));

function convertDateToString(date) {
  const d = new Date(date)
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year
}

