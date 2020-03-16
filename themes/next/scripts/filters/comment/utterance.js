/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  let theme = hexo.theme.config;
  if (!theme.utterance || !theme.utterance.enable) return;

  injects.comment.raw('utterance', '<div class="comments" id="utterance-container"></div>', {}, {cache: true});

  injects.bodyEnd.file('utterance', path.join(hexo.theme_dir, 'layout/_third-party/comments/utterance.swig'));

});