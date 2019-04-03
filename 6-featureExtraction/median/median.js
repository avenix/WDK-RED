
module.exports = function(RED) {

    function MedianNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        
        var jStat = node.context().global.get('jStat');
        node.alreadyComputedMetrics = false;

        node.on('input', function(msg) {
            var data = msg.payload;
            var n = data.length;

            computeMetrics(node,n);

            var median = jStat.median(msg.payload);
            var msg = global.createOrderedMessageWithValue(median,config.featureIdx);

            node.send(msg);
        });
    }
    
    function computeMetrics(node,n){

        if(!node.alreadyComputedMetrics){
            global.Metrics.memory += n;
            node.alreadyComputedMetrics = true;
        }
        global.Metrics.flops += 13 * n + 2;
    }

    RED.nodes.registerType("median",MedianNode);
}