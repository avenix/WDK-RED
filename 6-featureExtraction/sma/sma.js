
module.exports = function(RED) {

    function SMANode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        
        node.alreadyComputedMetrics = false;

        node.on('input', function(msg) {
            var data = msg.payload;

            if(data.length > 0){

                var n = data.length;
                var sum = 0;

                if(data[0].length == "undefined"){

                    for(var i = 0 ; i < n ; i++){
                        sum += Math.abs(data[i]);
                    }

                } else {
                    for(var i = 0 ; i < n ; i++){

                        for(var j = 0 ; j < data[i].length ; j++){
                           sum += Math.abs(data[i][j]);
                        }
                    }
                }
                
                computeMetrics(node,data);

                var msg = global.createOrderedMessageWithValue(sum,config.featureIdx);
                node.send(msg);
            }
        });
    }
    
    function computeMetrics(node,data){

        var n = data.length;
        if(data[0].length !== "undefined"){
            n *= data[0].length;
        }

        if(!node.alreadyComputedMetrics){
            global.Metrics.memory += n;
            node.alreadyComputedMetrics = true;
        }
        global.Metrics.flops += 6 * n + 2;
    }


    RED.nodes.registerType("sma",SMANode);
}