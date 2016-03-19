/**
 * This directive assumes we are using jQuery.
 * A demostration of a very simple reusable component.
 * This directive creates a simple data table and diplays it. The table also provides a way to delete rows.
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

		return {
			//scope: false, // false: use parents scope, true: create own scope
			scope : { // This is how to create isolated scope.
				// this isolated scope makes this directive a reusable component
				// This scope is completely a new object
				tableData: '=tableData',            // The = sign indicates that this is a two way binding
				deleteRowOption: '@deleteRowOption', // The @ indicates text binding
				tableStyle: '@tableStyle'
			},

			link: function (scope, element, attrs, controller, transcludeFn) {

				function updateTable(tdata)
				{
					if(tdata.length <= 0) {
						return;
					}
					element.html('<table style="{{tableStyle}}"></table>');
					var tbl = element.find('table');

					var row = $('<tr ng-repeat="r in tableData track by $index">').appendTo(tbl);
					var c = 0;
					for(var k in tdata[0]) {
						console.log(k);
						var td = $('<td>{{r.'+k+'}}</td>').appendTo(row);
						//td.text(colData[k]);
						c++;
					}

					if(scope.deleteRowOption != undefined && scope.deleteRowOption !== "false") {
						$('<td><button ng-click="tableData.splice($index, 1);">delete</button></td>').appendTo(row);
					}
					$compile(element.contents())(scope);
				};
				updateTable(scope.tableData);
			}
		};
	};

})();