function getMenuById(id) {
  axios.get('http://localhost:8082/foodMenu/getMenuFoodByID', {
    headers: { Authorization: localStorage.getItem("token") },
    params: { foodMenuID: id }

  }).then(data => {
    console.log(data);
    //document.getElementById("changeDate").value = data.data.date ;
    document.getElementById("changeMonChinh").value = data.data.breakfastFoodList;
    document.getElementById("changeMonDiemTam").value = data.data.lunchFoodList;
    document.getElementById("changeQuaChieu").value = data.data.dinnerFoodList;
    document.getElementById("invisibleID").value = data.data.foodMenuID;


  })
}

function findMenu() {
  let timeStart = document.getElementById("timeStart").value;
  let timeEnd = document.getElementById("timeEnd").value;
  axios.get('http://localhost:8082/foodMenu/getFoodMenu/', {
    headers: { Authorization: localStorage.getItem("token") },
    params: {
      timeStart: timeStart,
      timeEnd: timeEnd
    },
  })  // dien link api vao
    .then((foods) => {
      console.log(foods);
      let info = " ";
      $.each(foods.data.data, function (index, value) {
        info += `
            <tr>            
              <td> ${value.dateFood}</td>            
              <td> ${value.breakfastFoodList} </td>
              <td> ${value.lunchFoodList} </td>                        
              <td> ${value.dinnerFoodList}</td>               
              <td>
                      <button onClick = " getMenuById('${value.foodMenuID}')"  
                      style="margin-top: 20px;" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteActivity">
                        Xóa
                      </button>  
              </td>            
            </tr>            
             `
      });
      $('#information').html(info);
    });
}
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

$(document).ready(function () {
  findMenu();
});

function deleteMenu() {
  const id = document.getElementById("invisibleID").value
  axios.delete('http://localhost:8082/foodMenu/deleteFoodMenu', {
    headers: { Authorization: localStorage.getItem("token") },
    params: { foodMenuID: id }
  })
    .then((rs) => {
      console.log(rs);
      if (rs.data.success) {
        alert("Xóa menu thành công")
        refreshPage();
      }
    })
}

function addMenu() {
  axios.post('http://localhost:3000/api/admin/foodmenu/add', {
    date: document.getElementById("date").value,
    monChinh: document.getElementById("monChinh").value,
    monDiemTam: document.getElementById("monTrua").value,
    quaChieu: document.getElementById("quaChieu").value
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((rs) => {

      console.log(rs.data);


      if (rs.data.success == true) {
        alert("Thêm thành công");
      } else {
        alert("Bạn đã thêm thực đơn ngày này");
      }
      refreshPage();
    })
}

function refreshPage() {
  window.location.reload();
}

function themMoiOnClick() {

  addMenu();

}

function deleteMenuOnClink(id) {
  deleteMenu(id);
}




function changeMenuByID() {
  const id = document.getElementById("invisibleID").value
  console.log(id);
  axios.put('http://localhost:3000/api/admin/foodmenu/' + id, {
    date: document.getElementById("changeDate").value,
    monChinh: document.getElementById("changeMonChinh").value,
    monDiemTam: document.getElementById("changeMonDiemTam").value,
    quaChieu: document.getElementById("changeQuaChieu").value
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((rs) => {
      if (rs.data.success) {
        alert(rs.data.message);
        refreshPage()
      } else {
        alert(rs.data.message)
        refreshPage()
      }
    })
}