var API_URL = 'http://localhost:3000/api';

angular.module('calendarApp', ['ngSanitize', 'ngMaterial']).controller('calendarController', [
'$scope', '$http', '$sce', '$mdDialog',
function ($scope, $http, $sce, $mdDialog) {

  $scope.resources = [];
  $scope.fUrl = url('?');

  $scope.init = function() {
    $scope.trackChanges();
    $scope.initCalendar();
  };

  /**
   * Track src change
   */
  $scope.trackChanges = function() {
    $(window).hashchange( function(){
      // Reload calendar
      $('#calendar').fullCalendar('refetchEvents');
    });
  };

  $scope.getResourceConfig = function(resource) {
    $http({
      url: API_URL + resource.path,
      method: 'get',
      headers: {
        'Authorization': $scope.fUrl.token
      },
    }).then(function(response) {
      $scope.diplayResource(resource, response.data);
    }, function(response) {
      // TODO error
    });
  };

  $scope.diplayResource = function(resource, resourceConfiguration) {
    $http({
      url: API_URL + resourceConfiguration.grid.data,
      method: 'get',
      headers: {
        'Authorization': $scope.fUrl.token
      },
    }).then(function(response) {
      $mdDialog.show({
        controller: function ($scope, $mdDialog, scopeParent, resource, data ) {
          $scope.resource = resource;
          $scope.data = data;
          $scope.hide = function() {
            $mdDialog.hide();
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };
        },
        locals: {
          scopeParent: $scope,
          resource : resource,
          data : response.data
        },
        templateUrl: 'resources-item.tmpl.html',
        parent: angular.element(document.body),
        skipHide: true,
        clickOutsideToClose:true
      }).then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    }, function(response) {
      // TODO error
    });

  };

  $scope.initCalendar = function() {
    // Get resources
    $http({
      url: $scope.fUrl.resources,
      method: 'get',
      headers: {
        'Authorization': $scope.fUrl.token
      }
    }).then(function(response) {
      $scope.resources = response.data;
    }, function(response) {
      // TODO error
    });

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      //defaultDate: '2017-11-12',
      navLinks: true, // can click day/week names to navigate views
      defaultView: 'agendaWeek',

      slotDuration: '00:15:00',
      minTime: '07:00:00',
      maxTime: '20:00:00',

      weekNumbers: true,
      weekNumbersWithinDays: true,
      weekNumberCalculation: 'ISO',

      editable: true,
      eventLimit: true, // allow "more" link when too many events
      timeFormat: 'H(:mm)',
      slotLabelFormat: 'H(:mm)',

      // Load all events
      events: function (start, end, timezone, callback) {
        $http({
          url: $scope.fUrl.path,
          method: 'get',
          headers: {
            'Authorization': $scope.fUrl.token
          },
          data: {
            items: url('#').items,
            start: start.unix(),
            end: end.unix()
          }
        }).then(function(response) {
          callback(response.data);
        }, function(response) {
          // TODO error
        });
      },
      dayClick: function (date, jsEvent, view) {

        $mdDialog.show({
          controller: function ($scope, $mdDialog, scopeParent, date) {
            $scope.resources = scopeParent.resources;
            $scope.date = date;

            $scope.add = function(resource) {
              scopeParent.getResourceConfig(resource);
            };

            $scope.hide = function() {
              $mdDialog.hide();
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
            };
          },
          locals: {
            scopeParent: $scope,
            date : date
          },
          templateUrl: 'resources.tmpl.html',
          parent: angular.element(document.body),
          //targetEvent: ev,
          clickOutsideToClose:true
        }).then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      }
    });
  };



}]);
