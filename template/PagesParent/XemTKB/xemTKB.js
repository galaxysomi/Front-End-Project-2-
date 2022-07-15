
const host = 'http://localhost:8082'
axios.get(host + '/getActivities', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (true) {

    let activities = result.data.data;
    console.log(localStorage.getItem('classID'));
    console.log(localStorage.getItem('token'));
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






function findActivity() {
  fetch('http://localhost:8082/teacher/timeTableInfor?classID=' + localStorage.getItem('classID'), {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(res => res.json()).then(result => {
    let info = " ";

    info += `
            <tr>
              <td> ${result.data[0].dayOfTheWeek} </td>
              <td> ${result.data[0].subject} </td>
            </tr>            
             `

    $('#timetableInformation').html(info);
  })
  //console.log(data);
  // axios.get("http://localhost:8082/teacher/timeTableInfor", {
  //   headers: { Authorization: 'Bearer ' + localStorage.token },
  // })  // dien link api vao

  //   .then((activities) => {
  //     console.log(activities);

  //     let info = " ";
  //     $.each(activities.data, function (index, value) {
  //       info += `
  //         <tr>
  //           <td>  </td>
  //           <td>  </td>
  //           <td> </td>                        
  //           <td></td>


  //         </tr>            
  //          `
  //     });
  //     $('#timetableInformation').html(info);
  // }).then(data => console.log(data));
}


function convertDateToString(date) {
  const d = new Date(date)
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year
}

