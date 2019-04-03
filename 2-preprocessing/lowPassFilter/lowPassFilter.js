module.exports = function(RED) {

    function LowPassFilter(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
			//TODO
        });
    }
    
    RED.nodes.registerType("lowPassFilter",LowPassFilter);
}