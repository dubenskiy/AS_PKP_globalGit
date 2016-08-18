/**
 * Created by DubenskiyAA on 29.07.2016.
 */

"use strict";

angular.module('asPkpApp.myResizer.directive', [])

    .directive("myResizer", function ($window, $document, $log) {
            function linker($scope, $element, $attr) {

                // var scrollDiv = document.getElementById('' + $attr.scrollDiv);
                // var elems = document.getElementById('' + $attr.rightContent).childNodes;
                // elems = Array.prototype.slice.call(elems); // теперь elems - массив
                // scrollDiv.style.height = elems[2].clientHeight + 'px';


                // elems.forEach(function(elem) {
                //     $log.warn( elem ); // HEAD, текст, BODY
                // });

                // $log.warn(elems[2].clientHeight);


                // вверх-вниз
                if ($attr.orientation === 'vertical') {
                    var sliderElemY = document.getElementById('slider-y'),
                        topContent = document.getElementById('' + $attr.topContent),
                        bottomContent = document.getElementById('' + $attr.bottomContent);


                    // устанавливаю первоначальный отступ полосы прокрутки
                    var topContentCoords = getCoords(topContent);
                    sliderElemY.style.top = topContent.clientHeight  + +$attr.indent + 16 + 'px';
                    sliderElemY.style.left = topContentCoords.left + (topContent.clientWidth / 2) + 'px';

                    sliderElemY.onmousedown = function (event) {

                        // получаю координаты
                        var sliderElemCoords = getCoords(sliderElemY);
                        // https://learn.javascript.ru/article/drag-and-drop/ball_shift.png
                        var sliderShiftY = event.pageY - sliderElemCoords.top;

                        document.onmousemove = function (event) {
                            // $attr.indent - отступ от края экрана до родительского блока
                            var newSliderElemTop = event.pageY - sliderShiftY - $attr.indent;

                            // ограничители
                            if (newSliderElemTop > +$attr.max) {
                                newSliderElemTop = $attr.max;
                                // $log.warn('max');
                            }
                            if (newSliderElemTop < +$attr.min) {
                                newSliderElemTop = $attr.min;
                                // $log.warn('min');
                            }

                            sliderElemY.style.top = +newSliderElemTop + +$attr.indent + 'px';
                            topContent.style.height = +newSliderElemTop + 'px';
                            // bottomContent.style.top = +newBottomContentTop + 'px';
                        };

                        document.onmouseup = function () {
                            document.onmousemove = document.onmouseup = null;
                        };

                        return false; // disable selection start (cursor change)
                    }
                } else if ($attr.orientation === 'horizontal') {

                    var sliderElemX = document.getElementById('slider-x'),
                        leftContent = document.getElementById('' + $attr.leftContent),
                        rightContent = document.getElementById('' + $attr.rightContent),
                        parentDiv = document.getElementById('parentDiv');

                    sliderElemX.style.left = parseInt((leftContent.clientWidth * 100) / parentDiv.clientWidth) + '%';
                    rightContent.style.width = 99 - parseInt(sliderElemX.style.left) + '%';

                    sliderElemX.onmousedown = function (event) {

                        // получаю координаты
                        var sliderElemCoords = getCoords(sliderElemX);
                        var sliderShiftX = event.pageX - sliderElemCoords.left;

                        document.onmousemove = function (event) {
                            // $attr.indent - отступ от края экрана до родительского блока
                            var newSliderElemLeft = event.pageX - sliderShiftX;

                            // ограничители
                            if (newSliderElemLeft > +$attr.max) {
                                newSliderElemLeft = $attr.max;
                            }
                            if (newSliderElemLeft < +$attr.min) {
                                newSliderElemLeft = $attr.min;
                            }

                            sliderElemX.style.left = parseInt((newSliderElemLeft * 100) / parentDiv.clientWidth) + '%';
                            leftContent.style.width = parseInt((newSliderElemLeft * 100) / parentDiv.clientWidth) + '%';
                            rightContent.style.width = 99 - parseInt((newSliderElemLeft * 100) / parentDiv.clientWidth) + '%';
                        };

                        document.onmouseup = function () {
                            document.onmousemove = document.onmouseup = null;
                        };

                        return false; // disable selection start (cursor change)
                    }
                }

                function getCoords(elem) { // кроме IE8-
                    var box = elem.getBoundingClientRect();
                    // $log.warn(box);
                    return {
                        top: box.top + pageYOffset,
                        left: box.left + pageXOffset,
                        bottom: box.bottom + pageYOffset
                    };
                }
            }

            return {
                restrict: 'EA',
                link: linker
            };
        }
    );


