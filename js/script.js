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


$(document).ready(function () {
  //vado a stampare dei numeri che rappresentano i giorni del mese
  //parto da gennaio che ha 31 giorni

  var thisMonth = 0;
  var year = 2018;
  var baseMonth = moment(
    {
      year: year,
      month: thisMonth
    }
  );

  var lastMonth = 11;



  printMonth(baseMonth);
  printHoliday(baseMonth);

  // quando clicchiamo su next
  $('#next').click(function () {
    //dobbiamo andare avanti di un mese e chiamare la funzione che genera i giorni e poi chiamare quella che crea le festivita
    if (lastMonth > 11) {
      alert('Calendario 2019 non disponibile al momento');

    } else {
      alert('continua la selezione');

    }
    var thisMonth = $('h1').attr('data-this-month');
    var date = moment(thisMonth).add(1, 'months');
    console.log(date);


    printMonth(date);
    printHoliday(date);
  });

  $('#prev').click(function () {
    var thisMonth = $('h1').attr('data-this-month');
    var date = moment(thisMonth).subtract(1, 'months');
    console.log(date);


    printMonth(date);
    printHoliday(date);
  });



});



// FUNCTION -----------------------

function printMonth(month) {
  $('.days').html('');
  //inseriamo h1 dinamicamente
  $('h1').text(month.format('MMMM YYYY'));
  $('h1').attr('data-this-month', month.format('YYYY-MM'));

  //quanti giorni ha il mese corrente?
  var daysInMonth = month.daysInMonth();

  // faccio un ciclo che parte da 1 fino a 31 incluso
  for (var i = 1; i <= daysInMonth ; i++) {
    // console.log(i);
    // "2018-01-06"

    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    var context = {
      day: i,
      month: month.format('MMMM'),
      dateComplete: month.format('YYYY-MM') + '-' + addZero(i)
    };
    var html = template(context);
    $('.days').append(html);
  }
}

function addZero(num) {
  if(num < 10) {
    return '0' + num;
  }
  return num;
}


function printHoliday(month) {
  // console.log(month.month());
  // console.log(month.year());
  $.ajax(
    {
      url: 'https://flynn.boolean.careers/exercises/api/holidays',
      method: 'GET',
      data: {
        year: month.year(),
        month: month.month()
      },
      success: function (data) {
        // console.log(data.response);
        var holidays = data.response;
        //prendo ogni holidays e la confronto con ogni li sul dom se quel li contiene la stessa data allora la coloro di rosso

        //ciclo sugli elementi di holidays
        for (var i = 0; i < holidays.length; i++) {
          var thisHoliday = holidays[i];
          // console.log(thisHoliday);
          var thisHolidayData = thisHoliday.date;
          // console.log(thisHolidayData);
          //confrontare questa data con tutte le date negli li
          //ciclo sgli li usando jquery
          // $('.day').each(function () {
          //   var elementDate = $(this).attr('data-date-complete');
          //   // console.log(elementDate);
          //   if(thisHolidayData == elementDate) {
          //     $(this).addClass('red');
          //     $(this).find('.nome-festivita').append(thisHoliday.name);
          //   }
          // });

          //metodo con data attr
          $('li[data-date-complete="'+ thisHolidayData  +'"]').addClass('red');
          $('li[data-date-complete="'+ thisHolidayData  +'"]').find('.nome-festivita').append(thisHoliday.name);
          // 'li[data-date-complete="2018-01-01"]'
        }
      },
      error: function () {
        alert('errore');
      }
    }
  );
}

// {
//     "success": true,
//     "response": [
//         {
//             "name": "Capodanno",
//             "date": "2018-01-01"
//         },
//         {
//             "name": "Epifania",
//             "date": "2018-01-06"
//         }
//     ]
// }
