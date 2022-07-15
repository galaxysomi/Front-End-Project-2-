function getMenuById(id) {
  axios.get('http://localhost:8082/foodMenu/getMenuFoodByID', {
    headers: { Authorization: localStorage.getItem("token") },
    params: { foodMenuID: id }

  }).then(data => {
    console.log(data.data.data);
    console.log(data.data.data.foodMenuID);
    //document.getElementById("changeDate").value = data.data.date ;
    document.getElementById("changeMonChinh").value = data.data.data.breakfastFoodList;
    document.getElementById("changeMonDiemTam").value = data.data.lunchFoodList;
    document.getElementById("changeQuaChieu").value = data.data.dinnerFoodList;
    document.getElementById("invisibleID").value = data.data.data.foodMenuID;


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
              <td> ${convertDateToString(value.dateFood)}</td>            
              <td> ${value.breakfastFoodList} </td>
              <td> ${value.lunchFoodList} </td>                        
              <td> ${value.dinnerFoodList}</td>               
              <td>
                      <button onClick = "deleteMenuOnClick('${value.foodMenuID}')"  
                      style="margin-top: 20px;" type="button" class="btn btn-danger"  data-target="#deleteFood">
                        Xóa
                      </button>  
              </td>            
            </tr>            
             `
      });
      $('#information').html(info);
    });
}

$(document).ready(function () {
  findMenu();
});

function deleteMenuOnClick(menuId) {
  if (confirm("Bạn có chắc chắn muốn xóa menu này không?")) {
    deleteMenu(menuId);
  }
}

function deleteMenu(id) {

  axios.delete('http://localhost:8082/foodMenu/deleteFoodMenu', {
    headers: { Authorization: localStorage.getItem("token") },
    params: { foodMenuID: id }
  })
    .then((rs) => {
      console.log(rs);
      {
        alert("Xóa menu thành công")
        refreshPage();
      }
    })
}

function addMenu() {
  axios.post('http://localhost:8082/foodMenu/addFoodMenu', {
    dateFood: document.getElementById("date").value,
    breakfastFoodList: document.getElementById("monChinh").value,
    lunchFoodList: document.getElementById("monTrua").value,
    dinnerFoodList: document.getElementById("quaChieu").value
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
function convertDateToString(date) {
  const d = new Date(date)
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year
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