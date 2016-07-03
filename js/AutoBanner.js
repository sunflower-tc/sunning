/**
 * Created by xiao lei on 2016/5/29.
 */
function AutoBanner(curEle, interval) {
    this.oBox = document.getElementById(curEle);
    this.oImgWrap = this.oBox.getElementsByTagName('ul')[0];
    this.aLi = this.oImgWrap.getElementsByTagName('li');

    this.oNav = this.oBox.getElementsByTagName('div')[0];
    this.aList = this.oNav.getElementsByTagName('a');
    this.oBtnLeft = this.oBox.getElementsByTagName('a')[3];
    this.oBtnRight =this.oBox.getElementsByTagName('a')[4];

    this.step = 0;
    this.autoTimer = null;
    this.interval = interval || 2000;
    return this.init();
}

AutoBanner.prototype = {
    constructor: AutoBanner,
    init: function () {
        var _this = this;

        clearInterval(_this.autoTimer);
        this.autoTimer = setInterval(function () {
            _this.autoMove();
        }, _this.interval);
        this.setBanner();

        this.stopStart();

        this.handleChange();

        this.leftRight();

        return this;
    },

    autoMove: function autoMove() {
        if (this.step >= this.aLi.length - 1) {
            this.step = -1;
        }
        this.step++;
        this.setBanner();
    },
    setBanner: function setBanner() {
        var _this = this;

        for (var i = 0; i < _this.aLi.length; i++) {

            var curDiv = _this.aLi[i];

            if (i === _this.step) {
                utils.css(curDiv, 'zIndex', 1);
                zhufengAnimate(curDiv, {'opacity': 1}, 700, function () {
                    var siblings = utils.siblings(this);

                    for (var i = 0; i < siblings.length; i++) {
                        utils.css(siblings[i], 'opacity', 0);
                    }
                });
                continue;
            }
            utils.css(curDiv, 'zIndex', 0)
        }
        _this.bannerTip();
    },
    bannerTip: function bannerTip() {
        for (var i = 0; i < this.aList.length; i++) {
            var curLi = this.aList[i];
            i === this.step ? utils.addClass(curLi, 'current') : utils.removeClass(curLi, 'current');
        }
    },
    stopStart: function stopStart() {
        var _this = this;

        _this.oBox.onmouseover = function () {
            clearInterval(_this.autoTimer);

            utils.css(_this.oBtnLeft, 'display', 'block');
            utils.css(_this.oBtnRight, 'display', 'block');
        };
        _this.oBox.onmouseout = function () {
            _this.autoTimer = setInterval(function () {
                _this.autoMove();
            }, _this.interval);
            utils.css(_this.oBtnLeft, 'display', 'none');
            utils.css(_this.oBtnRight, 'display', 'none');
        };
    },
    handleChange: function handleChange() {
        var _this = this;
        for (var i = 0; i < _this.aList.length; i++) {
            var curLi = _this.aList[i];
            curLi.index = i;
            curLi.onclick = function () {
                _this.step = this.index;
               _this.setBanner();
            }
        }
    },
    leftRight: function () {
        var _this = this;
        _this.oBtnRight.onclick = function () {
            _this.autoMove();
        };
        _this.oBtnLeft.onclick = function () {
            if (_this.step <= 0) {

                _this.step = _this.aLi.length;
            }
            _this.step--;
            _this.setBanner();
        }
    }


};

window.AutoBanner = AutoBanner;






