

module.exports = function(RED) {

    function FileLoaderNode(config) {
    	RED.nodes.createNode(this,config);

		var globalContext = this.context().global;
		var maxBufferSize = Number(config.maxBufferSize);

		var node = this;
				
		var alreadyComputedMetrics = false;

    	this.on('input', function(msg){
    		//TODO
    	});

	}

    RED.nodes.registerType("fileLoader",FileLoaderNode);
}