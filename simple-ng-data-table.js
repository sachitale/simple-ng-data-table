/**
 * This directive assumes we are using jQuery.
 * A demostration of a very simple reusable component.
 * This directive tables a simple data table and diplays it. The table also provides a way to delete rows.
 * Sample use:
 *
 * <script>
 * var app = angular.module("myApp", []);
 * app.controller('rootCtrl',['$scope', function($scope) {
 *	 $scope.data = [{"fname":"JJ", "lname":"Abrams"}];
 * }]);
 * app.directive("simpleDataTable", ["$compile", me.nachis.SimpleTableNgDirective]);
 * </script>
 *
 * ...
 *
 * <simple-data-table table-data="data" delete-row-option></simple-data-table>
 * OR
 * <simple-data-table table-data="data"></simple-data-table>
 * 
 */
(function () {

	'use strict';

	// assume window object is always present

	var me = null;

	if(window) {
		me = window.me || {};
		window.me = me;
	}
	else {
		me = me || {};
	}

	me.nachis = me.nachis || {};

	/**
	 * @$compile : This directive uses $compile angular service
	 */
	me.nachis.SimpleTableNgDirective = function ($compile) {
		console.log(this);
		return {
			//scope: false, // false: use parents scope, true: create own scope
			scope : {
				tableData: '=tableData', // this makes it a reusable component, instead of setting scope as false
				deleteRowOption: '@deleteRowOption'
			},
			link: function link(scope, element, attrs, controller, transcludeFn) {

				function updateTable(tdata)
				{
					element.html('<table></table>');
					var tbl = element.find('table');

					for(var r=0; r<tdata.length; r++) {
						var row = $('<tr id="r'+r+'"></tr>').appendTo(tbl);
						var colData = tdata[r];
						var c = 0;
						for(var k in colData) {
							var td = $('<td id="c'+c+'"></td>').appendTo(row);
							td.text(colData[k]);
							c++;
						}

						if(scope.deleteRowOption != undefined && scope.deleteRowOption !== "false") {
							$('<td><button ng-click="tableData.splice('+r+', 1);">delete</button></td>').appendTo(row);
						}
					}
					$compile(element.contents())(scope);
				};

				scope.$watch('tableData', function(newValue, oldValue) {
					console.log("data modified");
					updateTable(newValue);
				}, true);

			} 
		};
	};

})();