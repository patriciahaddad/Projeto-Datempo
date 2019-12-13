import './../pages/Mostruario/mostruario';


var date1 = new Date(validade);
var date2 = new Date("12/12/2010");
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
alert(diffDays);