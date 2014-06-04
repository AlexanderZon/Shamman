$(document).ready( function(){
  var cTime = new Date(), month = cTime.getMonth()+1, year = cTime.getFullYear();

	theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	theDays = ["S", "M", "T", "W", "T", "F", "S"];
    events = [
      [
        "4/"+month+"/"+year, 
        'Otorrino', 
        '#', 
        '#177bbb', 
        'Exámen médico'
      ],
      [
        "7/"+month+"/"+year, 
        'Oftalmólogo!', 
        '#', 
        '#1bbacc', 
        'Examen médico'
      ],
      [
        "17/"+month+"/"+year, 
        'Otorrino', 
        '#', 
        '#fcc633', 
        'Cirugia de amigdalas'
      ]
    ];
    $('#calendar').calendar({
        months: theMonths,
        days: theDays,
        events: events,
        popover_options:{
            placement: 'top',
            html: true
        }
    });
});