# simple-ng-data-table
A demo of Angular Directive's *link function* with *isolated scope* and *two way binding* demo.
This directive creates a table from a given array of objects.

See at the botton to check how to add new row to the table. The primary purpose of this code is to understand how directives work.

To add new rows do the following on chrome dev console:

Use the following sample HTML file.
```html

<!DOCTYPE html>
<html>

<script src="http://code.jquery.com/jquery-2.2.2.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
<script src="simple-ng-data-table.js"></script>

<script>
var app = angular.module("myApp", []);
app.controller('rootCtrl',['$scope', function($scope) {
	$scope.data = [{"fname":"JJ", "lname":"Abrams"}];
}]);
app.directive("simpleDataTable", ["$compile", me.nachis.SimpleTableNgDirective]);
</script>

<body ng-app="myApp" ng-controller="rootCtrl">

<div id="d">{{data}}</div>
<simple-data-table table-data="data" delete-row-option></simple-data-table>

</body>
</html>


```

```javascript
var e = $("#d");
var s = angular.element(e).scope();
s.tdata.push({"fname":"michale", "lname":"jackson"});
s.$apply();
```
