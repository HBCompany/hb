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
let idMenu = getQueryVariable("menu");

const showMenu = `{
  users(where:{id:"${user}"}){
      menus{
        breakMon
        dinMon
        supMon
        breakTue
        dinTue
        supTue
        breakWed
        dinWed
        supWed
        breakThu
        dinThu
        supThu
        breakFri
        dinFri
        supFri
        breakSat
        dinSat
        supSat
        breakSun
        dinSun
        supSun
  	}
  }
}`;

let menu = [];
axios.post(url, {query: showMenu})
    .then(response => {
        menu = response.data.data.users;
        console.log(menu);
        let placeMenu = document.getElementsByClassName("menu");

        let menuArr = menu.menus[0];
        
        placeMenu[0].value = menuArr.breakMon;
        placeMenu[1].value = menuArr.dinMon;
        placeMenu[2].value = menuArr.supMon;
        placeMenu[3].value = menuArr.breakTue;
        placeMenu[4].value = menuArr.dinTue;
        placeMenu[5].value = menuArr.supTue;
        placeMenu[6].value = menuArr.breakWed;
        placeMenu[7].value = menuArr.dinWed;
        placeMenu[8].value = menuArr.supWed;
        placeMenu[9].value = menuArr.breakThu;
        placeMenu[10].value = menuArr.dinThu;
        placeMenu[11].value = menuArr.supThu;
        placeMenu[12].value = menuArr.breakFri;
        placeMenu[13].value = menuArr.dinFri;
        placeMenu[14].value = menuArr.supFri;
        placeMenu[15].value = menuArr.breakSat;
        placeMenu[16].value = menuArr.dinSat;
        placeMenu[17].value = menuArr.supSat;
        placeMenu[18].value = menuArr.breakSun;
        placeMenu[19].value = menuArr.dinSun;
        placeMenu[20].value = menuArr.supSun;
        
    })
;

let butSave = document.getElementById("butSave");
butSave.onclick = function (e) {
    e.preventDefault();

    let newMenu = document.getElementsByClassName("menu");
    let mutNewMenu = `mutation newMenu{
      updateUsers(
        where:{id:"${user}"}
        data:{
          menus:{
            update:{
              where:{id:"${idMenu}"}
              data:{
    	      breakMon:"${newMenu[0].value}"
    	      dinMon:"${newMenu[1].value}"
    	      supMon:"${newMenu[2].value}"
    	      breakTue:"${newMenu[3].value}"
    	      dinTue:"${newMenu[4].value}"
    	      supTue:"${newMenu[5].value}"
    	      breakWed:"${newMenu[6].value}"
    	      dinWed:"${newMenu[7].value}"
    	      supWed:"${newMenu[8].value}"
    	      breakThu:"${newMenu[9].value}"
    	      dinThu:"${newMenu[10].value}"
    	      supThu:"${newMenu[11].value}"
    	      breakFri:"${newMenu[12].value}"
    	      dinFri:"${newMenu[13].value}"
    	      supFri:"${newMenu[14].value}"
    	      breakSat:"${newMenu[15].value}"
    	      dinSat:"${newMenu[16].value}"
    	      supSat:"${newMenu[17].value}"
    	      breakSun:"${newMenu[18].value}"
    	      dinSun:"${newMenu[19].value}"
    	      supSun:"${newMenu[20].value}"
    	      }
            }   
          }
        }
      ) {
        id
      }
    }`;

	console.log(mutNewMenu);
	axios.post(url, {query: mutNewMenu})
        .then(response => {
          console.log(response.data);
          let createMenu = response.data.data.id;
          if (createMenu) {
                document.location.href = "head-menu.html?id=" + user;
          } 
    });

    
}

let back = document.getElementById("back");
back.onclick = function(e){
    e.preventDefault();
    document.location.href = "head-menu.html?id=" + user;
}