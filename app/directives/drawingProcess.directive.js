/**
 * Created by DubenskiyAA on 01.08.2016.
 */

"use strict";

angular.module('asPkpApp.drawingProcess.directive', [])

    .directive("drawingProcess", function ($window, $document, $log, $timeout, $compile) {
            function linker($scope, $element, $attr) {


                var timeoutId,
                    arrOldClass = [];

                /**
                 * Формирую шаблон
                 * @param val
                 * @param type
                 * @returns {string}
                 */
                var templateFunc = function (val, type) {
                    // $log.info(val);
                    var mainTpl = "<div " +
                        "class=\"" + val.class + "\" " +
                        "style='width: " + val.width + "px; height: " + val.height + "px; left: " + val.left + "px; top: " + val.top + "px;' " +
                        "ng-click='elemSelected(\"" + val.id + "\")'" +
                        "ng-dblclick='selectedLeafObj.openNewProcess(\"" + val.id + "\")'>" +
                        "</div>";

                    var cornerTpl = "<div class=\"" + val.cornerClass + "\" style='" +
                        "width: " + val.cornerWidth + "px; " +
                        "height: " + val.cornerHeight + "px; " +
                        "left: " + val.cornerLeft + "px; " +
                        "top: " + val.cornerTop + "px; " +
                        "border-radius: " + val.cornerBorderRadius + "; " +
                        // "border-left: " + val.cornerBorderLeft + "; " +
                        // "border-right: " + val.cornerBorderRight + "; " +
                        // "border-top: " + val.cornerBorderTop + "; " +
                        // "border-bottom: " + val.cornerBorderBottom + ";" +
                        "' ng-click='elemSelected(\"" + val.id + "\")' borderProperties='" + val.cornerBorderLeft + ", " + val.cornerBorderRight + ", " + val.cornerBorderTop + ", " + val.cornerBorderBottom + "'" +
                        "></div>";

                    return type == 'cornerDiv' ? cornerTpl : mainTpl
                };

                /**
                 * Отрисовка элемента
                 * @param x1
                 * @param x2
                 * @param y1
                 * @param y2
                 * @param otherInfo
                 * @param lineThickness
                 * @param direction
                 * @param x1Index
                 * @param isCornerDiv
                 * @param cornerSize
                 */
                var drawingEdge = function (x1, x2, y1, y2, otherInfo, lineThickness, direction, x1Index, isCornerDiv, cornerSize) {

                    function indentFunc() {
                        if (direction === 'forward') {
                            // вперед
                            var x3 = otherInfo.waypoint[x1Index + 2]._x,
                                y3 = otherInfo.waypoint[x1Index + 2]._y;

                            if (x1 == x2 && x1 < x3 && y1 < y3) {
                                edge.height -= (cornerSize - lineThickness);
                                if (otherInfo.waypoint[x1Index - 1]) {
                                    edge.top += cornerSize;
                                    edge.height -= (cornerSize );
                                }
                                edge.cornerBorderRadius = '0 0 0 ' + cornerSize + 'px';
                                edge.cornerLeft = edge.left;
                                edge.cornerTop = edge.top + edge.height;
                                edge.cornerBorderLeft = lineThickness + 'px solid black';
                                edge.cornerBorderBottom = lineThickness + 'px solid black';
                            } else if (y1 == y2 && y1 < y3 && x1 < x3) {
                                edge.width -= (cornerSize - lineThickness);
                                edge.cornerBorderRadius = '0 ' + cornerSize + 'px 0 0';
                                edge.cornerLeft = edge.left + edge.width;
                                edge.cornerTop = edge.top;
                                edge.cornerBorderRight = lineThickness + 'px solid black';
                                edge.cornerBorderTop = lineThickness + 'px solid black';
                            } else if (y1 == y2 && y1 > y3 && x1 < x3) {
                                edge.width -= (cornerSize - lineThickness);
                                if (otherInfo.waypoint[x1Index - 1]) {
                                    edge.left += cornerSize;
                                    edge.width -= (cornerSize );
                                }
                                edge.cornerBorderRadius = '0 0 ' + cornerSize + 'px 0';
                                edge.cornerLeft = edge.left + edge.width;
                                edge.cornerTop = edge.top - cornerSize + lineThickness;
                                edge.cornerBorderRight = lineThickness + 'px solid black';
                                edge.cornerBorderBottom = lineThickness + 'px solid black';
                            } else if (y1 == y2 && y1 > y3 && x1 > x3) {
                                edge.width -= cornerSize;
                                edge.left += cornerSize;
                                edge.cornerBorderRadius = '0 0 0 ' + cornerSize + 'px';
                                edge.cornerLeft = edge.left - cornerSize;
                                edge.cornerTop = edge.top - cornerSize + lineThickness;
                                edge.cornerBorderLeft = lineThickness + 'px solid black';
                                edge.cornerBorderBottom = lineThickness + 'px solid black';
                            } else if (y1 == y2 && y1 < y3 && x1 > x3) {
                                edge.width -= cornerSize;
                                edge.left += cornerSize;
                                if (otherInfo.waypoint[x1Index - 1]) {
                                    edge.width -= (cornerSize - lineThickness);
                                }
                                edge.cornerBorderRadius = cornerSize + 'px 0 0 0';
                                edge.cornerLeft = edge.left - cornerSize;
                                edge.cornerTop = edge.top;
                                edge.cornerBorderLeft = lineThickness + 'px solid black';
                                edge.cornerBorderTop = lineThickness + 'px solid black';
                            } else if (x1 == x2 && x1 > x3 && y1 < y3) {
                                edge.height -= (cornerSize - lineThickness);
                                edge.cornerBorderRadius = '0 0 ' + cornerSize + 'px 0';
                                edge.cornerLeft = edge.left - cornerSize + lineThickness;
                                edge.cornerTop = edge.top + edge.height;
                                edge.cornerBorderRight = lineThickness + 'px solid black';
                                edge.cornerBorderBottom = lineThickness + 'px solid black';
                            } else if (x1 == x2 && x1 > x3 && y1 > y3) {
                                edge.height -= cornerSize;
                                edge.top += cornerSize;
                                edge.cornerBorderRadius = '0 ' + cornerSize + 'px 0 0';
                                edge.cornerLeft = edge.left - cornerSize + lineThickness;
                                edge.cornerTop = edge.top - cornerSize;
                                edge.cornerBorderRight = lineThickness + 'px solid black';
                                edge.cornerBorderTop = lineThickness + 'px solid black';
                            } else if (x1 == x2 && x1 < x3 && y1 > y3) {
                                edge.height -= cornerSize;
                                edge.top += cornerSize;
                                edge.cornerBorderRadius = cornerSize + 'px 0 0 0';
                                edge.cornerLeft = edge.left;
                                edge.cornerTop = edge.top - cornerSize;
                                edge.cornerBorderLeft = lineThickness + 'px solid black';
                                edge.cornerBorderTop = lineThickness + 'px solid black';
                            }

                        } else if (direction === 'backward') {
                            // назад
                            var x0 = otherInfo.waypoint[x1Index - 1]._x,
                                y0 = otherInfo.waypoint[x1Index - 1]._y;

                            if ((x0 == x1 && x0 < x2 && y0 < y2) || (x0 == x1 && x0 < x2 && y0 > y2)) {
                                edge.width -= cornerSize;
                                edge.left += cornerSize;
                            } else if ((y0 == y1 && y0 < y2 && x0 < x2) || (y0 == y1 && y0 < y2 && x0 > x2)) {
                                edge.height -= cornerSize;
                                edge.top += cornerSize;
                            } else if ((y0 == y1 && y0 > y2 && x0 < x2) || (y0 == y1 && y0 > y2 && x0 > x2)) {
                                edge.height -= (cornerSize - lineThickness);
                            } else if ((x0 == x1 && x0 > x2 && y0 < y2) || (x0 == x1 && x0 > x2 && y0 > y2)) {
                                edge.width -= (cornerSize - lineThickness);
                            }
                        }

                        return edge
                    }

                    var edge = {
                        id: otherInfo._id,
                        left: Math.min(x1, x2) + 20,
                        top: Math.min(y1, y2) + 55,
                        height: y1 == y2 ? lineThickness : Math.max(y1, y2) - Math.min(y1, y2),
                        width: x1 == x2 ? lineThickness : Math.max(x1, x2) - Math.min(x1, x2),
                        bpmnElement: otherInfo._bpmnElement,
                        class: otherInfo._id + " process-edge",
                        lineThickness: lineThickness,
                        cornerWidth: cornerSize,
                        cornerHeight: cornerSize,
                        cornerClass: otherInfo._id + " corner"
                    };

                    if (direction) indentFunc();

                    angular.element(document.getElementById('' + $attr.idparent)).append($compile(templateFunc(edge))($scope));

                    // $element.append($compile(templateFunc(edge))($scope));

                    if (isCornerDiv) angular.element(document.getElementById('' + $attr.idparent)).append($compile(templateFunc(edge, 'cornerDiv'))($scope));

                };

                /**
                 * Без таймаута не получаю данные
                 */
                timeoutId = $timeout(function () {
                    var shape = {},
                        coordsData = angular.fromJson($attr.data);

                    // $log.info($attr.idparent);

                    // Блоки
                    angular.forEach(coordsData.BPMNShape, function (val, index) {
                        shape = {
                            id: val._id,
                            width: (~(val._id).indexOf("gateway")) ? (val.Bounds._width - 12) : +val.Bounds._width,
                            height: (~(val._id).indexOf("gateway")) ? (val.Bounds._height - 12) : +val.Bounds._height,
                            left: (~(val._id).indexOf("gateway")) ? (+val.Bounds._x + 20 + 6) : +val.Bounds._x + 20,
                            top: (~(val._id).indexOf("gateway")) ? (+val.Bounds._y + 55 + 6) : +val.Bounds._y + 55,
                            bpmnElement: val._bpmnElement,
                            // class:  val._id + " process-shape"
                            class: (~(val._id).indexOf("gateway")) ? val._id + " process-shape-diamond" :
                                (~(val._id).indexOf("event")) ? val._id + " process-shape-circle" :
                                    (~(val._id).indexOf("step")) ? val._id + " process-shape-step" : val._id + " process-shape-user-task"
                        };
                        // $log.warn(angular.element(document.getElementById('' + $attr.idparent)));
                        angular.element(document.getElementById('' + $attr.idparent)).append($compile(templateFunc(shape))($scope));
                    });

                    // Линии
                    angular.forEach(coordsData.BPMNEdge, function (val, index) {
                        // $log.info(val);
                        if (val.waypoint.length == 2) {
                            drawingEdge(+val.waypoint[0]._x, +val.waypoint[1]._x, +val.waypoint[0]._y, +val.waypoint[1]._y, val, 4);
                        } else if (val.waypoint.length == 3) {
                            drawingEdge(+val.waypoint[0]._x, +val.waypoint[1]._x, +val.waypoint[0]._y, +val.waypoint[1]._y, val, 4, 'forward', 0, true, 15);
                            drawingEdge(+val.waypoint[1]._x, +val.waypoint[2]._x, +val.waypoint[1]._y, +val.waypoint[2]._y, val, 4, 'backward', 1, false, 15);
                        }
                        else if (val.waypoint.length == 4) {
                            drawingEdge(+val.waypoint[0]._x, +val.waypoint[1]._x, +val.waypoint[0]._y, +val.waypoint[1]._y, val, 4, 'forward', 0, true, 15);
                            drawingEdge(+val.waypoint[1]._x, +val.waypoint[2]._x, +val.waypoint[1]._y, +val.waypoint[2]._y, val, 4, 'forward', 1, true, 15);
                            drawingEdge(+val.waypoint[2]._x, +val.waypoint[3]._x, +val.waypoint[2]._y, +val.waypoint[3]._y, val, 4, 'backward', 2, false, 15);
                        } else if (val.waypoint.length == 5) {
                            drawingEdge(+val.waypoint[0]._x, +val.waypoint[1]._x, +val.waypoint[0]._y, +val.waypoint[1]._y, val, 4, 'forward', 0, true, 15);
                            drawingEdge(+val.waypoint[1]._x, +val.waypoint[2]._x, +val.waypoint[1]._y, +val.waypoint[2]._y, val, 4, 'forward', 1, true, 15);
                            drawingEdge(+val.waypoint[2]._x, +val.waypoint[3]._x, +val.waypoint[2]._y, +val.waypoint[3]._y, val, 4, 'forward', 2, true, 15);
                            drawingEdge(+val.waypoint[3]._x, +val.waypoint[4]._x, +val.waypoint[3]._y, +val.waypoint[4]._y, val, 4, 'backward', 3, true, 15);
                        }
                    })
                }, 1000);

                $element.on('$destroy', function () {
                    $timeout.cancel(timeoutId);
                });


                /**
                 * Выбран элемент
                 * @param className
                 */
                $scope.elemSelected = function (className) {

                    // $log.info(className);

                    angular.forEach(arrOldClass, function (val, index) {
                        styleSelectedElem(val, 'old');
                    });

                    styleSelectedElem(className, 'new');

                    function styleSelectedElem(nameClass, type) {
                        // $log.info(angular.element(document.querySelectorAll('.' + nameClass)));
                        angular.forEach(angular.element(document.querySelectorAll('.' + nameClass)), function (val, index) {
                            if (~val.className.indexOf("corner")) {
                                // совпадение есть!
                                var arrBorderProperties = val.getAttribute('borderproperties').split(', ');
                                val.style.borderLeft = type == 'new' ? '' + arrBorderProperties[0] : '';
                                val.style.borderRight = type == 'new' ? '' + arrBorderProperties[1] : '';
                                val.style.borderTop = type == 'new' ? '' + arrBorderProperties[2] : '';
                                val.style.borderBottom = type == 'new' ? '' + arrBorderProperties[3] : '';
                            } else if (~val.className.indexOf("process-edge")) {
                                val.style.backgroundColor = type == 'new' ? 'black' : '';
                            } else {
                                val.style.border = type == 'new' ? '3px solid #0965AE' : '';
                            }
                        });
                    }

                    arrOldClass.push(className);

                };

                // $scope.openNewProcess = function (className) {
                //       if (~className.indexOf("_prepare_step_")){
                //           alert('hihi');
                //       }
                // };

            }

            return {
                restrict: 'EA',
                // scope: {
                //     customerInfo: '=info'
                // },
                // controller: function ($scope) {
                //
                //
                // },
                link: linker
            };
        }
    );

// border: 3px solid #0965AE;