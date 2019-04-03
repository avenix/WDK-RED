module.exports = function(RED) {

    function MagnitudeSquared(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = msg.payload[0] * msg.payload[0] + msg.payload[1] * msg.payload[1] + msg.payload[2] * msg.payload[2];
            node.send(msg);
        });
    }
    
    RED.nodes.registerType("magnitudeSquared",MagnitudeSquared);
}