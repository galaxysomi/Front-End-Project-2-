
axios.get('http://localhost:8082/parent/getChildStudentInfor', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (true) {
    console.log(result.data.data);
    let dataStudent = result.data.data
    let infoStudent = " ";
    localStorage.setItem('parentID', dataStudent.parentID);
    localStorage.setItem('studentName', dataStudent.studentName);
    localStorage.setItem('classID', dataStudent.classID);



    infoStudent += `
    
    <div class="content-wrapper">

      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                class="rounded-circle img-fluid" style="width: 150px;">
              <h5 class="my-3">${dataStudent.studentName}</h5>
                

            </div>
          </div>
          <div >
            <div class="card-body p-0">
              <ul class="list-group list-group-flush rounded-3">

              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-1">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Họ tên học sinh :</p>

                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">${dataStudent.studentName}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Ngày sinh :</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">${convertDateToString(dataStudent.dateOfBirth)}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Giới tính</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">${convertGender(dataStudent.studentGender)}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Lớp học :</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Lớp lá</p>
                </div>
              </div>
              <hr>
            
              
            </div>
          </div>


        </div>
        <!-- content-wrapper ends -->

        <!-- partial -->
                                                     
                 `
    $('#studentInformation').html(infoStudent);




  }
})

axios.get('http://localhost:8082/parent/getParent', {
  headers: { Authorization: 'Bearer ' + localStorage.token },
  params: { parentID: localStorage.getItem('parentID') }
}).then(result => {
  if (true) {

    console.log(result.data.data)
    let dataParent = result.data.data
    let infoParent = " ";



    infoParent += `
    
    

    <div class="content-wrapper">

    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;">
            <h5 class="my-3">${dataParent.parentName}</h5>
              

          </div>
        </div>
        <div >
          <div class="card-body p-0">
            <ul class="list-group list-group-flush rounded-3">

            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-1">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Họ tên phụ huynh :</p>

              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0"> ${dataParent.parentName}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Ngày sinh : </p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">${convertDateToString(dataParent.parentDob)}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Giới tính</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">${convertGender(dataParent.parentGender)}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Địa chỉ :</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">${dataParent.parentAddress}</p>
              </div>
            </div>
            <hr>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">${dataParent.parentEmail}</p>
              </div>
            </div>
            <hr>
          
            
          </div>
        </div>


      </div>
      <!-- content-wrapper ends -->

      <!-- partial -->
                                                     
                 `
    $('#parentInformation').html(infoParent);




  }
})


function convertDateToString(date) {
  const d = new Date(date)
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year
}
function convertGender(gender) {
  if (gender == "0") return "Nam";
  else return "Nữ";
}
function getToken() {
  console.log(localStorage.getItem('token'));
}






