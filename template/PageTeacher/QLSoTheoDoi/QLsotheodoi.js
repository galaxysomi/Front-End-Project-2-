
const host = 'http://localhost:3000'
axios.get(host + '/api/teacher/logbook', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (result.data.status === 'ok') {
    console.log(result);
    let logbooks = result.data.logBooks;
    let info = " ";
    console.log(logbooks);
    $.each(logbooks, function (index, logbook) {
      console.log(logbook.student)
      let trongMuon;
      if (logbook.lookAfterLate1 == 0 && logbook.lookAfterLate2 == 0) {
        trongMuon = "Không";
      }
      else if (logbook.lookAfterLate1 == 1) {
        trongMuon = "Từ 5h30 đến 6h30"
      }
      else if (logbook.lookAfterLate2 == 1) {
        trongMuon = "Sau 6h30"
      }
      info += `
            <div class="col-lg-8 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Sổ theo dõi</h4>
                                  
                </p>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Tên học sinh</th>
                        <th>${logbook.student.name}</th>                       
                      </tr>
                    </thead>
                    <tbody>                     
                      <tr>
                        <td>Ngày</td>
                        <td>${new Date(logbook.date).getDate()}/${new Date(logbook.date).getMonth() + 1}/${new Date(logbook.date).getFullYear()}</td>                                                     
                      </tr>
                      <tr>
                        <td>Trông muộn</td>
                        <td> ${trongMuon} </td>                                                     
                      </tr>
                      <tr>
                        <td>Nhận xét</td>
                        <td>${logbook.comment}</td>                                                     
                      </tr>                                  
                      <tr>
                        <td>Trạng thái</td>`;
      if (logbook.lateForSchool1 == 0 && logbook.lateForSchool2 == 0) {
        info += `
              <td><label class="badge badge-success" id="statusText">Đi học</label></td>           
             `
      }
      else if (logbook.lateForSchool1 == 1) {
        info += `
              <td><label class="badge badge-primary" id="statusText">Nghỉ có phép</label></td>              
             `
      }
      else if (logbook.lateForSchool2 == 1) {
        info += `
              <td><label class="badge badge-primary" id="statusText">Nghỉ không phép</label></td>              
             `
      }
      info += `                          
                      </tr>
                                                                                                                          
                    </tbody>
                    
                  </table>
                  <button  onclick="setID('${logbook.student._id}')" style="margin-top: 20px;" type="button" class="btn btn-success" data-toggle="modal" data-target="#addsotheodoi">
                  Thêm mới
                </button>   
                  
                  <button onClick="setID('${logbook._id}')" style="margin-top: 20px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changesotheodoi">
              Sửa
            </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Ảnh điểm danh</h4>                  
                </p>
                <div class="table-responsive" style="position: absolute;">
                  <img id="anhDiemDanh" src="${logbook.attendancePicture}" alt="">                                                   
                </div>
              </div>
            </div>
          </div>         
             `
            
    });
    $('#information').html(info);

  }
})

function setID(id) {
  document.getElementById("invisibleID").value = id ;  
}


function getSoTheoDoiByDate() {
  console.log("123");
  let date = document.getElementById("dateToGet").value;
  axios.get('http://localhost:3000/api/teacher/logbook/?date=' + date, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(rs => {
    console.log(rs);
    if (rs.data.status == "ok") {
      alert(rs.data.msg);
      const logbooks = rs.data.logBooks;

      let info = " ";
      $.each(logbooks, function (index, logbook) {
        let trongMuon;
        if (logbook.lookAfterLate1 == 0 && logbook.lookAfterLate2 == 0) {
          trongMuon = "Không";
        }
        else if (logbook.lookAfterLate1 == 1) {
          trongMuon = "Từ 5h30 đến 6h30"
        }
        else if (logbook.lookAfterLate2 == 1) {
          trongMuon = "Sau 6h30"
        }
        info += `
              <div class="col-lg-8 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Sổ theo dõi</h4>
                                    
                  </p>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Tên học sinh</th>
                          <th>${logbook.student.name}</th>                       
                        </tr>
                      </thead>
                      <tbody>                     
                        <tr>
                          <td>Ngày</td>
                          <td>${new Date(logbook.date).getDate()}/${new Date(logbook.date).getMonth() + 1}/${new Date(logbook.date).getFullYear()}</td>                                                     
                        </tr>
                        <tr>
                          <td>Trông muộn</td>
                          <td> ${trongMuon} </td>                                                     
                        </tr>
                        <tr>
                          <td>Nhận xét</td>
                          <td>${logbook.comment}</td>                                                     
                        </tr>                                  
                        <tr>
                          <td>Trạng thái</td>`;
        if (logbook.lateForSchool1 == 0 && logbook.lateForSchool2 == 0) {
          info += `
                <td><label class="badge badge-success" id="statusText">Đi học</label></td>           
               `
        }
        else if (logbook.lateForSchool1 == 1) {
          info += `
                <td><label class="badge badge-primary" id="statusText">Nghỉ có phép</label></td>              
               `
        }
        else if (logbook.lateForSchool2 == 1) {
          info += `
                <td><label class="badge badge-primary" id="statusText">Nghỉ không phép</label></td>              
               `
        }
        info += `                          
                        </tr>
                        
                                                                                                                            
                      </tbody>
                      
                    </table>
                    <button onclick="setID('${logbook.student._id}')"style="margin-top: 20px;" type="button" class="btn btn-success" data-toggle="modal" data-target="#addsotheodoi">
                    Thêm mới
                  </button>   
                    <button onClick="setID('${logbook._id}')" style="margin-top: 20px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changesotheodoi">
              Sửa
            </button>
                     
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Ảnh điểm danh</h4>                  
                  </p>
                  <div class="table-responsive" style="position: absolute;">
                    <img id="anhDiemDanh" src="${logbook.attendancePicture}" alt="">                                                                  
                  </div>
                </div>
              </div>
            </div>         
               `

      });
      $('#information').html(info);

    }
  })
}

function addSoTheoDoi() {
  let id = document.getElementById("invisibleID").value ;
  console.log(id);
  let date = new Date();
  var formData = new FormData();
  var imagefile = document.querySelector('#file');
  formData.append("file", imagefile.files[0]);
  axios.post("https://api.bandeck.com/v1/user/storage/upload?access_token=w4fCq2xrZsKYwpLCm2zCmMKUbMKWaW3CmmjDhmhuwpxuwp1waWrDhcKUwpfCmcKdwpQ=&name=" + date, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    console.log(response);
    sendSoTheoDoi({
      student: id,
      attendancePicture: "https://cdn.bandeck.com/" + response?.data.data.id,
      comment: document.getElementById("comment").value ,
      status: document.getElementById("status").value ,
      lookAfterLate: document.getElementById("trongMuon").value 
    }).then((result) => {
      if (result.status === "success") {
        alert("Adding successful")
      } else {
        alert(result?.msg)
      };

    })
  })
}

function sendSoTheoDoi(logbook) {
  axios.post('http://localhost:3000/api/teacher/logbook',{
    logbook: logbook  
  },{
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(rs =>{
    console.log(rs);
  })
}


function changeSoTheoDoi() {
  let id = document.getElementById("invisibleID").value ;
  console.log(id);
  let date = new Date();
  var formData = new FormData();
  var imagefile = document.querySelector('#changeFile');
  formData.append("file", imagefile.files[0]);
  axios.post("https://api.bandeck.com/v1/user/storage/upload?access_token=w4fCq2xrZsKYwpLCm2zCmMKUbMKWaW3CmmjDhmhuwpxuwp1waWrDhcKUwpfCmcKdwpQ=&name=" + date, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    console.log(response);
    putSoTheoDoi(id,{
      attendancePicture: "https://cdn.bandeck.com/" + response?.data.data.id,
      comment: document.getElementById("changeComment").value ,
      status: document.getElementById("changeStatus").value ,
      lookAfterLate: document.getElementById("changeTrongMuon").value 
    }).then((result) => {
      console.log(result);
      if (result.data.status === "ok") {
        alert("Change successful")
      } else {
        alert(result?.msg)
      };
    })
  })
}

function putSoTheoDoi(id,logbook) {
  axios.put('http://localhost:3000/api/teacher/logbook/'+id,{
    logbook: logbook  
  },{
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(rs =>{
    console.log(rs);
  })
}

