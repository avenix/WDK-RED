
module.exports = function(RED) {

    function MinNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        var jStat = node.context().global.get('jStat');

        node.on('input', function(msg) {
	    	var min = jStat.min(msg.payload);
            var n = msg.payload.length;
            
            computeMetrics(node,n);

            var msg = global.createOrderedMessageWithValue(min,config.featureIdx);
            node.send(msg);
        });
    }
    
    function computeMetrics(node,n){

        var globalContext = node.context().global;
        global.Metrics.flops += 4 * n;
    }

    RED.nodes.registerType("min",MinNode);
}