module.exports = function(RED) {

    function PropertyGetter(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            node.send(msg);
        });
    }
    
    RED.nodes.registerType("propertyGetter",PropertyGetter);
}