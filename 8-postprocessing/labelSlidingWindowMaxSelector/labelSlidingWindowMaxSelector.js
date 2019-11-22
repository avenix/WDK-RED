module.exports = function(RED) {

    function LabelSlidingWindowMaxSelector(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
			//TODO
        });
    }
    
    RED.nodes.registerType("labelSlidingWindowMaxSelector",LabelSlidingWindowMaxSelector);
}