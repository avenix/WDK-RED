
module.exports = function(RED) {

    function SegmentNode(config) {
    	RED.nodes.createNode(this,config);

    	var node = this;

    	node.alreadyComputedMetrics = false;

    	node.on('input', function(msg){
    		handleInput(msg,config,node);
    	});
	}
    
    function handleInput(msg,config,node) {

		var startIdx = Number(config.start);
		var endIdx = Number(config.end);

		var columnIdxs = config.columnIdxs.split(" ");

		computeMetrics(node,startIdx,endIdx,columnIdxs);

		var segment = extractSegment(node,startIdx,endIdx,columnIdxs);

		msg.payload = segment;
		node.send(msg);
    }

    function extractSegment(node,startIdx, endIdx, columnIdxs){
		var globalContext = node.context().global;
		var ringBuffer = globalContext.get(global.WDKConstants.kRingBufferStr);
		var nCols = columnIdxs.length;
    	var bufferStart = ringBuffer.endIdx - ringBuffer.size;
		if (bufferStart < 0) {
			bufferStart += ringBuffer.size;
		}

		var nSamples = endIdx - startIdx + 1;

		startIdx = (bufferStart + startIdx) % ringBuffer.size;
		//endIdx = (bufferStart + endIdx) % ringBuffer.size;

		var segment = new Array(nSamples);
		if(nCols > 1){
			for(var i = 0 ; i < nSamples ; i++){
				segment[i] = new Array(nCols);
			}
		}

		if(nCols > 1){
			for(var columnIdx = 0 ; columnIdx < nCols ; columnIdx++){
				var currentColumn = Number(columnIdxs[columnIdx]);

				for(var i = 0 ; i < nSamples; i++){
					var idx = (i + startIdx) % ringBuffer.size;
					var sample = ringBuffer.data[idx][currentColumn];
					segment[i][columnIdx] = sample;
				}
			}
		} else {
			var currentColumn = Number(columnIdxs[0]);
			for(var i = 0 ; i < nSamples; i++){
				var idx = (i + startIdx) % ringBuffer.size;
				var sample = ringBuffer.data[idx][currentColumn];
				segment[i] = sample;
			}
		}

		return segment;
	}

	function computeMetrics(node, startIdx, endIdx, columnIdxs){

		var n = (endIdx - startIdx) + 1;
		var nColumns = columnIdxs.length;

		if(!node.alreadyComputedMetrics){
			global.Metrics.memory += n * nColumns;
			node.alreadyComputedMetrics = true;
		}
		global.Metrics.flops += 5 * n * nColumns;
	}

    RED.nodes.registerType("segment",SegmentNode);
}