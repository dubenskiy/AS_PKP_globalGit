/**
 * Created by DubenskiyAA on 29.07.2016.
 */

"use strict";

angular.module('asPkpApp.myResizer.directive', [])

    .directive("myResizer", function ($window, $document, $log) {
        function linker($scope, $element, $attr) {
            // вверх-вниз
            if ($attr.orientation === 'horizontal') {
                var sliderElem = document.getElementById('slider-y');
                var topContent = document.getElementById('' + $attr.topContent + '');
                var bottomContent = document.getElementById('' + $attr.bottomContent + '');

                // устанавливаю первоначальный отступ полосы прокрутки
                var topContentCoords = getCoords(topContent);
                sliderElem.style.top = topContentCoords.bottom - $attr.indent + 'px';

                sliderElem.onmousedown = function (event) {

                    // получаю координаты
                    var sliderElemCoords = getCoords(sliderElem);
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

                        sliderElem.style.top = newSliderElemTop + 'px';
                        topContent.style.height = +newSliderElemTop + 'px';
                        // bottomContent.style.top = +newBottomContentTop + 'px';
                    };

                    document.onmouseup = function () {
                        document.onmousemove = document.onmouseup = null;
                    };

                    return false; // disable selection start (cursor change)
                }
            } else if ($attr.orientation === 'vertical') {
                $element.on('mousedown', function (event) {
                    event.preventDefault();
                    $document.on('mousemove', mouseMove);
                    $document.on('mouseup', mouseUp);
                });
            }

            function mouseMove(event) {

                var x = event.pageX;

                if ($attr.max && x > $attr.max) {
                    x = +$attr.max;
                }

                if ($attr.min && x < $attr.min) {
                    x = +$attr.min;
                }

                $element.css({
                    left: x + 'px'
                });

                $($attr.leftContent).css({
                    width: x + 'px'
                });
                $($attr.rightContent).css({
                    left: (x + parseInt($attr.indent)) + 'px'
                });

            }

            function mouseUp() {
                $document.unbind('mousemove', mouseMove);
                $document.unbind('mouseup', mouseUp);
            }

            function getCoords(elem) { // кроме IE8-
                var box = elem.getBoundingClientRect();
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
    });


