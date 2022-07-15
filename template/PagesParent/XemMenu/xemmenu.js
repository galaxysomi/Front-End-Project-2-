
function findMenu(id) {
  axios.get('http://localhost:8082/foodMenu/getMenuFoodByID', {
    headers: { Authorization: 'Bearer ' + localStorage.token },
    params: { foodMenuID: id }
  })
    .then((x) => {
      console.log(x.data);
      let value = x.data.data;
      let info = " ";
      console.log('check>>>', value.breakfastFoodList)

      info += `
        <tr>            
          
          <td> ${convertDateToString(value.dateFood)} </td>            
          <td> ${value.breakfastFoodList} </td>
          <td> ${value.lunchFoodList} </td>                        
          <td> ${value.dinnerFoodList} </td>                        
        </tr>            
         `
      $('#information').html(info)
    },
    );
};

$(document).ready(function () {
  findMenu('2fe16309-1120-4ca2-93c4-5a4c424e5661');
});

function convertDateToString(date) {
  const d = new Date(date)
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; //Months are zero based
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year
}