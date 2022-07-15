var id = location.search.substring(1);
console.log(id);

async function findStudent(id) {

    await axios
        .get("http://localhost:8082/student/getAllStudentsInClass", {
            headers: { Authorization: localStorage.getItem("token") },
            params: { classID: id }
        })  // dien link api vao day
        .then((data) => {
            let info = " ";
            let num = 0;
            const getStudent = data.data.data
            $.each(getStudent, async function (index, value) {

                console.log(data)
                info += `
            <tr>
            ${num += 1}
              <td> ${num} </td>
              <td> ${value.studentName} </td>
              <td> ${convertDateToString(value.dateOfBirth)} </td>
              <td> ${convertGender(value.studentGender)} </td>                        
            </tr>            
             `
                    ;
            })
            $('#information').html(info);
        })
};




$(document).ready(findStudent(id));


function refreshPage() {
    window.location.reload();
}

function convertDateToString(date) {
    const d = new Date(date)
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    return curr_date + "/" + curr_month + "/" + curr_year
}
function convertGender(gender) {
    if (gender == "0") return "Nam";
    else return "Nữ";
}




