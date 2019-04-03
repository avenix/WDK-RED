
module.exports = function(RED) {

    function FeatureSelectorNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
	    	//TODO
            node.send(msg);
        });
    }
    

    RED.nodes.registerType("featureSelector",FeatureSelectorNode);
}