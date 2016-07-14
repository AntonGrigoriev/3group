System.register(['@angular/platform-browser-dynamic', './common/constants/constants.data', './app.component', '@angular/http', '@angular/common', '@angular/router', './app.routes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, constants_data_1, app_component_1, http_1, common_1, router_1, app_routes_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (constants_data_1_1) {
                constants_data_1 = constants_data_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
                http_1.HTTP_PROVIDERS, app_routes_1.APP_ROUTER_PROVIDERS, router_1.ROUTER_DIRECTIVES, constants_data_1.Constants,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map