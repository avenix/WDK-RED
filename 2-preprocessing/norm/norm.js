module.exports = function(RED) {

    function Norm(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = Math.abs(msg.payload[0]) + Math.abs(msg.payload[1]) + Math.abs(msg.payload[2]);
            node.send(msg);
        });
    }
    
    RED.nodes.registerType("norm",Norm);
}