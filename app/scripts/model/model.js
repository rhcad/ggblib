// Copyright (c) 2015 Zhang Yungui, GNU GPL v3 licensed.
//

angular.module('ggbApp')
  .factory('model', function () {
    'use strict';
    return {
      debugging: false,
      dataURL: '',
      ggbs: [],
      keys: [],
      ggbid: '',
      users: null,

      getGgb: function (id) {
        for (var i in this.ggbs) {
          if (this.ggbs[i].id == id) {
            return this.ggbs[i];
          }
        }
      },

      findGgb: function (q, ggbs) {
        var self = this;
        ggbs = ggbs || this.ggbs;
        return !q ? ggbs : ggbs.slice(0).filter(function (ggb) {
          function can_find(str) {
            var isKey = str.indexOf('key:') === 0,
                key = isKey ? str.substr(4) : str;

            ggb.src = self.dataURL + 'thumbnail/' + ggb.id + '.png';
            ggb.width = parseInt(ggb.width);
            ggb.height = parseInt(ggb.height);
            return ggb.keys.indexOf(key) >= 0 ||
              (!isKey && ggb.title.indexOf(key) >= 0);
          }

          var accept = false;

          if (typeof(q) === 'string') {
            accept = can_find(q);
          } else {
            for (var i in q) {
              if (can_find(q[i])) {
                accept = true;
              }
            }
          }
          return accept;
        });
      },

      collectKeys: function (ggbs) {
        var i, j, key, keys = [], self = this;

        ggbs = ggbs || self.ggbs;
        for (i in ggbs) {
          for (j in ggbs[i].keys) {
            key = ggbs[i].keys[j];
            if (keys.indexOf(key) < 0) {
              keys.push(key);
            }
          }
        }

        return keys.map(function (key) {
          return { key: key, count: self.findGgb('key:' + key, ggbs).length };
        }).sort(function (a, b) {
          return b.count - a.count;
        });
      },

      getUser: function (id) {
        for (var i in (this.users || [])) {
          if (this.users[i].id == id) {
            return this.users[i];
          }
        }
      }
    };
  });
