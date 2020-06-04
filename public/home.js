var containerBlock=document.querySelector("#data");
var tasks=document.querySelectorAll(".tasks");

var filterForm =document.querySelector("#filterForm");

filterForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    var f_tasktype =document.querySelector("#f_taskType").value;
    var f_status =document.querySelector("#f_status").value;
    var f_title=document.querySelector("#f_title").value;
    var asc=document.querySelector("#asc").checked;
    var dsc=document.querySelector("#dsc").checked;
    // console.log(f_status);
    // console.log(f_tasktype);
    for(var i=0;i<tasks.length;i++){
        let status = tasks[i].getElementsByClassName("status")[0].innerText;
        let tasksType=tasks[i].getElementsByClassName("taskType")[0].innerText;
        let title = tasks[i].getElementsByClassName("title")[0].innerText;
        console.log(title)
        tasks[i].style.display="block";
        if( (f_status!="NULL"&&f_status!=status)||
            (f_tasktype!="NULL"&&f_tasktype!=tasksType)||
            (f_title!=""&&f_title!=title)
            ){
            tasks[i].style.display="none";
        }
    }
})
