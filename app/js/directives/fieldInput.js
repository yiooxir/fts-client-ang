/**
 * Created by sergey on 18.03.15.
 */

module.exports = function($timeout, $parse) {

    var defOptions = {
        onChange: function() {/*stub*/}
    };

    return {
        restrict: "E",
        templateUrl: '/layout/component.field-input.html',
        scope: {
            value: '='
        },
        link: function($scope, $element, $attr) {
            $element = $($element);
            var get = $parse($attr.options);
            var options = null;
            var $input = $element.find('input');
            var cacheValue = null;
            $scope.editMode = false;

            $scope.$watch('editMode', function(val) {
                if (val) {
                    $timeout(function() {$input.focus()});
                    cacheValue = $scope.value;
                }
            });

            $timeout(function() {
                options = get($scope.$parent) || {};
                options = _.defaults(options, defOptions);
            });


            function exitEditMode() {
                cacheValue = null;
                $scope.editMode = false;
            }

            $scope.change = function() {
                options.onChange($scope.value);
                exitEditMode();
            };

            $scope.esc = function() {
                $scope.value = cacheValue;
                exitEditMode();
            };

            $scope.keyHandler = function($event) {

                switch ($event.keyCode) {
                    /* press Enter */
                    case 13:
                        $scope.change();
                        break;

                    /* press Esc */
                    case 27:
                        $scope.esc();
                        break;
                }

            };
         }
    }
};