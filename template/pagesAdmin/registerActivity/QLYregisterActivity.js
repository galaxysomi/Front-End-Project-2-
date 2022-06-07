var id = location.search.substring(1);
console.log(id);

axios.get('http://localhost:3000/api/admin/activities/registerlist/' + id, {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  console.log(result);
  const students = result.data.students


  let info = " ";
  $.each(students, function (index, value) {
    info += `
        


        <div class="col-lg-4 grid-margin stretch-card">

<div class="card">

  <div class="card-body">                    

         
        <br>Học Sinh: ${value.name}</br>
        <br>Phụ Huynh: ${value.parent.name}</br>
        <br>Lớp: ${value.teacher.className}</br>
        <br>Giáo viên chủ nhiệm: ${value.teacher.name}</br>
        

       

  </div>                

</div>              

</div>     
           `;
    console.log(value._id);
  });
  $('#information').html(info);


})