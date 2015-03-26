/**
 * Created by sergey on 26.03.15.
 */

module.exports = function($timeout) {



    return {
        restrict: 'E',
        templateUrl: 'layout/component.field-multi-select.html',
        scope: {
            /* {array} objects */
            select: '=',
            /* {array} ids */
            values: '=',
            /* {string} display prop name */
            display: '@',
            /* {string} store prop name */
            store: '@',
            /* {string} namespace for directive */
            name: '@',
            /* {string} custom id */
            id: '@',
            /* {string} placeholder */
            placeholder: '@'
        },
        link: function($scope, $element) {

            var req = {
                action: null,
                id: $scope.id,
                values: $scope.values
            };

            var eventName = 'fieldMultiSelect' + ($scope.name ? ('.'+ $scope.name) : '');

            $scope.display = $scope.display || '_id';
            $scope.placeholder = $scope.placeholder || 'выберите из списка...';
            $scope.dropdown = false;

            $scope.flip = function(e) {
                e.stopPropagation();
                $scope.dropdown = !$scope.dropdown;
            };

            $scope.get = function(id) {
                return _.findWhere($scope.select, {_id: id})[$scope.display];
            };

            $scope.set = function(e, object) {
                $scope.values.push(object._id);
                $scope.$emit(eventName, _.defaults({action: 'add'}, req))
            };

            $scope.remove = function(e) {
                $scope.values.splice($scope.values.indexOf(e._id),1);
                $scope.$emit(eventName, _.defaults({action: 'remove'}, req))
            };

            $scope.flt = function() {
                return _.filter($scope.select, function(e) {
                    return $scope.values.indexOf(e._id) == -1;
                });
            };

            var $dropdown = $($element).find('.dropdown');
            function exit(e) {
                if($scope.dropdown) {
                    if (!$dropdown.is(e.target) // if the target of the click isn't the container...
                        && $dropdown.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        $timeout(function() {$scope.dropdown = false})
                    }

                }
            }
            $(window).on('mouseup', exit);
            $scope.$on('$destroy', function() {$(window).off('click',exit)})
        }
    }
};