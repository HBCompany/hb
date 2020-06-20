var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    let cont = this.nextElementSibling;
    if (cont)
      cont.classList.toggle("active");
  });
}

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
let back = document.getElementById("back");
back.onclick = function(e){
    e.preventDefault();
    document.location.href = "head-menu.html?id=" + user;
};