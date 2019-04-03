module.exports = function(RED) {

    function AxisSelector(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            //TODO
            node.send(msg);
        });
    }
    
    RED.nodes.registerType("axisSelector",AxisSelector);
}