const url = "https://api-euwest.graphcms.com/v1/ck3ohp7e3nq9e01ff33nm3ipb/master";

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
let createNewTaskElement=function(taskString){

    let listItem=document.createElement("li");

    //input (checkbox)
    let checkBox=document.createElement("input");//checkbx
    //label
    let label=document.createElement("label");//label


    //button.delete
    let deleteButton=document.createElement("input");//delete button

    label.innerText=taskString;

    checkBox.type="checkbox";

    deleteButton.className="delete input-submit btn-ed-del";
    label.className = "sing-up";

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    return listItem;
}

//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}

//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");

    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}



var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var deleteButton=taskListItem.querySelector("input.delete");


    //Bind editTask to edit button.
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}



// DB
function getQueryVariable(variable)
{
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return(false);
}


let pageRut = getQueryVariable('id'); 
const timeRoutineQuery = `{
 pageRutine (where:{id:"${pageRut}"}){
    time
    rutines{
      bodyRutine
    }
  }
}`;



let pageRutine = [];
axios.post(url, {query: timeRoutineQuery})
    .then(response => {
        pageRutine = response.data.data.pageRutine;
        console.log(pageRutine);
        let time = document.getElementById("timeRut");
        time.textContent = pageRutine.time;

        let listRoutines = document.getElementById('incomplete-tasks');
        let rutinesArr = pageRutine.rutines;
        for(let r of rutinesArr) {
            let li = document.createElement("li");
            li.textContent = r.bodyRutine;
            listRoutines.appendChild(li);
            li.className = "sing-up";

          let checkBox=document.createElement("input");
          checkBox.type="checkbox";
          listRoutines.appendChild(checkBox);

            let deleteButton=document.createElement("input");
            deleteButton.className="delete input-submit btn-ed-del";
            listRoutines.appendChild(deleteButton);


        }
    })
;

addButton.onclick = function newElement() {

    console.log("Add Task...");
    var listItem=createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTaskHolder
    bindTaskEvents(listItem, taskCompleted);

    if (taskInput === '') {
      alert("You must write something!");
    } else {
        incompleteTaskHolder.appendChild(listItem);
    }
    taskInput.value = "";

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
      }
    }

    let bodyRut = listItem.textContent;
    let newRutine = `mutation createRutine{
        createRutine(
          data:{
          bodyRutine:"${bodyRut}"
          pageRutine: {connect:{id:"${pageRut}"}}
          status: PUBLISHED
        }) {
          id
        }
      }`;

    axios.post(url, {query: newRutine})
      .then(response => {
          console.log(response.data);
          let createRutine = response.data.data.id; 
          if (createRutine) {
            console.log("Изменение данных произведено успешно!");
         }
      });
};
