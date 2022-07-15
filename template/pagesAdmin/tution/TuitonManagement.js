

async function fintTuition() {
    await axios.get("http://localhost:8082/admin/getAllTuition", {

        headers: { Authorization: localStorage.getItem("token") }
    })  // dien link api vao
        .then((tuition) => {
            console.log(tuition)
            console.log(localStorage.getItem("token"))

            let info = " ";
            $.each(tuition.data.data, async function (index, value) {

                await findStudentByID(value.studentID).then((data) => {


                    info += `
            <tr>
             
              <td> ${value.month}  </td>
              <td> ${data.studentName}</td>  
              <td> ${value.tuitionFee} VND</td>                        
              
  
              <td>
              <button onClick="getTuitionByID('${value.studentID}')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeActivity">
              Sửa
            </button>
           
              
            </td>        
            </tr>            
             ` ;
                })
                    .catch(err => {
                        console.log(err);
                    })
                $('#information').html(info);
            })
        });
}

function getTuitionByID(id) {
    axios.get('http://localhost:8082/admin/getTuition', {
        headers: { Authorization: localStorage.getItem("token") },
        params: { studentID: id }
    }).then(data => {
        console.log(data.data.data);
        document.getElementById("changeTuitionMonth").value = data.data.data[0].month;
        document.getElementById("changeStudentName").value = data.data.data[0].studentName;
        document.getElementById("changeTuitionFee").value = data.data.data[0].tuitionFee;
        document.getElementById("invisibleID").value = data.data.data[0].tuitionID;


    })
}

async function findStudentByID(id) {
    const res = await axios.get("http://localhost:8082/student/getStudentInfor", {
        headers: { Authorization: localStorage.getItem("token") },
        params: { studentID: id },
    })
    let data = await res.data.data;
    return data;
}

function changeTuitionByID() {

    axios.put('http://localhost:8082/admin/updateTuition', {
        tuitionID: document.getElementById("invisibleID").value,
        month: document.getElementById("changeTuitionMonth").value,
        tuitionFee: document.getElementById("changeTuitionFee").value,
        studentID: document.getElementById("changeStudentName").value,

    }, {
        headers: { Authorization: 'Bearer ' + localStorage.token }
    })
        .then((rs) => {
            if (true) {
                alert(rs.data.message);
                refreshPage()
            }
        })
}

function addTuition() {
    axios.post('http://localhost:8082/admin/addTuition/', [{
        month: document.getElementById("tuitionMonth").value,
        tuitionFee: document.getElementById("tuitionFee").value,
        studentID: document.getElementById("studentName").value,
    }]
        , {
            headers: { Authorization: localStorage.getItem("token") },
        }).then((rs) => {
            if (rs.data.success) {
                alert(rs.data.message);
                refreshPage();
            } else {
                alert(rs.data.message);
            }
        })
}

function refreshPage() {
    window.location.reload();
}
fintTuition();