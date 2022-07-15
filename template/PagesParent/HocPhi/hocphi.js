



function getTuitionByMonth() {
  let url = 'http://localhost:8082/parent/getTuition';
  console.log(url);
  axios.get(url, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
    .then((rs) => {
      console.log(rs.data.data);
      console.log(localStorage.getItem('studentName'));
      if (true) {

        const hocphi = rs.data.data;

        let tuition = " ";



        tuition += `
          <tr>
            <td>${hocphi.month}</td>
            <td>${localStorage.getItem('studentName')}</td>
            <td>${hocphi.tuitionFee} VND</td>
          </tr>
            
            `;

        $('#tuitionTable').html(tuition);

      }
    })
}

$(document).ready(getTuitionByMonth())
