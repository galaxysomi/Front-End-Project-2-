
function sendMail() {
    axios.post("http://localhost:8082/parent/emails", {
        senderEmail: localStorage.getItem("username"),
        // receiverEmail: ,
        // message: document.getElementById("message").value,
    }, {
        headers: { Authorization: 'Bearer ' + localStorage.token }
    }).then(rs => {
        if (true) {
            alert(rs.data.msg);
            refreshPage()
        }
    })
}

function refreshPage() {
    window.location.reload();
}