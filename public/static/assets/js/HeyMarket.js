(function(_a, id, a, _) {
  function Modal() {
    var h = a.createElement('script');
    h.type = 'text/javascript';
    h.async = true;
    var e = id;
    h.src = e + (e.indexOf('?') >= 0 ? '&' : '?') + 'ref=' + _;
    var y = a.getElementsByTagName('script')[0];
    y.parentNode.insertBefore(h, y);
    h.onload = h.onreadystatechange = function() {
      var r = this.readyState;
      if (r && r != 'complete' && r != 'loaded') return;
      try {
        HeymarketWidget.construct(_);
      } catch (e) {}
    };
  }
  _a.attachEvent
    ? _a.attachEvent('onload', Modal)
    : _a.addEventListener('load', Modal, false);
})(window, 'https://widget.heymarket.com/heymk-widget.bundle.js', document, {
  CLIENT_ID: 'K3P4vXQLe4xvYoG1dIWjbbXz_gvE3BLQaowy6gm5',
});
