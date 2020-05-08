const url = "https://api-euwest.graphcms.com/v1/ck3ohp7e3nq9e01ff33nm3ipb/master";

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    //listItem.className = "editMode";

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label

    //input (text)
    var editInput=document.createElement("input");//text
    
    //button.edit
    var editButton=document.createElement("button");//edit button
    
    //button.delete
    var deleteButton=document.createElement("button");//delete button
    

    label.innerText=taskString;

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className = "input-edit";

    editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
    editButton.className="edit input-submit btn-ed-del";
    deleteButton.innerText="Delete";
    deleteButton.className="delete input-submit btn-ed-del";



    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var containsClass=listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
    }else{
        editInput.value=label.innerText;
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
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
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem=this.parentNode;
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
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
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
          listRoutines.append(li);
         
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

    let bodyRut = listItem.lable.textContent;
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
            alert("Изменение данных произведено успешно!");
         }
      });
};
