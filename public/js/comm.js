//(function() {
  var Msock;
  Msock = (function() {
    function Msock(url, options) {
      this.url = url;
      this.options = options;
      this.connected = false;
      this.keepConnexion();
    }
    Msock.prototype.keepConnexion = function() {
      var that, wc;
      that = this;
      this.socket = io.connect(this.url, this.options);
      this.socket.on('connecting', function(type) {
        $.growl('Connecting...[' + type + ']');
        return that.type = type;
      });
      this.socket.on('connect', function() {
        that.connected = true;
        return $.growl('Connected');
      });
      this.socket.on('connect_failed', function() {
        return $.growl('Connection failed, please check your internet connexion');
      });
      wc = this;
      return this.socket.on('disconnect', function() {
        that.connected = false;
        return wc.displayError('You are disconnected !<br/>Reconnection...');
      });
    };
    Msock.prototype.emit = function(event, hash) {
      if (this.connected) {
        return this.socket.emit(event, hash);
      } else {
        return this.displayError('You\'re not connected, please wait...');
      }
    };
    Msock.prototype.on = function(event, f) {
      return this.socket.on(event, f);
    };
    Msock.prototype.displayError = function(mess) {
      return $.growl(mess);
    };
    return Msock;
  })();
//}).call(this);
