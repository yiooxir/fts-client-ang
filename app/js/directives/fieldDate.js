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
            object: '=',
            field: '@'
        },

        compile: function($element, $attr) {

            return function($scope, $element) {

                $scope.value = $scope.object[$scope.field];
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
                        $timeout(function() {
                            $scope.editMode = false;
                            $scope.value = e.date;
                            options.onChange({
                                affectedField: $scope.field,
                                object: $scope.object,
                                value: e.date,
                                hash: (function() {var v = {}; v[$scope.field] = $scope.value; return v})()
                            });
                        });
                    });


            }
        }
    }
};