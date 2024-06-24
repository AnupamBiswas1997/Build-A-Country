let doc = document.querySelector("#submit");

doc.addEventListener("click", ()=>{
    fetchPutData();
});

function fetchPutData(){
    event.preventDefault();
    let title = document.getElementById("title").value;
    let Description = document.getElementById("Description").value;
    let Status = document.getElementById("Status").value;
    let DueDate = document.getElementById("DueDate").value;

    if(title == "" || Description == "" || DueDate == ""){
        alert("Form Fields cannot be kept Empty");
    }
    else{
        let obj = {
            title: title,
            description: Description,
            status: Status,
            dueDate: DueDate
            }
    
            postData(obj);
            title.value = "";
            Description.value = "";
            Status.value = "";
            DueDate.value = "";
            window.location.href = "index.html";
    }
    }

async function postData(x){
    try {
        let url = "http://localhost:3000/tickets";
        let response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(x)
        });
        
    } catch (error) {
        console.log("Somethig Went Wrong While Creating the Data",error);
    }    
    
}