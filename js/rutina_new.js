const url = "https://api-euwest.graphcms.com/v1/ck3ohp7e3nq9e01ff33nm3ipb/master";

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
let createNewTaskElement=function(taskString){

    let listItem=document.createElement("li");
    listItem.className = "editMode";

    //input (checkbox)
    let checkBox=document.createElement("input");//checkbx
    //label
    let label=document.createElement("label");//label

    let textRoutine = document.createElement("input");
    textRoutine.type = "text";
    textRoutine.className = "input-edit";
    textRoutine.value =taskString;
    textRoutine.readOnly = "readonly";
    //button.delete
    let deleteButton=document.createElement("input");//delete button

    label.innerText=taskString;

    //Each elements, needs appending
    checkBox.type="checkbox";

    deleteButton.value="Delete";
    deleteButton.className="delete input-submit btn-ed-del";
    label.className = "sing-up";

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(textRoutine);
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
let taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


let taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    let listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var deleteButton = taskListItem.querySelector("input.delete");

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
/*for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}*/


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


let user = getQueryVariable('id'); 
let timeRut = getQueryVariable("time");
console.log(timeRut);
const timeRoutineQuery = `{
  users(where:{id:"${user}"}){
    pageRutines(where:{id:"${timeRut}"}){
      id
      time
      rutines{
        id
        bodyRutine
      }
    }   
  }
}`;

pageRutine = [];
axios.post(url, {query: timeRoutineQuery})
    .then(response => {
        pageRutine = response.data.data.users.pageRutines;
        let time = document.getElementById("timeRut");
        time.textContent = pageRutine[0].time;

        let listRoutines = document.getElementById('incomplete-tasks');
        let rutinesArr = pageRutine[0].rutines;
        let a = 0;
        for(let r of rutinesArr) {
            let li = document.createElement("li");

            let checkBox=document.createElement("input");
            checkBox.type="checkbox";

            let textRoutine = document.createElement("input");
            textRoutine.type = "text";
            textRoutine.className = "input-edit deleteRut";
            textRoutine.readOnly = "readonly";
            li.className = "editMode";
            textRoutine.value = `${r.bodyRutine}`;

            let deleteButton=document.createElement("input");
            deleteButton.type = "button";
            deleteButton.className="delete input-submit btn-ed-del";
            deleteButton.value = "Delete";
            deleteButton.id = "del" + a;

            li.appendChild(checkBox);
            //li.appendChild(label);
            li.appendChild(textRoutine);
            li.appendChild(deleteButton);
            bindTaskEvents(li, taskCompleted);
            listRoutines.appendChild(li);
            a++;
        }


        let rutArrWin = document.getElementsByClassName("deleteRut");
        let rutArrDel = document.getElementsByClassName("delete");
        let rutArrBas = pageRutine[0].rutines;
        
        for(let i = 0; i < rutArrDel.length; i++){
            rutArrDel[i].onclick = function(e){

                if (rutArrWin[i].value == rutArrBas[i].bodyRutine) {
                    const deleteRut = `mutation {
                      deleteRutine(where:{id:"${rutArrBas[i].id}"}) {
                        id
                      }
                    }`;

                    axios.post(url, {query: deleteRut})
                        .then(response =>{
                            delRut = response.data;
                            console.log(delRut);
                        });
                }
                
            }
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
              pageRutine: {connect:{id:"${pageRutine[0].id}"}}
              status: PUBLISHED
              users: {connect:{id:"${user}"}}
        }) {
          id
        }
      }`;

    axios.post(url, {query: newRutine})
      .then(response => {
          console.log(response.data);
          let createRutine = response.data.data.createRutine; 
      });
};

let back = document.getElementById("back");
back.onclick = function(e){
    e.preventDefault();
    document.location.href = "head-menu.html?id=" + user;
};