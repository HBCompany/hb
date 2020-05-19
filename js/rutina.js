const url = "https://api-euwest.graphcms.com/v1/ck3ohp7e3nq9e01ff33nm3ipb/master";

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
        let time = document.getElementById("time");
        time.textContent = pageRutine.time;

        let listRoutines = document.getElementById('myUL');
        let rutinesArr = pageRutine.rutines;
        for(let r of rutinesArr) {
          let li = document.createElement("li");
          li.textContent = r.bodyRutine;
          listRoutines.append(li);
         
        }
    })
; 

//mutation

var closebtns = document.getElementsByClassName("close");
var i;

for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function() {
        this.parentElement.style.display = 'none';
    });
}

/*var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}*/

// Click on a close button to hide the current list item
/*var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}*/


// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

  let btn = document.getElementsByClassName('addBtn')[0];
  btn.onclick = newElement;


  // Create a new list item when clicking on the "Add" button
  function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
      }
    };

    //mutation

    let bodyRut = li.textContent;
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
  }