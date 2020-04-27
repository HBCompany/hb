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

let page = getQueryVariable('p');
const questionsQuery = `{
  questions(where:{pageQuestion:{numPage:"${page}"}}) {
    questionBody
    answers{ 
      answerBody
    }
  }
} `;


let questions = [];
axios.post(url, {query: questionsQuery})
    .then(response => {
        console.log(response.data);
        questions = response.data.data.questions;
        
        let question = document.getElementById("question");
        question.textContent = questions[0].questionBody;

        let answersEl = document.querySelectorAll(".sign-face");
        let answersArr = questions[0].answers;
        for(let i = 0; i<answersEl.length; i++ ) {
        	answersEl[i].textContent = answersArr[i].answerBody;
        }


        //console.log(book);
        //bookView = document.getElementById('book');
        //.innerHTML += `<div class="book">${book.name}</a> | <span>Price: ${book.price}</span><p>${book.description}</p></div>`;
    })
    .catch(error => {
        console.log(error);
    })
;
