

function sendMail() {
  axios.post("http://localhost:8082/teacher/emails", {
    senderEmail: document.getElementById("senderEmail").value,
    receiverEmail: document.getElementById("receiverEmail").value,
    message: document.getElementById("message").value,
  }, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  }).then(rs => {
    if (true) {
      alert("Gửi thông báo thành công");
      refreshPage()
    }
  })
}

function refreshPage() {
  window.location.reload();
}