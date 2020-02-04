//Creare un calendario dinamico con le festività.
//Partiamo dal gennaio 2018 dando la possibilità di cambiare mese,
//gestendo il caso in cui l’API non possa ritornare festività.
//Il calendario partirà da gennaio 2018
//e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

//Ogni volta che cambio mese dovrò:
//- Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
//- Controllare quanti giorni ha il mese scelto formando così una lista
//- Chiedere all’api quali sono le festività per il mese scelto
//- Evidenziare le festività nella lista


$(document).ready(function() {

  for (var i = 1; i <= 31; i++) {
    console.log() ;
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      date: moment(i + '/01/2018', 'D/MM/YYYY', true).format('D MMMM'),
    };
    console.log(context.date);
    var html = template(context);
    $('.lista-giorni').append(html);
  }
  $.ajax({
       url : "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
       method : "GET",
       success : function(dati) {
       console.log(dati.response[0].date);
      for (var i = 0; i < dati.response.length; i++) {
      var DataDaConsiderare = moment(dati.response[i].date, 'YYYY-MM-DD', true).format('D MMMM');
      console.log(DataDaConsiderare);
      for (var key = 0; k <= 31; k++) {
        if (DataDaConsiderare == $('.lista-giorni li').eq(key).text()) {
          $('.lista-giorni li').eq(key).append(' - ' + dati.response[i].name);
          $('.lista-giorni li').eq(key).addClass('red');
        }
      }
    }
});
