
module.exports = function(RED) {

    function KurtosisNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            node.send(msg);
        });
    }
    

    RED.nodes.registerType("kurtosis",KurtosisNode);
}