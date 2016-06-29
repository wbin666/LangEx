/**
 * Created by alex on 6/21/16.
 */
(function() {
    angular.module('reviewAvailTime', ['ui.calendar'])
        .controller('CalendarCtrl', CalendarCtrl);

    CalendarCtrl.$inject = ['$scope'];

    function CalendarCtrl($scope) {
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                header: {
                    left: 'month basicWeek basicDay',
                    center: 'title',
                    right: 'today prev,next'
                },

                timezone: 'local',
                //timeFormat: 'H:mm',
                timeFormat: 'H(:mm)',
                displayEventEnd: true,
                //eventLimit: true,

                //Todo:  to be defined for the close/remove button
                eventRender: function (event, element) {
                    element.append("<span class='closeon'>X</span>");
                    element.find(".closeon").click(function () {
                        console.log("the event is clicked to close : " + event._id);
                        //$scope.uiConfig.calendars['myCalendar'].fullCalendar('removeEvents', event._id);
                        //$('#myCalendar').fullCalendar('removeEvents',event._id);
                        //$('.langExcalendar').fullCalendar('removeEvents',event._id);
                        $scope.uiConfig.calendar.fullCalendar('removeEvents', event._id);

                    });
                }
            }
        };

        $scope.removeEv = function () {
            alert("removing the event");
        };

        $scope.availTimeFeedTrsf = function (rawData) {
            // the date time are stored as UTC
            //Here moment take an ISO/UTC string to a local time by default.
            //var startMoment = moment(rawData.availableDate+"T"+rawData.timeStart+":00.000Z");
            //var endMoment = moment(rawData.availableDate+"T"+rawData.timeEnd+":00.000Z");

            return {
                id: rawData._id,
                title: 'testTitle',
                //start: startMoment,
                //end: endMoment,
                start: rawData.availableDate + "T" + rawData.timeStart + ":00.000Z",   // Must-have or prerequesites in config:  timezone : 'local'
                end: rawData.availableDate + "T" + rawData.timeEnd + ":00.000Z",
                url: 'http://cn.bing.com'
                //allDay: false
            };
        };

        //just for test purpose
        // $scope.eventArray = {
        //     events: [
        //         {
        //             id: '1',
        //             title: 'event1',
        //             start: '2016-06-23'
        //         },
        //         {
        //             id: '2',
        //             title: 'event2',
        //             start: '2016-06-23',
        //             end: '2016-06-24'
        //         },
        //         {
        //             id: '3',
        //             title: 'event3',
        //             start: '2016-06-23T12:30:00',
        //             allDay: false // will make the time show
        //         },
        //         {
        //             id: '57689e6b3f3824b05cf6fa95',
        //             title: 'staticTest',
        //             start: '2016-06-24T02:30:00',
        //             end: '2016-06-24T11:30:00',
        //             url: 'http://www.baidu.com',
        //         }
        //     ],
        //     color: 'blue',
        //     textColor: 'white'
        // };

        $scope.availTimeJSON = {
            url: '/api/openAvailTime',
            type: 'GET',
            data: {
                userId: '001test'
            },
            color: 'green',
            textColor: 'white',
            cache: true,
            eventDataTransform: $scope.availTimeFeedTrsf
        };

        $scope.eventSources = [
            //$scope.eventArray,
            $scope.availTimeJSON
        ];
    }
})();