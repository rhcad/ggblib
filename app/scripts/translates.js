angular.module('ggbApp')
  .config(['$translateProvider', function($translateProvider) {
    'use strict';
    var lang = navigator ? (navigator.language || navigator.userLanguage) : null;

    $translateProvider
      .translations('cn', {
        'SiteTitle': 'GGB 课件资源',
        'SiteComment': '基于 GeoGebra 的数学互动实验资源平台。',
        'NewFiles': '最新的资源：',
        'MoreFiles': '浏览更多资源',
        'SearchPlaceholder': '搜索ggb资源',
        'All': '所有',
        'NavAll': '所有资源',
        'NavUpload': '上传文件',
        'NavPreview': '预览资源',
        'NavLogin': '登录',
        'Title': '标题',
        'Keywords': '关键字',
        'KeywordPlaceholder': '输入新的关键字',
        'Source': '来源',
        'EnableDragZoom': '允许拖动放缩',
        'EnableLabelDrags': '允许拖动标签文字',
        'Loading': '正在加载',
        'Footer1': '本非商业站点，仅用于个人研究和技术交流。',
        'ProjectCode': '项目代码',
        'Footer2': 'ggb资源的版权归相关来源网站和作者。',
        'Footer3': '采用 GPL v3 开源协议和',
        'LicenseEnd': '协议。',
        'SelGgbFile': '选择一个ggb文件 (*.ggb)',
        'CanvasWidth': '画布宽度',
        'CanvasHeight': '画布高度',
        'PageNotImplement': '本页面正在开发中，敬请期待。'
      })
      .translations('en', {
        'SiteTitle': 'GGB Materials',
        'SiteComment': 'The interactive mathematical materials platform based on GeoGebra.',
        'NewFiles': 'Recently uploaded materials:',
        'MoreFiles': 'Browse more materials',
        'SearchPlaceholder': 'Search GGB materials',
        'All': 'All',
        'NavAll': 'Materials',
        'NavUpload': 'Upload',
        'NavPreview': 'Preview',
        'NavLogin': 'Login',
        'Title': 'Title',
        'Keywords': 'Keywords',
        'KeywordPlaceholder': 'Input new keyword',
        'Source': 'Source',
        'EnableDragZoom': 'Enable shift-drag & zoom',
        'EnableLabelDrags': 'Enable dragging of labels',
        'Loading': 'Loading',
        'Footer1': 'This site is used for personal research and technical communication.',
        'ProjectCode': 'The project',
        'Footer2': 'Copyright of materials belong to the relevant source site and author.',
        'Footer3': 'is published under GPL license and',
        'LicenseEnd': 'license.',
        'SelGgbFile': 'Select a GeoGebra file (*.ggb)',
        'CanvasWidth': 'Canvas width',
        'CanvasHeight': 'Canvas height',
        'PageNotImplement': 'This page is under development. Thank you.'
      })
      .preferredLanguage(!lang || lang.toLowerCase().indexOf('cn') >= 0 ? 'cn' : 'en')
      .useSanitizeValueStrategy(null);
  }]);
