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
console.log(user);

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
        let linkMenu = document.getElementById("linkMenu");
        //console.log(placeMenu);

        let menuArr = menu.menus;
        
        placeMenu[0].value = menuArr[1].breakMon;
        placeMenu[1].value = menuArr[1].dinMon;
        placeMenu[2].value = menuArr[1].supMon;
        placeMenu[3].value = menuArr[1].breakTue;
        placeMenu[4].value = menuArr[1].dinTue;
        placeMenu[5].value = menuArr[1].supTue;
        placeMenu[6].value = menuArr[1].breakWed;
        placeMenu[7].value = menuArr[1].dinWed;
        placeMenu[8].value = menuArr[1].supWed;
        placeMenu[9].value = menuArr[1].breakThu;
        placeMenu[10].value = menuArr[1].dinThu;
        placeMenu[11].value = menuArr[1].supThu;
        placeMenu[12].value = menuArr[1].breakFri;
        placeMenu[13].value = menuArr[1].dinFri;
        placeMenu[14].value = menuArr[1].supFri;
        placeMenu[15].value = menuArr[1].breakSat;
        placeMenu[16].value = menuArr[1].dinSat;
        placeMenu[17].value = menuArr[1].supSat;
        placeMenu[18].value = menuArr[1].breakSun;
        placeMenu[19].value = menuArr[1].dinSun;
        placeMenu[20].value = menuArr[1].supSun;
        
        linkMenu.href = "head-menu.html?id=" + user;
    })
;





let butSave = document.getElementById("butSave");
butSave.onclick = function showMenu(e) {
    e.preventDefault();

    let newMenu = document.getElementsByClassName("menu");
    let mutNewMenu = `mutation newMenu{
	  createMenu(
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
	      users:{connect:{id:"${user}"}}
	      status: PUBLISHED
	    }){
	    id
	  	}
	}`;

	console.log(mutNewMenu);
	axios.post(url, {query: mutNewMenu})
        .then(response => {
          console.log(response.data);
          let createMenu = response.data.data.id;
          if (createMenu) {
                alert("Изменение данных произведено успешно!");
          } 
    });

}

