/**
 * Created by DubenskiyAA on 05.07.2016.
 */

'use strict';

angular.module('asPkpApp.censusProcessCtrl', [])
    .controller('CensusProcessCtrl', ['$scope', '$log', '$rootScope', '$stateParams', '$state', '$cookies', '$uibModal', 'censusProcessService', '$timeout', 'Notification',
        function ($scope, $log, $rootScope, $stateParams, $state, $cookies, $uibModal, censusProcessService, $timeout, Notification) {

            $scope.my_tree = {};

            var selectedLeaf, treedata_avm, treedata_geography, processTreeData;

            $scope.isDynamicSize = true;
            //
            // } ;


            // ************************* test ******************
            $scope.getXML = function () {
                censusProcessService.getXML().then(function (response) {
                    if (response) {
                        // $log.info(response.definitions.BPMNDiagram.BPMNPlane);
                        $scope.dataJSON = angular.fromJson(response.definitions.BPMNDiagram.BPMNPlane);
                        // $log.warn(response.definitions.BPMNDiagram.BPMNPlane);
                        // $log.info($scope.dataJSON);
                    }
                });
            };

            $scope.getXML();

            $scope.alertFunc = function () {
                alert('dfssdfdsf');
            };

            // ************************* test ******************


            $scope.my_tree_handler = function (branch) {
                var _ref;
                $scope.output = "You selected: " + branch.label;
                if ((_ref = branch.data) != null ? _ref.description : void 0) {
                    return $scope.output += ' (' + branch.data.description + ')';
                }

                if ($state.includes("censusProcess.detailSelectedLeaf"))  $state.go('^'); // returns true)
                // $state.go('^');

            };

            $scope.selectedLeaf = function (branch) {
                // return $scope.output = "Отдельный вызов на узел или дитя или родителя! : " + branch.label + " " + branch.data.type;
                // $log.info($stateParams);
                $state.go('censusProcess.detailSelectedLeaf', {'type': branch.data.type, 'typeDetail': branch.data.typeDetail});
            };

            treedata_avm = [
                {
                    label: 'Animal',
                    children: [
                        {
                            label: 'Dog',
                            data: {
                                description: "man's best friend"
                            }
                        }, {
                            label: 'Cat',
                            data: {
                                description: "Felis catus"
                            }
                        }, {
                            label: 'Hippopotamus',
                            data: {
                                description: "hungry, hungry"
                            }
                        }, {
                            label: 'Chicken',
                            children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
                        }
                    ]
                }, {
                    label: 'Vegetable',
                    data: {
                        definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
                        data_can_contain_anything: true
                    },
                    onSelect: function (branch) {
                        return $scope.output = "Vegetable: " + branch.data.definition;
                    },
                    children: [
                        {
                            label: 'Oranges'
                        }, {
                            label: 'Apples',
                            children: [
                                {
                                    label: 'Granny Smith',
                                    onSelect: selectedLeaf
                                }, {
                                    label: 'Red Delicous',
                                    onSelect: selectedLeaf
                                }, {
                                    label: 'Fuji',
                                    onSelect: selectedLeaf
                                }
                            ]
                        }
                    ]
                }, {
                    label: 'Mineral',
                    children: [
                        {
                            label: 'Rock',
                            children: ['Igneous', 'Sedimentary', 'Metamorphic']
                        }, {
                            label: 'Metal',
                            children: ['Aluminum', 'Steel', 'Copper']
                        }, {
                            label: 'Plastic',
                            children: [
                                {
                                    label: 'Thermoplastic',
                                    children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
                                }, {
                                    label: 'Thermosetting Polymer',
                                    children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
                                }
                            ]
                        }
                    ]
                }
            ];

            treedata_geography = [
                {
                    label: 'North America',
                    children: [
                        {
                            label: 'Canada',
                            children: ['Toronto', 'Vancouver']
                        }, {
                            label: 'USA',
                            children: ['New York', 'Los Angeles']
                        }, {
                            label: 'Mexico',
                            children: ['Mexico City', 'Guadalajara']
                        }
                    ]
                }, {
                    label: 'South America',
                    children: [
                        {
                            label: 'Venezuela',
                            children: ['Caracas', 'Maracaibo']
                        }, {
                            label: 'Brazil',
                            children: ['Sao Paulo', 'Rio de Janeiro']
                        }, {
                            label: 'Argentina',
                            children: ['Buenos Aires', 'Cordoba']
                        }
                    ]
                }
            ];

            $scope.processTreeData = [
                {
                    label: '2016',
                    children: [
                        {
                            label: 'Графическое представление процесса',
                            data: {
                                type: "SchemeLeaf"
                            },
                            onSelect: $scope.selectedLeaf
                        },
                        {
                            label: 'Телеграммы ОАО «РЖД» о проведении переписи контейнерного парка с указанием даты переписи',
                            data: {
                                type: "TlgInput"
                            },
                            onSelect: $scope.selectedLeaf
                        },
                        {
                            label: 'Графика сдачи предварительных и окончательных результатов переписи из ИВЦ ЖА',
                            data: {
                                type: "ScheduleDelivery"
                            },
                            onSelect: $scope.selectedLeaf
                        }, {
                            label: 'Раздел 1 - Подготовка к автоматизированной переписи',
                            children: [
                                {
                                    label: 'Сверка ноябрь',
                                    children: [
                                        {
                                            label: 'Файлы расхождений по результатам сверки КМС ЕМПП и АСОУП-2КС на 18:00 (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }, {
                                            label: 'Файлы расхождений по результатам сверки КМС ЕМПП и КММП ИБМУ на 18:00 московского времени (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }
                                    ]
                                }, {
                                    label: 'Сверка март',
                                    children: [
                                        {
                                            label: 'Файлы расхождений по результатам сверки КМС ЕМПП и АСОУП-2КС на 18:00 (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }, {
                                            label: 'Файлы расхождений по результатам сверки КМС ЕМПП и КММП ИБМУ на 18:00 московского времени (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }
                                    ]
                                },
                                {
                                    label: 'Сверка июль',
                                    children: [
                                        {
                                            label: 'Файлы расхождений по результатам сверки КМС ЕМПП и АСОУП-2КС на 18:00 (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }, {
                                            label: 'Файлы расхождений по результатам сверки КМС ЕМПП и КММП ИБМУ на 18:00 московского времени (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }
                                    ]
                                },
                                {
                                    label: 'Сверка август',
                                    children: [
                                        {
                                            label: 'Файлы расхождений по результатам сверки КМС ЕМПП и АСОУП-2КС на 18:00 (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }, {
                                            label: 'Файлы расхождений по результатам сверки КМС ЕМПП и КММП ИБМУ на 18:00 московского времени (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'Раздел 2 - 1-й день переписи',
                            children: [
                                {
                                    label: 'Рассчитанная основная таблицы на 08:00 дня переписи (LKMC.PRP_MAIN)',
                                    data: {
                                        type: "TableLeaf",
                                        typeDetail: "prpMain"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Результаты верки среза КМС ЕМПП и среза АСОУП-2КС',
                                    children: [
                                        {
                                            label: 'Таблица LKMC.SVERKA1_PRP',
                                            data: {
                                                type: "TableLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }, {
                                            label: 'Файлы расхождений по результатам сверки (в.т.ч. сведения о рассылке)',
                                            data: {
                                                type: "FileLeaf"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }
                                    ]
                                },
                                {
                                    label: 'Выходной документа АКТ формы №2 (в.т.ч. сведения о рассылке)',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Выходной документа АКТ формы № 5 (в.т.ч. сведения о рассылке)',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Справка по форме приложения № 3 с предварительными итогами переписи контейнеров  (в.т.ч. сведения о рассылке)',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Предварительные результаты переписи в виде файлов PART.DBF на основе таблицы LKMC.PRP_MAIN  (в.т.ч. сведения о рассылке)',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Предварительные результаты переписи от ФГУП "КЖД"',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Предварительные результаты переписи от АК "ЖДЯ"',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                }
                            ]
                        },
                        {
                            label: 'Раздел 3 - 2-й день переписи',
                            children: [
                                {
                                    label: 'Результат загрузки корректировочных сообений 3345 по результатам сверки',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                }
                            ]
                        },
                        {
                            label: 'Раздел 4 - 3-й день переписи',
                            children: [
                                {
                                    label: 'Рассчитанная основная таблицы на 08:00 дня переписи (LKMC.PRP_MAIN)',
                                    data: {
                                        type: "TableLeaf",
                                        typeDetail: "prpMain"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Сведения о контейнерах инвентарного парка (LKMC.IBMU_PRP)',
                                    data: {
                                        type: "TableLeaf",
                                        typeDetail: "prpIbmu"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Результаты сверки КМС ЕМПП и КММП ИБМУ по контейнерам инвентарного парка (в.т.ч. сведения о рассылке)',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                }
                            ]
                        },
                        {
                            label: 'Раздел 5 - 4-й день переписи',
                            children: [
                                {
                                    label: 'Рассчитанная основная таблицы на 08:00 дня переписи (LKMC.PRP_MAIN)',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Предварительные результаты переписи (в.т.ч. сведения о рассылке)',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                }
                            ]
                        },
                        {
                            label: 'Раздел 6 - 5-й день переписи',
                            children: [
                                {
                                    label: 'Рассчитанная основная таблицы на 08:00 дня переписи (LKMC.PRP_MAIN)',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                },
                                {
                                    label: 'Окончательные результаты переписи',
                                    children: [
                                        {
                                            label: 'Файлы PART.DBF',
                                            data: {
                                                type: "table"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        },
                                        {
                                            label: 'АКТ формы №2',
                                            data: {
                                                type: "table"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        },
                                        {
                                            label: 'АКТ формы №5',
                                            data: {
                                                type: "table"
                                            },
                                            onSelect: $scope.selectedLeaf
                                        }
                                    ]
                                },
                                {
                                    label: 'Сведенния о контейнерах инвентарного парка предъявлявленных по срезу КММП ИБМУ, но отсутствующих в переписи',
                                    data: {
                                        type: "table"
                                    },
                                    onSelect: $scope.selectedLeaf
                                }
                            ]
                        }
                    ]
                }
            ];


        }
    ]);


