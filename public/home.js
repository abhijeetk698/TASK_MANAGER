var containerBlock=document.querySelector("#data");
var tasks=document.querySelectorAll(".tasks");

var filterForm =document.querySelector("#filterForm");

filterForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    var f_tasktype =document.querySelector("#f_taskType").value;
    var f_status =document.querySelector("#f_status").value;
    // console.log(f_status);
    // console.log(f_tasktype);
    for(var i=0;i<tasks.length;i++){
        let status = tasks[i].getElementsByClassName("status")[0].innerText;
        let tasksType=tasks[i].getElementsByClassName("taskType")[0].innerText;
        tasks[i].style.display="block";
        if((f_status!="NULL"&&f_status!=status)||(f_tasktype!="NULL"&&f_tasktype!=tasksType)){
            tasks[i].style.display="none";
        }
    }
})
