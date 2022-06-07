const host = 'http://localhost:3000'
axios.get(host + '/api/parent/mail', {
  headers: { Authorization: 'Bearer ' + localStorage.token }
}).then(result => {
  if (result.data.status === 'ok') {
    console.log(result);
    
    let info = " ";
    $.each(result.data.mails, function (index, value) {
      console.log(value.content);
      info += `
      <div class="col-lg-3 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">                    
              <p class="card-title">
                  <b> ${value.title}   </b>                               
              </p>                         
              <p>${new Date(value.date).getDate()}/${new Date(value.date).getMonth()+1}/${new Date(value.date).getFullYear()}</p>
              <a href ="./chitiet.html?${value._id}" >                           
                    Xem chi tiết
                  </a>  
          </div>                
      </div>               
  </div>       
            
            `;

    });
    $('#information').html(info);
  }
})


