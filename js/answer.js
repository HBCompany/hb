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
    document.location.href = "setting.html?id=" + user;
};