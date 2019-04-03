
module.exports = function(RED) {

    function MeanNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        var jStat = node.context().global.get('jStat');

        node.on('input', function(msg) {
	    	var mean = jStat.mean(msg.payload);
            var n = msg.payload.length;

            computeMetrics(node,n);
                    
            var msg = global.createOrderedMessageWithValue(mean,config.featureIdx);
            node.send(msg);
        });
    }
    
    function computeMetrics(node,n){
        global.Metrics.flops += 5 * n + 3;
    }

    RED.nodes.registerType("mean",MeanNode);
}