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
    rooms{
      nameRoom
      id
      zones{
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
        room = response.data.data.users.rooms;
        console.log(room);
        let nameZone = document.getElementsByClassName("nameZone");
        let smallBodyZone = document.getElementsByClassName("bodyZone");
        let linkZone = document.getElementsByClassName("link");
        let nameRoom = document.getElementById("room");
        nameRoom.textContent = room[roomId].nameRoom;

        let zonesArr = room[roomId].zones;
        for(let i = 0; i < 5; i++){
            nameZone[i].textContent = zonesArr[i].nameZone;
            smallBodyZone[i].textContent = zonesArr[i].smallBodyZone;
            linkZone[i].href = "zone.html?id=" + zonesArr[i].id;
        }

    })
;