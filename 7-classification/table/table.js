
module.exports = function(RED) {

    function TableNode(config) {
        RED.nodes.createNode(this,config);

        var node = this;

        resetFeaturesTable(node);

        node.on('input', function(msg){
            handleInput(msg,config,node);
        });
    }
    
    function handleInput(msg,config,node) {

        var nodeContext = node.context();
        var featuresTable = nodeContext.get(global.WDKConstants.kFeaturesTableStr);

        if(typeof msg.parts !== 'undefined' && msg.parts.index >= msg.parts.count){

            msg.payload = featuresTable;
            node.send(msg);
  
            resetFeaturesTable(node);

        } else {

            var featureVector = msg.payload;
            
            featuresTable.addFeatureVector(featureVector);
            
            computeMetrics(featureVector);
        }
    }

    function computeMetrics(featureVector){
        var nFeatures = featureVector.length;
        global.Metrics.memory += nFeatures *  4;
        global.Metrics.flops += 2 * nFeatures;
    }

    function resetFeaturesTable(node){
        var nodeContext = node.context();
        var featuresTable = new global.WDKFeaturesTable();
        nodeContext.set(global.WDKConstants.kFeaturesTableStr,featuresTable);
    }

    RED.nodes.registerType("table",TableNode);
}