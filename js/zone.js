function timer(){

  var hour = document.getElementById('hour').innerHTML;
  var minute = document.getElementById('minute').innerHTML;
  var second = document.getElementById('second').innerHTML;
  var end = false;

  if( second > 0 ) second--;
  else{
    second = 59;

    if( minute > 0 ) minute--;
    else{
      second = 59;

      if( hour > 0 ) hour--;
      else end = true;
    }
  }

  if(end){
    clearInterval(intervalID);
    alert("Таймер сработал!");
  }else{
    document.getElementById('hour').innerHTML = hour;
    document.getElementById('minute').innerHTML = minute;
    document.getElementById('second').innerHTML = second;
  }
}
window.intervalID = setInterval(timer, 1000);


//DB
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


let user = getQueryVariable('id'); 
let roomName = getQueryVariable("room");
let zoneName = getQueryVariable("zone");
const bodyZoneShow = `{
  users(where:{id:"${user}"}){
    rooms(where:{id:"${roomName}"}){
      zones(where:{id:"${zoneName}"}){
        nameZone
        bodyZone
        smallBodyZone
      }
    }
  }
}`;


let zone = [];
axios.post(url, {query: bodyZoneShow})
    .then(response => {
        zone = response.data.data.users.rooms[0];
        console.log(zone);
        let nameZone = document.getElementById("nameZone");
        nameZone.textContent = zone.zones[0].nameZone;

        let bodyZone = document.getElementById("bodyZone");
        bodyZone.textContent = zone.zones[0].bodyZone;
    })
;

let yes = document.getElementById("yes");
yes.onclick = function(e){
    e.preventDefault();
    document.location.href = "head-menu.html?id=" + user;
}

let back = document.getElementById("back");
back.onclick = function(e){
    e.preventDefault();
    document.location.href = "pred_zone.html?id=" + user  + "&room=" + roomName;
}