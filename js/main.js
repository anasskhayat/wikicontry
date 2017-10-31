
var boostrap = (function() {
    var module = {};
    var self = module;

   module.init = function() {
        rest.getData();
    };

   return {
        init: module.init
    };

})();

var rest = (function() {
    var module = {};
    var self = module;

   module.getData = function() {
        $.get('https://restcountries.eu/rest/v2/all').done(function(data) {
            console.log(data);
        });
    };

   return {
        getData: module.getData
    };

})();


$(document).ready(function() {
    boostrap.init();
    var models = (function() {
    var module = {};

   module.allCountries = [];

   module.setAllCountries = function(data) {
        module.allCountries = data;
    };
    module.getAllCountries = function(data) {
        return module.allCountries;
    };

   return {
        setAllCountries: module.setAllCountries,
        getAllCountries: module.getAllCountries
    }


})();
});