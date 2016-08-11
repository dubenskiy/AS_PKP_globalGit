/**
 * Created by DubenskiyAA on 01.08.2016.
 */

"use strict";

angular.module('asPkpApp.drawingProcess.directive', [])

    .directive("drawingProcess", function ($window, $document, $log, $timeout, $compile) {
            function linker($scope, $element, $attr) {

                /**
                 * Формирую шаблон
                 * @param val
                 * @param type
                 * @returns {string}
                 */
                var templateFunc = function (val, type) {
                    // $log.info(val);
                    var mainTpl = "<div id='" + val.id + "' " +
                        "class=\"" + val.class + "\" " +
                        "style='width: " + val.width + "px; height: " + val.height + "px; left: " + val.left + "px; top: " + val.top + "px;' " +
                        "ng-click='testAlert(\"" + val.class + "\")'>" +
                        "</div>";


                    var cornerTpl = "<div class='corner-div' style='width: " + val.sizeConst + "px; height: " + val.sizeConst + "px; left: " + val.cornerLeft + "px; top: " + val.cornerTop + "px; border-radius: " + val.cornerBorderRadius + "'></div>";

                    // if (val.cornerTop==248) $log.warn(cornerTpl);

                    return type == 'cornerDiv' ? cornerTpl : mainTpl
                };

                var directionFunc = function (val, index) {
                    var direction,
                        x1 = +val.waypoint[index]._x,
                        x2 = +val.waypoint[index + 1]._x,
                        x3 = +val.waypoint[index + 2]._x,
                        y1 = +val.waypoint[index]._y,
                        y2 = +val.waypoint[index + 1]._y,
                        y3 = +val.waypoint[index + 2]._y;

                    // if (+val.waypoint[index]._y == +val.waypoint[index + 1]._y && (+val.waypoint[index + 1]._y < +val.waypoint[index + 2]._y || +val.waypoint[index + 1]._y > +val.waypoint[index + 2]._y)) {
                    //     direction = 'forward';
                    // } else {
                    //     direction = 'backward';
                    // }

                    // $log.info(x1 + ' ' + x2 + ' ' + x3);
                    // $log.info(val);

                    if (x1 == x2 && x1 < x3 && y1 < y3) {
                        direction = 'backward';
                    } else if (y1 == y2 && y1 < y3 && x1 < x3) {
                        direction = 'backward';
                    } else if (y1 == y2 && y1 > y3 && x1 < x3) {
                        direction = 'backward';
                    } else if (y1 == y2 && y1 > y3 && x1 > x3) {
                        direction = 'forward';
                    } else if (y1 == y2 && y1 < y3 && x1 > x3) {
                        direction = 'forward';
                    } else if (x1 == x2 && x1 > x3 && y1 < y3) {
                        direction = 'backward';
                    } else if (x1 == x2 && x1 > x3 && y1 > y3) {
                        direction = 'forward';
                    } else if (x1 == x2 && x1 < x3 && y1 > y3) {
                        direction = 'forward';
                    }

                    return direction
                };

                /**
                 * Отрисовка элемента
                 * @param x1
                 * @param x2
                 * @param y1
                 * @param y2
                 * @param otherInfo
                 * @param sizeConst
                 * @param direction
                 * @param x1Index
                 * @param isCornerDiv
                 */
                var drawingEdge = function (x1, x2, y1, y2, otherInfo, sizeConst, direction, x1Index, isCornerDiv) {

                    function indentFunc() {
                        if (direction === 'forward') {
                            // вперед
                            var x3 = otherInfo.waypoint[x1Index + 2]._x,
                                y3 = otherInfo.waypoint[x1Index + 2]._y;

                            if (x1 == x2 && x1 < x3 && y1 < y3) {
                                edge.cornerBorderRadius = '0 0 0 ' + sizeConst + 'px';
                                edge.cornerLeft = edge.left + edge.width - sizeConst;
                                edge.cornerTop = edge.top + edge.height;
                            } else if (y1 == y2 && y1 < y3 && x1 < x3) {
                                edge.cornerBorderRadius = '0 ' + sizeConst + 'px 0 0';
                                edge.cornerLeft = edge.left + edge.width;
                                edge.cornerTop = edge.top + edge.height - sizeConst;
                            } else if (y1 == y2 && y1 > y3 && x1 < x3) {
                                edge.cornerBorderRadius = '0 0 ' + sizeConst + 'px 0';
                                edge.cornerLeft = edge.left + edge.width;
                                edge.cornerTop = edge.top + edge.height - sizeConst;
                            } else if (y1 == y2 && y1 > y3 && x1 > x3) {
                                edge.width -= sizeConst;
                                edge.left += sizeConst;
                                edge.cornerBorderRadius = '0 0 0 ' + sizeConst + 'px';
                                edge.cornerLeft = edge.left - sizeConst;
                                edge.cornerTop = edge.top;
                            } else if (y1 == y2 && y1 < y3 && x1 > x3) {
                                edge.width -= sizeConst;
                                edge.left += sizeConst;
                                edge.cornerBorderRadius = sizeConst + 'px 0 0 0';
                                edge.cornerLeft = edge.left - sizeConst;
                                edge.cornerTop = edge.top;
                            } else if (x1 == x2 && x1 > x3 && y1 < y3) {
                                edge.cornerBorderRadius = '0 0 ' + sizeConst + 'px 0';
                                edge.cornerLeft = edge.left + edge.width - sizeConst;
                                edge.cornerTop = edge.top + edge.height;
                            } else if (x1 == x2 && x1 > x3 && y1 > y3) {
                                edge.height -= sizeConst;
                                edge.top += sizeConst;
                                edge.cornerBorderRadius = '0 ' + sizeConst + 'px 0 0';
                                edge.cornerLeft = edge.left + edge.width - sizeConst;
                                edge.cornerTop = edge.top - sizeConst;
                            } else if (x1 == x2 && x1 < x3 && y1 > y3) {
                                // $log.info(x1 + ' ' + x2 + ' ' + x3);
                                edge.height -= sizeConst;
                                edge.top += sizeConst;
                                edge.cornerBorderRadius = sizeConst + 'px 0 0 0';
                                edge.cornerLeft = edge.left + edge.width - sizeConst;
                                edge.cornerTop = edge.top - sizeConst;
                                // if (x1==132){$log.info(edge)}
                            }

                        } else if (direction === 'backward') {
                            // назад
                            var x0 = otherInfo.waypoint[x1Index - 1]._x,
                                y0 = otherInfo.waypoint[x1Index - 1]._y;

                            if (x0 == x1 && x0 < x2 && y0 < y2) {
                                edge.width -= sizeConst;
                                edge.left += sizeConst;
                                edge.cornerBorderRadius = '0 0 0 ' + sizeConst + 'px';
                                edge.cornerLeft = edge.left - sizeConst;
                                edge.cornerTop = edge.top;
                            } else if (y0 == y1 && y0 < y2 && x0 < x2) {
                                edge.height -= sizeConst;
                                edge.top += sizeConst;
                                edge.cornerBorderRadius = '0 ' + sizeConst + 'px 0 0';
                                edge.cornerLeft = edge.left;
                                edge.cornerTop = edge.top - sizeConst;
                            } else if (y0 == y1 && y0 > y2 && x0 < x2) {
                                edge.cornerBorderRadius = '0 0 ' + sizeConst + 'px 0';
                                edge.cornerLeft = edge.left;
                                edge.cornerTop = edge.top + edge.height;
                            } else if (y0 == y1 && y0 > y2 && x0 > x2) {
                                // не факт что верно! нужно проверить!
                                edge.cornerBorderRadius = '0 0 0 ' + sizeConst + 'px';
                                edge.cornerLeft = edge.left;
                                edge.cornerTop = edge.top + edge.height;
                            } else if (y0 == y1 && y0 < y2 && x0 > x2) {
                                edge.height -= sizeConst;
                                edge.top += sizeConst;
                            } else if (x0 == x1 && x0 > x2 && y0 < y2) {
                                edge.cornerBorderRadius = '0 0 ' + sizeConst + 'px 0';
                                edge.cornerLeft = edge.left + edge.width;
                                edge.cornerTop = edge.top + edge.height - sizeConst;
                            } else if (x0 == x1 && x0 > x2 && y0 > y2) {
                                // edge.width -= sizeConst;
                            } else if (x0 == x1 && x0 < x2 && y0 > y2) {
                                edge.width -= sizeConst;
                                edge.left += sizeConst;
                            }
                        }

                        return edge
                    }


                    var edge = {
                        left: Math.min(x1, x2) + 15,
                        top: Math.min(y1, y2) + 83,
                        height: y1 == y2 ? sizeConst : Math.max(y1, y2) - Math.min(y1, y2),
                        width: x1 == x2 ? sizeConst : Math.max(x1, x2) - Math.min(x1, x2),
                        bpmnElement: otherInfo._bpmnElement,
                        class: otherInfo._id + " process-edge-black",
                        sizeConst: sizeConst
                    };

                    if (direction) indentFunc();

                    angular.element(document.getElementById('main-div-process')).append($compile(templateFunc(edge))($scope));

                    if (isCornerDiv) angular.element(document.getElementById('main-div-process')).append($compile(templateFunc(edge, 'cornerDiv'))($scope));

                };

                /**
                 * Без таймаута не получаю данные
                 */
                $timeout(function () {
                    var shape = {};
                    var coordsData = angular.fromJson($attr.data);
                    // Блоки
                    angular.forEach(coordsData.BPMNShape, function (val, index) {
                        shape = {
                            width: +val.Bounds._width,
                            height: +val.Bounds._height,
                            left: +val.Bounds._x + 15,
                            top: +val.Bounds._y + 83,
                            bpmnElement: val._bpmnElement,
                            // class:  val._id + " process-shape"
                            class: (~(val._id).indexOf("gateway")) ? val._id + " process-shape-diamond" :
                                (~(val._id).indexOf("event")) ? ' process-shape-circle' :
                                    (~(val._id).indexOf("step")) ? ' process-shape-step' : val._id + " process-shape-user-task"
                        };
                        angular.element(document.getElementById('main-div-process')).append($compile(templateFunc(shape))($scope));
                    });
                    // Линии
                    angular.forEach(coordsData.BPMNEdge, function (val, index) {
                        // $log.info(val);
                        if (val.waypoint.length == 2) {
                            drawingEdge(+val.waypoint[0]._x, +val.waypoint[1]._x, +val.waypoint[0]._y, +val.waypoint[1]._y, val, 4);
                        } else if (val.waypoint.length == 3) {
                            drawingEdge(+val.waypoint[0]._x, +val.waypoint[1]._x, +val.waypoint[0]._y, +val.waypoint[1]._y, val, 4, 'forward', 0, true);
                            drawingEdge(+val.waypoint[1]._x, +val.waypoint[2]._x, +val.waypoint[1]._y, +val.waypoint[2]._y, val, 4, 'backward', 1, false);
                        }
                        else if (val.waypoint.length == 4) {
                            drawingEdge(+val.waypoint[0]._x, +val.waypoint[1]._x, +val.waypoint[0]._y, +val.waypoint[1]._y, val, 4, 'forward', 0, true);
                            drawingEdge(+val.waypoint[1]._x, +val.waypoint[2]._x, +val.waypoint[1]._y, +val.waypoint[2]._y, val, 4, directionFunc(val, 1), 1, true);
                            drawingEdge(+val.waypoint[2]._x, +val.waypoint[3]._x, +val.waypoint[2]._y, +val.waypoint[3]._y, val, 4, 'backward', 2, true);
                        } else if (val.waypoint.length == 5) {
                            drawingEdge(+val.waypoint[0]._x, +val.waypoint[1]._x, +val.waypoint[0]._y, +val.waypoint[1]._y, val, 4, 'forward', 0, true);
                            drawingEdge(+val.waypoint[1]._x, +val.waypoint[2]._x, +val.waypoint[1]._y, +val.waypoint[2]._y, val, 4, directionFunc(val, 1), 1, true);
                            drawingEdge(+val.waypoint[2]._x, +val.waypoint[3]._x, +val.waypoint[2]._y, +val.waypoint[3]._y, val, 4, directionFunc(val, 2), 2, true);
                            drawingEdge(+val.waypoint[3]._x, +val.waypoint[4]._x, +val.waypoint[3]._y, +val.waypoint[4]._y, val, 4, 'backward', 3, true);
                        }
                    })
                }, 0);
            }

            return {
                restrict: 'EA',
                scope: {
                    customerInfo: '=info'
                },
                controller: function ($scope) {

                    $scope.testAlert = function (val) {
                        alert(val);
                        console.log(val);
                    };

                },
                link: linker
            };
        }
    );


