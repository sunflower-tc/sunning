/*

 * 小tips：
 *    在侧边购物车添加鼠标移入移除效果

 *
 * */
/*轮播图*/
(function () {
    var oBox = document.getElementById('banner-wrapper');
    var oImgWrap = oBox.getElementsByTagName('ul')[0];
    var aDiv = oImgWrap.getElementsByTagName('li');
    var aImg = oImgWrap.getElementsByTagName('img');
    var oUl = document.getElementById("banner-nav");
    var aLi = oUl.getElementsByTagName('a');
    var oBtnLeft = document.getElementById("prev");
    var oBtnRight = document.getElementById("next");

    var autoTimer = null;
    var step = 0;
    var interval = 2000;
    utils.css(aDiv[0], 'zIndex', 1);
    zhufengAnimate(aDiv[0], {'opacity': 1}, 500);
//1.自动播放的轮播图
    autoTimer = setInterval(autoMove, interval);
    function autoMove() {
        if (step >= aDiv.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < aDiv.length; i++) {
            var curDiv = aDiv[i];
            if (i === step) {
                utils.css(curDiv, 'zIndex', 1);
                zhufengAnimate(curDiv, {'opacity': 1}, 600, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        utils.css(siblings[i], 'opacity', 0);
                    }
                });
                continue;
            }
            utils.css(curDiv, 'zIndex', 0)
        }
        bannerTip();
    }

//2.焦点图自动切换
    function bannerTip() {
        for (var i = 0; i < aLi.length; i++) {
            var curLi = aLi[i];
            i === step ? utils.addClass(curLi, 'current') : utils.removeClass(curLi, 'current');
        }
    }

//3.鼠标移入停止，移出继续
    stopStart();
    function stopStart() {
        oBox.onmouseover = function () {
            clearInterval(autoTimer)
            utils.css(oBtnLeft, 'display', 'block');
            utils.css(oBtnRight, 'display', 'block');
        };
        oBox.onmouseout = function () {
            autoTimer = setInterval(autoMove, interval);
            utils.css(oBtnLeft, 'display', 'none');
            utils.css(oBtnRight, 'display', 'none');
        };
    }

//4.点击焦点，手动切换
    handleChange();
    function handleChange() {
        for (var i = 0; i < aLi.length; i++) {
            var curLi = aLi[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                setBanner();
            }
        }
    }

//5.左右轮播
    oBtnRight.onclick = autoMove;
    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aDiv.length;
        }
        step--;
        setBanner();
    }
})()

/*轮播图旁边选项卡*/

var inforContent = document.getElementById('inforContent');
var oTab = document.getElementById("inforNav");
var oLi = oTab.getElementsByTagName("li");
var inforList = document.getElementById("inforList");
var oDiv = inforList.getElementsByTagName("div");

for (var i = 0; i < oLi.length; i++) {
    oLi[i].index = i;//获取当前的索引

    oLi[i].onclick = function () {

        for (var j = 0; j < oLi.length; j++) {
            oLi[j].className = null;
        }
        this.className = 'on';

        oDiv[this.index].style.display = 'block';
        var ary = [];
        ary = utils.siblings(oDiv[this.index]);
        for (var i = 0; i < ary.length; i++) {
            var cur = ary[i];
            cur.style.display = "none";
        }
    }
}
/*里面的小选项卡*/

var appList = document.getElementById("appList");
var pSpan = appList.getElementsByTagName("span");
var codeList = document.getElementById("codeList");
var pLi = codeList.getElementsByTagName("li");

for (var i = 0; i < pSpan.length; i++) {
    pSpan[i].index = i;//获取当前的索引

    pSpan[i].onclick = function () {

        for (var j = 0; j < pSpan.length; j++) {
            pSpan[j].className = null;
        }
        this.className = 'current';

        pLi[this.index].style.display = 'block';
        var ary = [];
        ary = utils.siblings(pLi[this.index]);
        for (var i = 0; i < ary.length; i++) {
            var cur = ary[i];
            cur.style.display = "none";
        }
    }
}
/*轮播图小*/


(function () {
    var oBox1 = document.getElementById('wraRight');
    var oImgWrap = oBox1.getElementsByTagName('ul')[0];
    var aDiv = oImgWrap.getElementsByTagName('li');
    var aImg = oImgWrap.getElementsByTagName('img');
    var oBtnLeft = oBox1.getElementsByTagName('a')[0];
    var oBtnRight = oBox1.getElementsByTagName('a')[1];
    var autoTimer = null;
    var interval = 1000;
    var step = 0;
    var data = null;
    var setTimer = null;
    getData();
    function getData() {
        var xml = new XMLHttpRequest();
        xml.open('get', 'json/data.json?_=' + Math.random(), false);

        xml.onreadystatechange = function () {
            if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
                  data = utils.jsonParse(xml.responseText);
            }
        };
        xml.send();
    }

    bind();
    function bind() {
        var str = '';
        var str2 = '';
        for (var i = 0; i < data.length; i++) {
            str += '<li>\
                <div><a href=""><img src="' + data[i].imgSrc1 + '" alt=""/></a></div>\
            <div><a href=""><img src="' + data[i].imgSrc2 + '" alt=""/></a></div>\
            <div><a href=""><img src="' + data[i].imgSrc3 + '" alt=""/></a></div>\
            <div><a href=""><img src="' + data[i].imgSrc4 + '" alt=""/></a></div>\
            </li>';
        }

        oImgWrap.innerHTML = str;
    }

    oImgWrap.style.width = aDiv.length * aDiv[0].offsetWidth + 'px';
    setTimer = setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0; i < aImg.length; i++) {
            (function (index) {
                var curImg = aImg[index];
                var oImg = new Image;
                oImg.src = curImg.getAttribute('realImg');
                oImg.onload = function () {
                    curImg.src = this.src;
                    oImg = null;
                }
            })(i);
        }
    }

    function autoMove() {
        if (step >= aDiv.length - 1) {
            step = 0;
            utils.css(oImgWrap, 'left', 0)
        }
        step++;
        zhufengAnimate(oImgWrap, {'left': -step * 1200}, 200);
    }

    stopStart();
    function stopStart() {
        oBox1.onmouseover = function () {
            utils.css(oBtnLeft, 'display', 'block');
            utils.css(oBtnRight, 'display', 'block');
        };
        oBox1.onmouseout = function () {
            utils.css(oBtnLeft, 'display', 'none');
            utils.css(oBtnRight, 'display', 'none');
        };
    }

    oBtnRight.onclick = autoMove;
    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aDiv.length - 1;
            utils.css(oImgWrap, 'left', -step * 1200)
        }
        step--;
        zhufengAnimate(oImgWrap, {'left': -step * 1200}, 200);
    };
})();

/*楼层里面的轮播图*/

var oTab = new AutoBanner('slider1', 1500);
var oTab1 = new AutoBanner('slider2', 1500);
var oTab2 = new AutoBanner('slider3', 1500);
var oTab3 = new AutoBanner('slider4', 1500);
var oTab4 = new AutoBanner('slider5', 1500);
var oTab5 = new AutoBanner('slider6', 1500);
var oTab6 = new AutoBanner('slider7', 1500);
var oTab7 = new AutoBanner('slider8', 1500);
var oTab8 = new AutoBanner('slider9', 1500);
var oTab9 = new AutoBanner('slider10', 1500);
var oTab10 = new AutoBanner('slider11', 1500);
/*楼层*/
(function () {
    var floatBar = document.getElementById("floatBar");
    var aUl = floatBar.getElementsByTagName("ul")[0];
    var aLi = aUl.getElementsByTagName("li");
    var fl1 = document.getElementById("f1");
    var fl12 = document.getElementById("f12");
    var target = 0;
    var maxH = utils.offset(fl12).top + fl12.offsetHeight;
    var minElement = fl1.getElementsByTagName("h3")[0];
    var cH = document.documentElement.clientHeight || document.body.clientHeight;
    var minTop = utils.offset(minElement).top;
    document.addEventListener("scroll", function () {
        var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrTop + cH >= minTop && scrTop <= maxH) {
            floatBar.style.display = "block";
        }
        else {
            floatBar.style.display = "none";
        }
    });
    //点击到指定楼层
    var fl2 = document.getElementById("f2");
    var fl3 = document.getElementById("f3");
    var fl4 = document.getElementById("f4");
    var fl5 = document.getElementById("f5");
    var fl6 = document.getElementById("f6");
    var fl7 = document.getElementById("f7");
    var fl8 = document.getElementById("f8");
    var fl9 = document.getElementById("f9");
    var fl10 = document.getElementById("f10");
    var fl11 = document.getElementById("f11");

    var f1T = utils.offset(fl1).top;
    var f2T = utils.offset(fl2).top;
    var f3T = utils.offset(fl3).top;
    var f4T = utils.offset(fl4).top;
    var f5T = utils.offset(fl5).top;
    var f6T = utils.offset(fl6).top;
    var f7T = utils.offset(fl7).top;
    var f8T = utils.offset(fl8).top;
    var f9T = utils.offset(fl9).top;
    var f10T = utils.offset(fl10).top;
    var f11T = utils.offset(fl11).top;
    var f12T = utils.offset(fl12).top;
    var ary = [f1T, f2T, f3T, f4T, f5T, f6T, f7T, f8T, f9T, f10T, f11T, f12T];
    var aAs = utils.getByClass(floatBar, "name");

    for (var i = 0; i < aAs.length; i++) {
        aAs[i].index = i;
        aAs[i].onclick = function () {
            step = this.index;
            var _this = this;
            var timer = setInterval(function () {
                var curTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (curTop > ary[_this.index]) {
                    curTop -= 50;
                    if (curTop <= ary[_this.index]) {
                        curTop = ary[_this.index];

                        window.clearInterval(timer);
                        return;
                    }
                    document.documentElement.scrollTop = curTop;
                    document.body.scrollTop = curTop;
                    onShow();
                }
                if (curTop < ary[_this.index]) {
                    curTop += 50;
                    if (curTop >= ary[_this.index]) {
                        curTop = ary[_this.index];

                        window.clearInterval(timer);
                        return;
                    }
                    document.documentElement.scrollTop = curTop;
                    document.body.scrollTop = curTop;
                    onShow();
                }
            }, 20);
            document.addEventListener("mousewheel", function () {
                clearInterval(timer);
            })
        }
    }
    ;
    function onShow() {
        for (var i = 0; i < aLi.length; i++) {
            var curLi = aLi[i];
            i === step ? utils.addClass(curLi, 'on hover') : utils.removeClass(curLi, 'on hover');
        }
    }
})();
/*楼层浮动选项卡hover*/
(function () {
    function changeTab(curEle1, curEle2) {
        this.floorTab = document.getElementById(curEle1);
        this.fLis = this.floorTab.getElementsByTagName("li");
        this.sSpan = this.floorTab.getElementsByTagName("span");
        this.textEm = this.floorTab.getElementsByTagName("em");
        this.floorDiv = document.getElementById(curEle2);
        this.fDivs = utils.children(this.floorDiv, "div");

        for (var i = 0; i < this.fLis.length; i++) {
            this.fLis[i].index = i;//获取当前的索引
            var _this = this;
            this.fLis[i].onmouseover = function () {
                for (var j = 0; j < _this.fLis.length; j++) {
                    _this.textEm[j].className = "";
                    _this.sSpan[j].className = "";
                }
                _this.textEm[this.index].className = "hover-font";
                _this.sSpan[this.index].className = "up-arrow";
                _this.fDivs[this.index].style.display = 'block';
                var ary = [];
                ary = utils.siblings(_this.fDivs[this.index]);
                for (var i = 0; i < ary.length; i++) {
                    var cur = ary[i];
                    cur.style.display = "none";
                }
            }
        }

    }

    var floorTab1 = new changeTab('floorTab1', "floorDiv1");
    var floorTab2 = new changeTab('floorTab2', "floorDiv2");
    var floorTab3 = new changeTab('floorTab3', "floorDiv3");
    var floorTab4 = new changeTab('floorTab4', "floorDiv4");
    var floorTab5 = new changeTab('floorTab5', "floorDiv5");
    var floorTab6 = new changeTab('floorTab6', "floorDiv6");
    var floorTab7 = new changeTab('floorTab7', "floorDiv7");
    var floorTab8 = new changeTab('floorTab8', "floorDiv8");
    var floorTab9 = new changeTab('floorTab9', "floorDiv9");
    var floorTab10 = new changeTab('floorTab10', "floorDiv10");
    var floorTab11 = new changeTab('floorTab11', "floorDiv11");
    var floorTab12 = new changeTab('floorTab12', "floorDiv12");
})();

/*网页底底部*/
~function () {

    var hotMain = document.getElementById('hotMain');
    var hotDiv = hotMain.getElementsByClassName('hots-and-share-item');

    var hotUl = document.getElementById("hotNav")
    var hLi = hotUl.getElementsByTagName('li');
    var hotLeft = document.getElementById("upBtn");
    var hotRight = document.getElementById("downBtn");
    var autoTimer = null;
    var step = 0;
    var interval = 1000;

    /*克隆*/
    var firstItem = document.getElementById("firstItem");
    var oDivClone = firstItem.cloneNode(true);
    hotMain.appendChild(oDivClone);

    hotMain.style.width = hotDiv.length * hotDiv[0].offsetWidth + 'px';

    for (var i = 0; i < hLi.length; i++) {
        hLi[i].index = i;

        hLi[i].onclick = function () {
            step = this.index;//点击焦点的索引也是相对应图片的索引
            //oInner往左移动的距离 = 图片的索引(index)*图片的宽度(500);
            zhufengAnimate(hotMain, {'left': -step * 997}, 500);
            selectCur(step);
        }
    }
    ;
    function selectCur(n) {//n点击元素的索引
        if(n==3){
            n=0;
        }
        if(n===-1){
            n=3;
        }
        for (var i = 0; i < hLi.length; i++) {
            hLi[i].className = "";
        }
        hLi[n].className = "current";
    };
    hotRight.onclick = function () {
        step++;
        if (step > 3) {
            hotMain.style.left=0;
            step = 1;
        }
        zhufengAnimate(hotMain, {'left': -step * 997}, 500);

        selectCur(step);
    }
    hotLeft.onclick = function () {

        step--;
        if(step<0){
            step=2;
            hotMain.style.left=-(hotDiv.length-1)*997+"px";
        }

        zhufengAnimate(hotMain, {'left': -step * 997}, 500);

        selectCur(step);
    }

}();

/*搜索框聚焦显示*/
var keyBox = document.getElementById("keyBox");
var close = document.getElementById("close");
var searchDel = document.getElementById("searchDel");

keyBox.onfocus = function () {
    searchDel.style.display = "block";
};
close.onclick = function () {
    searchDel.style.display = "none";
}


/*网页遮罩层*/

var actShow = document.getElementById("actShow");
var closeBtn = document.getElementById("closeBtn");
var diaShow = document.getElementById("diaShow");

closeBtn.onclick = function () {
    actShow.style.display = "none";
    diaShow.style.display = "none";
}
/*回到顶部*/
var goTop=document.getElementById('goTop');
goTop.onclick=function(){
var target=utils.win('scrollTop');
var duration=500;
    var interval=20;
    var step=(target/duration)*interval;

    var timer=window.setInterval(function(){
        var curTop=utils.win('scrollTop');
        if(curTop===0){
            window.clearInterval(timer);
            return;
        }
        curTop-=step;
        utils.win('scrollTop',curTop);
 },interval)


}