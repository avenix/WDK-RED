

module.exports = function(RED) {

    function RingBufferNode(config) {
    	RED.nodes.createNode(this,config);

		var globalContext = this.context().global;
		var maxBufferSize = Number(config.maxBufferSize);

		var node = this;
		
		initializeRingBuffer(node);
		
		var alreadyComputedMetrics = false;

    	this.on('input', function(msg){
    		
    		var globalContext = node.context().global;
			var ringBuffer = globalContext.get(global.WDKConstants.kRingBufferStr);
			var maxBufferSize = Number(config.maxBufferSize);
			var eventOffset = Number(config.eventOffset);
			ringBuffer.nAxes = config.numAxes;

			var newSample = msg.payload;
			if(msg.parts.index < msg.parts.count){
				if(newSample.length == config.numAxes){
					ringBuffer.data[ringBuffer.endIdx] = newSample;

					if(ringBuffer.size < maxBufferSize){
						ringBuffer.size++;
					}

					//select sample at end-offset
					if(eventOffset < ringBuffer.size){
						var eventIdx = ringBuffer.endIdx - eventOffset;
						if(eventIdx < 0){
							eventIdx += maxBufferSize;
						}
						msg.payload = ringBuffer.data[eventIdx];	
					}

					ringBuffer.endIdx++;
					if(ringBuffer.endIdx >= maxBufferSize){
						ringBuffer.endIdx = 0;	
					}

			    	computeMetrics(node);

					globalContext.set(WDKConstants.kRingBufferStr,ringBuffer);
					node.send(msg);

				} else {
					console.log('Trying to add %d components to ring buffer. Should be %d',newSample.length,config.numAxes);
				}
			}
    	});

		function initializeRingBuffer(node){

    		var globalContext = node.context().global;

		    var ringBuffer = {
		        size : 0,
		        endIdx : 0,
		        nAxes : 0,
		        data : []
		    };

		    globalContext.set(global.WDKConstants.kRingBufferStr,ringBuffer);
		}

    	function computeMetrics(node){

			if(!node.alreadyComputedMetrics){
				var memory = config.maxBufferSize * config.numAxes * 4;
				global.Metrics.memory += memory;
				node.alreadyComputedMetrics = true;
			}
			global.Metrics.flops += 10;
    	}
	}

    RED.nodes.registerType("ringBuffer",RingBufferNode);
}