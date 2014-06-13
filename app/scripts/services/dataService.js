'use strict';

angular.module('DataVisualizationApp')
  .factory('dataService', function () {
    // Service logic
    // ...
    // Public API here
    return {
      getBarChartData: function () {
        return [
        {
          letter: 'A',
          frequency: Math.random()
        },
        {
          letter: 'B',
          frequency: Math.random()
        },
        {
          letter: 'C',
          frequency: Math.random()
        },
        {
          letter: 'D',
          frequency: Math.random()
        },
        {
          letter: 'E',
          frequency: Math.random()
        },
        {
          letter: 'F',
          frequency: Math.random()
        },
        {
          letter: 'G',
          frequency: Math.random()
        },
        {
          letter: 'H',
          frequency: Math.random()
        },
        {
          letter: 'I',
          frequency: Math.random()
        },
        {
          letter: 'J',
          frequency: Math.random()
        },
        {
          letter: 'K',
          frequency: Math.random()
        },
        {
          letter: 'L',
          frequency: Math.random()
        },
        {
          letter: 'M',
          frequency: Math.random()
        }]
      }
    };
  });
