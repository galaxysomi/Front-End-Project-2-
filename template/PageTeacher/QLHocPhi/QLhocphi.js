const host = 'http://localhost:3000'
axios.get(host + '/api/teacher/tuition', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (result.data.status === 'ok') {
    console.log(result);
    let tuition = " ";
    $.each(result.data.tuitions, function (index, value) {
      const totalTuition = value.baseTuition + value.late1 * 0.01 + value.late2 * 0.05 - value.validAbsence * 0.05;
      tuition += `
          <tr>
            <td>${new Date(value.date).getMonth() + 1} </td> 
            <td> ${value.student.name} </td> 
            <td> ${totalTuition}</td> 
            <td> ${value.validAbsence} </td> 
            <td> ${value.invalidAbsence} </td>
            <td> ${value.late1} </td> 
            <td> ${value.late2} </td> 
                  
    
          </tr>
            
            `;

    });
    $('#tuitionTable').html(tuition);
  }
})

function getTuitionByDate() {
  let date = document.getElementById("date").value;
  const host = 'http://localhost:3000'
  axios.get(host + '/api/teacher/tuition?time=' + date, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(result => {
    if (result.data.status === 'ok') {
      console.log(result);
      let tuition = " ";
      $.each(result.data.tuitions, function (index, value) {
        const totalTuition = value.baseTuition + value.late1 * 0.01 + value.late2 * 0.05 - value.validAbsence * 0.05;
        tuition += `
          <tr>
            <td>${new Date(value.date).getMonth() + 1} </td> 
            <td> ${value.student.name} </td> 
            <td> ${totalTuition}</td> 
            <td> ${value.validAbsence} </td> 
            <td> ${value.invalidAbsence} </td>
            <td> ${value.late1} </td> 
            <td> ${value.late2} </td> 
          </tr>
            
            `;

      });
      $('#tuitionTable').html(tuition);
    } else {
      $('#tuitionTable').html("")
    }
  })

}

function thongBaoHocPhi() {
  const host = 'http://localhost:3000'
  axios.get(host + '/api/teacher/tuition/sendnoti', {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(result => {
    
    console.log(result);
    alert(result.data.msg)
  }


  )

}

function capNhatHocPhi() {
  const host = 'http://localhost:3000'
  axios.get(host + '/api/teacher/tuition/update/fake', {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(result => {
    console.log(result);
    alert(result.data.msg)
  }
  )

}