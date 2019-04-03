
module.exports = function(RED) {

    function NormalizerNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;

        node.alreadyComputedMetrics = false;

        node.on('input', function(msg) {

            var features = msg.payload;
            var nFeatures = features.length;

            var means = config.means.split(",");
            var stds = config.stds.split(",");

            if(nFeatures == means.length && nFeatures == stds.length){
                var normalizedFeatures = [];

                for (var i = 0 ; i < nFeatures ; i++){
                    var mean = Number(means[i]);
                    var std = Number(stds[i]);
                    var normalizedFeature = (features[i] - mean) / std;
                    normalizedFeatures.push(normalizedFeature);
                }

                msg.payload = normalizedFeatures;
                node.send(msg);
            } else {
                console.log('Feature Normalizer - mismatch in the number of features');
            }
        });
    }

    function computeMetrics(node,n){

        if(!node.alreadyComputedMetrics){
            global.Metrics.memory += n;
            node.alreadyComputedMetrics = true;
        }

        global.Metrics.flops += 13 * n + 2;
    }

    RED.nodes.registerType("featureNormalizer",NormalizerNode);
}