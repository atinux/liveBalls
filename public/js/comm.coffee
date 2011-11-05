# By Sébastien Chopin, gestion de la communication server-client des sockets avec gestion d'erreurs

class Msock
	constructor: (@url, @options) ->
		@connected = false
		@keepConnexion()
	keepConnexion: ->
		# connection socket.io
		that = @
		@socket = io.connect(@url, @options);
		@socket.on('connecting', (type) ->
			$.growl('Connecting...['+type+']')
			that.type = type
		)
		@socket.on('connect', ->
			that.connected = true
			$.growl('Connected')
		)
		@socket.on('connect_failed', ->
			$.growl('Connection failed, please check your internet connexion')
		)
		wc = @
		@socket.on('disconnect', ->
			that.connected = false
			wc.displayError 'You are disconnected !<br/>Reconnection...'
		)
	emit:	(event, hash) ->
		if (@connected)
			@socket.emit(event, hash)
		else
			@displayError ('You\'re not connected, please wait...')
	on:	(event, f) ->
		@socket.on(event, f)
	displayError: (mess) -> $.growl(mess)
