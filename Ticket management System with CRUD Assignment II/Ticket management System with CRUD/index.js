window.onload = function () {
    fetchData();
}


async function fetchData() {
    try {
        let res = await fetch("http://localhost:3000/tickets");
        let data = await res.json();
        displayData(data);
    } catch (error) {
        console.log("Something went wrong", error);
    }
}


function displayData(arr) {
    let doc = document.getElementById("tableBody");
    doc.innerHTML = "";
    arr.forEach((ele) => {
        let trow = document.createElement("tr");
        doc.append(trow);

        let title = document.createElement("td");
        title.textContent = ele.title;
        trow.append(title);

        let description = document.createElement("td");
        description.textContent = ele.description;
        trow.append(description);
        let btn1 = document.createElement("button");
        btn1.innerHTML = "Edit";
        btn1.className = "editButton1";
        description.append(btn1);
        let btn1click = 1;

        btn1.onclick = function () {
            if (btn1click == 1) {
                btn1click++;
                let input1 = document.createElement("input");
                input1.value = "";
                input1.className = "inputx";
                input1.placeholder = "Enter new Description";
                description.append(input1);
                let sbtn1 = document.createElement("button");
                sbtn1.innerHTML = "Submit";
                sbtn1.className = "submitButton1";
                description.append(sbtn1);
                sbtn1.onclick = function(){
                    let obj1 = {
                        description: input1.value
                    }
                    patchData(obj1,input1.value,ele.id);
                }
            }
        }

        let status = document.createElement("td");
        status.textContent = ele.status;
        trow.append(status);
        let btn2 = document.createElement("button");
        btn2.innerHTML = "Edit";
        btn2.className = "editButton2";
        status.append(btn2);
        let btn2click = 1;
        btn2.onclick = function () {
            if (btn2click == 1) {
                btn2click++;
                const input2 = document.createElement("select");
                input2.value = "";
                input2.className = "inputx";
                const options = ["Open", "In-Progress", "Closed"];
                options.forEach(optionText => {
                    const optionElement = document.createElement("option");
                    optionElement.value = optionText; // Use a suitable value attribute
                    optionElement.textContent = optionText;
                    input2.appendChild(optionElement);
                });
                status.append(input2);
                let sbtn2 = document.createElement("button");
                sbtn2.innerHTML = "Submit";
                sbtn2.className = "submitButton2";
                status.append(sbtn2);
                sbtn2.onclick = function(){
                    let obj2 = {
                        status: input2.value
                    }
                    patchData(obj2,input2.value,ele.id);
                }
            }
        }

        let dueDate = document.createElement("td");
        dueDate.textContent = ele.dueDate;
        trow.append(dueDate);
        let btn3 = document.createElement("button");
        btn3.innerHTML = "Edit";
        btn3.className = "editButton3";
        dueDate.append(btn3);

        let btn3click = 1;

        btn3.onclick = function () {
            if (btn3click == 1) {
                btn3click++;
                let input3 = document.createElement("input");
                input3.type = "date";
                input3.value = "";
                input3.className = "inputx";
                input3.placeholder = "Enter new Due Date";
                dueDate.append(input3);
                let sbtn3 = document.createElement("button");
                sbtn3.innerHTML = "Submit";
                sbtn3.className = "submitButton3";
                dueDate.append(sbtn3);
                sbtn3.onclick = function(){
                    let obj3 = {
                        dueDate: input3.value
                    }
                    patchData(obj3,input3.value,ele.id);
                }
            }
        }




        let delbtn = document.createElement("td");
        trow.append(delbtn);
        let btn4 = document.createElement("button");
        btn4.innerHTML = "Delete";
        btn4.className = "deleteButton";
        delbtn.append(btn4);
        btn4.addEventListener("click",() => {
            deleteData(ele.id);
        });
    });
}



async function deleteData(dataID){
    try {
        console.log("Trying to delete");
        let url = "http://localhost:3000/tickets/"+dataID;
        let response = await fetch(url,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });
        fetchData();
    } catch (error) {
        console.log("Something went wrong while deleting the data",error);
    }
}

async function patchData(obj,value,dataID){
    try {
        let url1 = "http://localhost:3000/tickets/"+dataID;
        if(value == "" || value == undefined){
            alert("Please Enter Data to be Patched");
        }
        else{
            let response = await fetch(url1, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            fetchData();
        }
        
    } catch (error) {
        console.log("Something Went Wrong on Trying to Edit Data",error);
    }
}