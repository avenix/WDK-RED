
module.exports = function(RED) {

    function FeatureVectorNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        node.alreadyComputedMetrics = false;
        node.alreadyInitializedFeatureVector = false;

        var featureVector = {data: [], size: 0};
        //resetFeatureVector(node);

        node.on('input', function(msg) {

            var nFeatures = config.nFeatures;
            var feature = msg.payload;
            var currentIdx = msg.parts.index;

            if(!node.alreadyInitializedFeatureVector){
                featureVector.data = new Array(nFeatures);
                node.alreadyInitializedFeatureVector = true;
            }

            featureVector.data[currentIdx] = feature;
            featureVector.size++;
            
            computeMetrics(node,nFeatures);

            if(featureVector.size >= nFeatures){
                msg.payload = featureVector.data;
                node.send(msg);
                featureVector = {data: new Array(nFeatures), size: 0};
            }
        });
    }

    function computeMetrics(node,n){
        if(!node.alreadyComputedMetrics){
            global.Metrics.memory += n * 4;
            node.alreadyComputedMetrics = true;
        }
        global.Metrics.flops ++;
    }

    RED.nodes.registerType("featureVector",FeatureVectorNode);
}