function findMenu() {
  axios.get('http://localhost:3000/api/parent/foodmenu', {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((x) => {
      console.log(x);
      let info = " ";
      $.each(x.data, function (index, value) {
        info += `
        <tr>            
          <td> ${new Date(value.date).getDay() + 1} </td>
          <td> ${new Date(value.date).getDate()}/${new Date(value.date).getMonth() + 1}/${new Date(value.date).getFullYear()} </td>            
          <td> ${value.monChinh} </td>
          <td> ${value.monDiemTam}   </td>                        
          <td> ${value.quaChieu}</td>                        
        </tr>            
         `
      });
      $('#information').html(info);
    });
}

$(document).ready(function () {
  findMenu();
});