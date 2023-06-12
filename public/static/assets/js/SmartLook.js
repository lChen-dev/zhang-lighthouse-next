(() => {
  setTimeout(() => {
    window.smartlook ||
      (function(d) {
        var o = (smartlook = function() {
            o.api.push(arguments);
          }),
          h = d.getElementsByTagName('head')[0];
        var c = d.createElement('script');
        o.api = new Array();
        c.async = true;
        c.type = 'text/javascript';
        c.charset = 'utf-8';
        c.src = 'https://rec.smartlook.com/recorder.js';
        h.appendChild(c);
      })(document);
    smartlook('init', 'fd9f00d6fc5b7760aa1ef58914a76dd9b97995a4');
  }, 0);
})();
