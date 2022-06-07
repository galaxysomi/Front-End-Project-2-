
// const host = 'http://localhost:3000'
//         axios.get(host + '/api/parent/student', {
//           headers: { Authorization: 'Bearer ' + localStorage.token }
//         }).then(result => {
//           if (result.data.status === 'ok') {
//             const student = result.data.student
//             document.getElementById('studentname').innerHTML = 'Họ và tên: ' + student.name;
//           }
//         })


function submitMail() {
    axios.post('http://localhost:3000/api/parent/mail', {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,     
    },{
        headers: { Authorization: 'Bearer ' + localStorage.token }
    }
    )
        .then((rs) => {
            console.log(rs);
            if (rs.data.status == "ok") {
                document.getElementById("title").value=""
                document.getElementById("content").value=""
                alert("Gửi thành công");
            }
            else {
                alert("Gửi không thành công")
            }
            
        })
}