
module.exports = function(RED) {

    function ZCRNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        
        node.alreadyComputedMetrics = false;

        node.on('input', function(msg) {
            var data = msg.payload;
            
            var isAboveZero = [];

            var n = data.length;
            computeMetrics(node,n);

            for(var i = 0 ; i < data.length ; i++){
                isAboveZero.push(data[i] > 0);
            }

            var sum = 0;
            for(var i = 1 ; i < isAboveZero.length ; i++){
                sum += Math.abs(isAboveZero[i] - isAboveZero[i-1]);
            }
            sum /= n;

            var msg = global.createOrderedMessageWithValue(sum,config.featureIdx);
            node.send(msg);
        });
    }
    
    function computeMetrics(node,n){

        if(!node.alreadyComputedMetrics){
            global.Metrics.memory += n/8;
            node.alreadyComputedMetrics = true;
        }
        global.Metrics.flops += 13 * n + 2;
    }


    RED.nodes.registerType("zcr",ZCRNode);
}