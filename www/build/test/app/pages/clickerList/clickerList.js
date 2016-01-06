'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_1 = require('ionic-framework/ionic');
var clickers_1 = require('../../services/clickers');
var clickerButton_1 = require('../../components/clickerButton/clickerButton');
var ClickerList = (function () {
    function ClickerList(nav, clickerService) {
        this.nav = nav;
        this.clickerService = clickerService;
        this.title = 'Clickers';
    }
    ClickerList.prototype.newClicker = function (name) {
        if (!name) {
            // TODO - validate
            return false;
        }
        this.clickerService.newClicker(name);
        // TODO - clear text on input field
    };
    ClickerList = __decorate([
        ionic_1.Page({
            templateUrl: 'app/pages/clickerList/clickerList.html',
            providers: [clickers_1.Clickers],
            directives: [clickerButton_1.ClickerButton],
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, clickers_1.Clickers])
    ], ClickerList);
    return ClickerList;
})();
exports.ClickerList = ClickerList;
