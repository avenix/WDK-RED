
module.exports = function(RED) {

    function FeatureExtractorNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        var jStat = node.context().global.get('jStat');

        node.on('input', function(msg) {
	    	//TODO
            node.send(msg);
        });
    }
    

    RED.nodes.registerType("featureExtractor",FeatureExtractorNode);
}