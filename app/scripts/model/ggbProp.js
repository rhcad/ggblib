// Copyright (c) 2015 Zhang Yungui, GNU GPL v3 licensed.
//

angular.module('ggbApp')
  .factory('ggbProp', function (model) {
    'use strict';
    return {

      addKeyword: function (key, keys) {
        key = key.replace(/\s|\+|;|,/g, '');
        if (key && key.length <= 30) {
          if (keys.indexOf(key) < 0) {
            keys.push(key);
            key = '';
          }
        }
        return key;
      },

      removeKeyword: function (key, keys) {
        var index = keys.indexOf(key);
        if (index >= 0) {
          keys.splice(index, 1);
        }
      },

      saveProp: function (ggbProp) {
        ['enableDragZoom', 'enableLabelDrags'].forEach(function (name) {
          if (ggbProp[name] === false) {
            delete ggbProp[name];
          }
        });

        var old_prop = model.getGgb(model.ggbid);

        if (ggbProp.title.length === 0) {
          ggbProp.title = old_prop.title;
        }
        if (ggbProp.width < 10 || ggbProp.width > 2000) {
          ggbProp.width = old_prop.width;
        }
        if (ggbProp.height < 10 || ggbProp.height > 2000) {
          ggbProp.height = old_prop.height;
        }

        var info = JSON.parse(JSON.stringify(ggbProp));
        angular.copy(info, old_prop);
        return info;
      }

    };
  });
