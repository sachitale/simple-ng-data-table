/**
 * This directive assumes we are using jQuery.
 * A demostration of a very simple reusable component.
 * This directive creates a simple data table and diplays it. The table also provides a way to delete rows.
 * Sample use:
 *
 * <script>
 * var app = angular.module("myApp", []);
 * app.controller('rootCtrl',['$scope', function($scope) {
 *	 $scope.data =
		[]
		//[{"fname":"JJ", "lname":"Abrams"}]
	;
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
			scope : {
				// This is how to create isolated scope.
				// this isolated scope makes this directive a reusable component
				// This scope is completely a new object
				tableData: '=tableData',             // The = sign indicates that this is a two way binding
				deleteRowOption: '@deleteRowOption', // The @ indicates text binding
				tableStyle: '@tableStyle'
			},

			link: function (scope, element, attrs, controller, transcludeFn) {

				var tdata = scope.tableData;
				function updateData(tdata)
				{
					// console.log('called');
					if(!tdata.length || tdata.length <= 0) {
						element.css('display', 'none');
						return;
					}
					element.css('display', 'block');
					if(scope.tableStyle && scope.tableStyle.startsWith(".")) {
						element.html('<table class="{{tableStyle.substr(1)}}"></table>');
					}
					else {
						element.html('<table style="{{tableStyle}}"></table>');
					}
					var tbl = element.find('table');
					
					var idx = 0;
					var maxCols = -1;
					for(var i=0; i<tdata.length; ++i) {
						var colcount = 0;
						for (var k in tdata[i]) {
							if (tdata[i].hasOwnProperty(k)) {
								++colcount;
							}
						}
						if(colcount > maxCols) {
							idx = i;
						}
					}

					var row = $('<tr ng-repeat="r in tableData track by $index">').appendTo(tbl);
					for(var k in tdata[idx]) {
						var td = $('<td>{{r.'+k+'}}</td>').appendTo(row);
					}

					if(scope.deleteRowOption != undefined && scope.deleteRowOption !== "false") {
						$('<td><button ng-click="tableData.splice($index, 1);">delete</button></td>').appendTo(row);
					}
					$compile(element.contents())(scope);
				}
				updateData(tdata);
				scope.$watch(
					'tableData',
					function(newVal, oldVal, scope) {
						updateData(newVal);
					},
					true
				);
			}
		};
	};

})();