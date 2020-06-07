var containerBlock=document.querySelector("#data");
var tasks=document.querySelectorAll(".tasks");

var filterForm =document.querySelector("#filterForm");
var searchForm =document.querySelector("#searchForm");
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
        tasks[i].style.display="block";
        if( (f_status!="NULL"&&f_status!=status)||
            (f_tasktype!="NULL"&&f_tasktype!=tasksType)||
            (f_title!=""&&f_title!=title)
            ){
            tasks[i].style.display="none";
        }
    }
});

searchForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  var f_title=document.querySelector("#f_title").value;
  console.log(f_title);
  for(var i=0;i<tasks.length;i++){
      let title = tasks[i].getElementsByClassName("title")[0].innerText;
      console.log(title);
      tasks[i].style.display="block";
      if(f_title!=""&&f_title!=title){
          tasks[i].style.display="none";
      }
  }
});


// ARCHIVE

var archiveBtn = document.querySelector("#archiveBtn");
archiveBtn.addEventListener("click",()=>{
  for(var i=0;i<tasks.length;i++){
    let status = tasks[i].getElementsByClassName("status")[0].innerText;
    tasks[i].style.display="block";
    if(status!="Completed"){
        tasks[i].style.display="none";
    }
}
})


/*************CLOCK SETTING**********************/
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

const month = document.querySelector('.month');
const day = document.querySelector('.day');
const year = document.querySelector('.year');

function setDate() {
  const now = new Date();
  const mm = now.getMonth();
  const dd = now.getDate();
  const yyyy = now.getFullYear();
  const secs = now.getSeconds();
  const mins = now.getMinutes();
  const hrs = now.getHours();
  const monthName = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'];


  if (hrs > 12) {
    hours.innerHTML = hrs - 12;
  } else {
    hours.innerHTML = hrs;
  }

  if (secs < 10) {
    seconds.innerHTML = '0' + secs;
  } else {
    seconds.innerHTML = secs;
  }

  if (mins < 10) {
    minutes.innerHTML = '0' + mins;
  } else {
    minutes.innerHTML = mins;
  }

  month.innerHTML = monthName[mm];
  day.innerHTML = dd;
  year.innerHTML = yyyy;
}

setInterval(setDate, 1000);