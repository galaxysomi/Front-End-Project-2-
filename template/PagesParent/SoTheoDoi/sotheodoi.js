

const host = 'http://localhost:3000'
axios.get(host + '/api/parent/logbook', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (result.data.status === 'ok') {
    const logbooks = result.data.logBooks ;
    console.log(result.data); 
    let info = " ";
          $.each(logbooks, function (index, value) {
            let trongMuon ;
            if(value.lookAfterLate1 == 0 && value.lookAfterLate2 ==0){
              trongMuon = "Không";
            }
            else if (value.lookAfterLate1 ==1){
              trongMuon = "Từ 5h30 đến 6h30"
            }
            else if(value.lookAfterLate2 ==1){
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
                        <th>${value.student.name}</th>                       
                      </tr>
                    </thead>
                    <tbody>                     
                      <tr>
                        <td>Ngày</td>
                        <td>${new Date(value.date).getDate()}/${new Date(value.date).getMonth()+1}/${new Date(value.date).getFullYear()}</td>                                                     
                      </tr>
                      <tr>
                        <td>Trông muộn</td>
                        <td> ${trongMuon} </td>                                                     
                      </tr>
                      <tr>
                        <td>Nhận xét</td>
                        <td>${value.comment}</td>                                                     
                      </tr>                                  
                      <tr>
                        <td>Trạng thái</td>`;
                        if(value.lateForSchool1 == 0 && value.lateForSchool2 ==0){
              info += `
              <td><label class="badge badge-success" id="statusText">Đi học</label></td>           
             `
            }
            else if(value.lateForSchool1 == 1){
              info += `
              <td><label class="badge badge-primary" id="statusText">Nghỉ có phép</label></td>              
             `
            }
            else if(value.lateForSchool2 == 1){
              info += `
              <td><label class="badge badge-primary" id="statusText">Nghỉ không phép</label></td>              
             `
            }          
            info += `                          
                      </tr>
                                                                                                                          
                    </tbody>
                  </table>                
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
                <img id="anhDiemDanh" src="${value.attendancePicture}" alt="">                                       
                </div>
              </div>
            </div>
          </div>         
             `
             
          });         
          $('#information').html(info);
  }
})


        
function getSoTheoDoiByDate() {
  let date = document.getElementById("date").value;
  let url = 'http://localhost:3000/api/parent/logbook/'+"?date="+date;
  console.log(url);
  axios.get(url,{   
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
  .then((rs) => {      
    console.log(rs.data);
    if(rs.data.status== "ok"){
        const logbook = rs.data.logBook;
        
        let info = " ";         
            let trongMuon ;
            if(logbook.lookAfterLate1 == 0 && logbook.lookAfterLate2 ==0){
              trongMuon = "Không";
            }
            else if (logbook.lookAfterLate1 ==1){
              trongMuon = "Từ 5h30 đến 6h30"
            }
            else if(logbook.lookAfterLate2 ==1){
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
                        <th> ${logbook.student.name} </th>
                        <th></th>                       
                      </tr>
                    </thead>
                    <tbody>                     
                      <tr>
                        <td>Ngày</td>
                        <td>${new Date(logbook.date).getDate()}/${new Date(logbook.date).getMonth()+1}/${new Date(logbook.date).getFullYear()}</td>                                                     
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
                        if(logbook.lateForSchool1 == 0 && logbook.lateForSchool2 ==0){
              info += `
              <td><label class="badge badge-success" id="statusText">Đi học</label></td>           
             `
            }
            else if(logbook.lateForSchool1 == 1){
              info += `
              <td><label class="badge badge-primary" id="statusText">Nghỉ có phép</label></td>              
             `
            }
            else if(logbook.lateForSchool2 == 1){
              info += `
              <td><label class="badge badge-primary" id="statusText">Nghỉ không phép</label></td>              
             `
            }          
            info += `                          
                      </tr>
                                                                                                                          
                    </tbody>
                  </table>                
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
             
          ;         
          $('#information').html(info);
        
        
    }else{
        alert(rs.data.msg)
        
  }
})
}
     

     