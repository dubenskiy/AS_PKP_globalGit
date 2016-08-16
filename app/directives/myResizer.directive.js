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
                if ($attr.orientation === 'horizontal') {
                    var sliderElemY = document.getElementById('slider-y'),
                        topContent = document.getElementById('' + $attr.topContent),
                        bottomContent = document.getElementById('' + $attr.bottomContent);


                    // устанавливаю первоначальный отступ полосы прокрутки
                    var topContentCoords = getCoords(topContent);
                    sliderElemY.style.top = topContentCoords.bottom - $attr.indent + 'px';

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
                            }
                            if (newSliderElemTop < +$attr.min) {
                                newSliderElemTop = $attr.min;
                            }

                            sliderElemY.style.top = +newSliderElemTop + 'px';
                            topContent.style.height = +newSliderElemTop + 'px';
                            // bottomContent.style.top = +newBottomContentTop + 'px';
                        };

                        document.onmouseup = function () {
                            document.onmousemove = document.onmouseup = null;
                        };

                        return false; // disable selection start (cursor change)
                    }
                } else if ($attr.orientation === 'vertical') {

                    var sliderElemX = document.getElementById('slider-x'),
                        leftContent = document.getElementById('' + $attr.leftContent),
                        rightContent = document.getElementById('' + $attr.rightContent);

                    sliderElemX.style.left = +$attr.indent + +leftContent.clientWidth + 'px';
                    rightContent.style.left = +$attr.indent + +leftContent.clientWidth + 'px';

                    sliderElemX.onmousedown = function (event) {

                        // получаю координаты
                        var sliderElemCoords = getCoords(sliderElemX);
                        // https://learn.javascript.ru/article/drag-and-drop/ball_shift.png
                        // 10 это отступ слайдера
                        var sliderShiftX = +$attr.indent + +event.pageX - sliderElemCoords.left;

                        document.onmousemove = function (event) {
                            // $attr.indent - отступ от края экрана до родительского блока
                            var newSliderElemLeft = event.pageX - sliderShiftX;

                            $log.warn(newSliderElemLeft);

                            // ограничители
                            if (newSliderElemLeft > +$attr.max) {
                                newSliderElemLeft = $attr.max;
                            }
                            if (newSliderElemLeft < +$attr.min) {
                                newSliderElemLeft = $attr.min;
                            }

                            sliderElemX.style.left = +$attr.indent + +newSliderElemLeft + 'px';
                            leftContent.style.width = +newSliderElemLeft + 'px';
                            rightContent.style.left = +$attr.indent + +newSliderElemLeft + 'px';
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


