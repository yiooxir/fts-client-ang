/**
 * Created by sergey on 18.03.15.
 */

module.exports = function($timeout, $parse) {
    var defOptions = {
        onChange: function() {/*stub*/}
    };

    return {
        restrict: "E",
        templateUrl: "/layout/component.field-date.html",
        scope: {
            value: '='
        },
        compile: function($element, $attr) {

            return function($scope, $element) {
                $scope.editMode = false;
                $element = $($element);

                var get = $parse($attr.options);
                var options = null;

                $timeout(function() {
                    options = get($scope.$parent) || {};
                    options = _.defaults(options, defOptions);
                });

                $element.find('#sandbox-container div').datepicker({
                    startView: 0,
                    language: "ru",
                    todayHighlight: true,
                    autoclose: true
                })
                    .on('changeDate', function(e){
                        console.log(e);
                        $timeout(function() {
                            $scope.editMode = false;
                            $scope.value = e.date;
                            options.onChange($scope.value);
                        });
                    });


            }
        }
    }
};