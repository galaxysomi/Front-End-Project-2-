if(localStorage.token){
    let host = 'http://localhost:3000'
        axios.post(host + '/api/admin/login/check', {}, {
            headers: { Authorization: 'Bearer ' + localStorage.token }
        }
        ).then(rs => {
            if (rs.data.success) {
                window.location = "../template/pagesAdmin/teacher/teacherManagement.html"
            }else{
                window.location = "../LoginAdmin/LoginAdmin.html"
            }
        })
   }