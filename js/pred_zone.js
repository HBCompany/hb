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
let roomId = getQueryVariable('room'); 

const roomInfo = `{
  users(where:{id:"${user}"}){
    rooms(where:{id:"${roomId}"}){
      nameRoom
      id
      zones{
        id
        nameZone
        bodyZone
        smallBodyZone
      }
    }
  }
}`;

let room = [];
axios.post(url, {query: roomInfo})
    .then(response => {
        room = response.data.data.users.rooms[0];
        console.log(room);
        let nameZone = document.getElementsByClassName("nameZone");
        let smallBodyZone = document.getElementsByClassName("bodyZone");
        let linkZone = document.getElementsByClassName("link");
        let nameRoom = document.getElementById("room");
        nameRoom.textContent = room.nameRoom;

        let zonesArr = room.zones;

        for(let i = 0; i < 5; i++){
            nameZone[i].textContent = zonesArr[i].nameZone;
            smallBodyZone[i].textContent = zonesArr[i].smallBodyZone;
            linkZone[i].href = "zone.html?id=" + user + "&room=" + room.id 
                                + "&zone=" + zonesArr[i].id;
        }

    })
;

let back = document.getElementById("back");
back.onclick = function(e){
    e.preventDefault();
    document.location.href = "head-menu.html?id=" + user;
}