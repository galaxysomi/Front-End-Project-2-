const host = 'http://localhost:3000'
axios.get(host + '/api/parent/tuition', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (result.data.status === 'ok') {
    console.log(result.data);
    let tuition = " ";
        $.each(result.data.tuitions, function (index, value) {
          const totalTuition = value.baseTuition + value.late1 * 0.01 + value.late2 * 0.05 - value.validAbsence * 0.05 ;
          console.log(totalTuition);
          tuition += `
          <tr>
            <td>${new Date(value.date).getMonth()+1} </td> 
            <td> ${value.student.name} </td> 
            
            <td> ${value.validAbsence} </td> 
            <td> ${value.invalidAbsence} </td>
            <td> ${value.late1} </td> 
            <td> ${value.late2} </td> 
            <td> ${totalTuition}$</td> 
            `;
                      
           
                         
        });
        $('#tuitionTable').html(tuition);
  }
})

        
function getTuitionByMonth() {
  console.log('dcmmmmmmm')
  let month = document.getElementById("tuitionMonth").value;
  console.log(month)
  let url = 'http://localhost:3000/api/parent/tuition/'+"?time="+month;
  console.log(url);
  axios.get(url,{   
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
  .then((rs) => {      
    console.log(rs.data);
    if(rs.data.status== "ok"){
        alert(rs.data.msg);
        const hocphi = rs.data.tuitions[0];
        console.log(hocphi);              
        let tuition = " ";
     
          const totalTuition = hocphi.baseTuition + hocphi.late1 * 0.01 + hocphi.late2 * 0.05 - hocphi.validAbsence * 0.05 ;
          
          tuition += `
          <tr>
            <td>${new Date(hocphi.date).getMonth()+1} </td> 
            <td> ${hocphi.student.name} </td> 
            <td> ${totalTuition}$</td> 
            <td> ${hocphi.validAbsence} </td> 
            <td> ${hocphi.invalidAbsence} </td>
            <td> ${hocphi.late1} </td> 
            <td> ${hocphi.late2} </td> 
            
            `;
          // if(hocphi.paid == 'Đã nộp'){
          //   tuition += `
          //   <td><label class="badge badge-success">${hocphi.paid}</label></td>
          //   </tr>              
          //  `
          // }
          // if(hocphi.paid == 'Chưa nộp'){
          //   tuition += `
          //   <td><label class="badge badge-danger">${hocphi.paid}</label></td>
          //   </tr>              
          //  `
          // }                  
        $('#tuitionTable').html(tuition);  
        
    }else{
        alert(rs.data.msg)
        
  }
})
}
     