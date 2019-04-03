
module.exports = function(RED) {

    function SVMClassifierNode(config) {
    	RED.nodes.createNode(this,config);

    	var node = this;
    	node.on('input', function(msg){
    		handleInput(msg,config,node);
    	});
	}
    
    function handleInput(msg,config,node) {

		var mode = Number(config.mode);

		msg.payload = {};
		node.send(msg);
    }

    RED.nodes.registerType("svmClassifier",SVMClassifierNode);
}