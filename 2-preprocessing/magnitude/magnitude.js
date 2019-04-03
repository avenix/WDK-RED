module.exports = function(RED) {

    function Magnitude(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = Math.sqrt(msg.payload[0] * msg.payload[0] + msg.payload[1] * msg.payload[1] + msg.payload[2] * msg.payload[2]);
            node.send(msg);
        });
    }
    
    RED.nodes.registerType("magnitude",Magnitude);
}