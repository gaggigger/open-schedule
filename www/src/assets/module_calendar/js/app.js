$(document).ready(function() {

  $(window).hashchange( function(){
    // Reload calendar
    $('#calendar').fullCalendar( 'refetchEvents' )
  });


  var furl = url('?');
  var Resources = [];
  // Get resources
  $.ajax({
    url: furl.resources,
    dataType: 'json',
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", furl.token);
    },
    success: function(resources) {
      Resources = resources;
    }
  });

  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    //defaultDate: '2017-11-12',
    navLinks: true, // can click day/week names to navigate views
    defaultView : 'agendaWeek',

    slotDuration : '00:15:00',
    minTime : '07:00:00',
    maxTime : '20:00:00',

    weekNumbers: true,
    weekNumbersWithinDays: true,
    weekNumberCalculation: 'ISO',

    editable: true,
    eventLimit: true, // allow "more" link when too many events
    timeFormat: 'H(:mm)',
    slotLabelFormat : 'H(:mm)',

    events: function(start, end, timezone, callback) {
      $.ajax({
        url: furl.path,
        dataType: 'json',
        beforeSend: function(request) {
          request.setRequestHeader("Authorization", furl.token);
        },
        data: {
          items: url('#').items,
          start: start.unix(),
          end: end.unix()
        },
        success: function(doc) {
          callback(doc);
        }
      });
    },
    dayClick: function(date, jsEvent, view) {
      console.log(date, jsEvent, view);
      var str = '';
      Resources.map(function(item) {
        str += '<div>';
        str += '  <span>' + item.name + '</span>';
        str += '</div>';
      });
      vex.dialog.open({
        message: 'TITLE',
        input: [
          str
        ].join(''),
        callback: function (data) {
          if (!data) {
            return console.log('Cancelled')
          }
          console.log(data);
        }
      })

    }
  });

});
