
var module = angular.module("example", ["angularGrid"]);

module.controller("exampleCtrl", function($scope, $http) {

    var columnDefs = [
        {displayName: "Athlete", field: "athlete", width: 150, cellRenderer: athleteCellRendererFunc},
        {displayName: "Age", field: "age", width: 90, cellRenderer: ageCellRendererFunc},
        {displayName: "Country", field: "country", width: 120, cellRenderer: countryCellRendererFunc},
        {displayName: "Year", field: "year", width: 90},
        {displayName: "Date", field: "date", width: 110},
        {displayName: "Sport", field: "sport", width: 110},
        {displayName: "Gold", field: "gold", width: 100},
        {displayName: "Silver", field: "silver", width: 100},
        {displayName: "Bronze", field: "bronze", width: 100},
        {displayName: "Total", field: "total", width: 100}
    ];

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: [],
        angularCompile: true
    };

    function ageClicked(age) {
        window.alert("Age clicked: " + age);
    }

    function athleteCellRendererFunc() {
        return '<span ng-bind="rowData.athlete"></span>';
    }

    function ageCellRendererFunc(value, data, colDef, $childScope) {
        $childScope.ageClicked = ageClicked;
        return '<button ng-click="ageClicked(rowData.age)" ng-bind="rowData.age"></button>';
    }

    function countryCellRendererFunc(value) {
        return '<country name="'+value+'"></country>';
    }

    $http.get("../olympicWinners.json")
        .then(function(res){
            $scope.gridOptions.rowData = res.data;
            $scope.gridOptions.api.onNewRows();
        });
});

module.directive('country', function () {

    var FLAG_CODES = {
        'Ireland': 'ie',
        'United States': 'us',
        'Russia': 'ru',
        'Australia': 'au',
        'Canada': 'ca',
        'Norway': 'no',
        'China': 'cn',
        'Zimbabwe': 'zw',
        'Netherlands': 'nl',
        'South Korea': 'kr',
        'Croatia': 'hr',
        'France': 'fr'
    };

    var flagHtml = '<img ng-show="flagCode" class="flag" border="0" width="20" height="15" src="http://flags.fmcdn.net/data/flags/mini/{{flagCode}}.png" />';
    var nameHtml = '<span ng-bind="countryName" />';

    return {
        scope: true,
        template: flagHtml + ' ' + nameHtml,
        link: function(scope, element, attrs) {
            var countryName = attrs.name;
            scope.countryName = countryName;
            scope.flagCode = FLAG_CODES[countryName];
        }
    };
});