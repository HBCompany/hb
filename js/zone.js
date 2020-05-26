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