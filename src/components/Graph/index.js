import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import './styles.css';

const Graph = ({ data }) => {
  const networkRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const container = networkRef.current;
    const options = {
      nodes: {
        borderWidth: 2,
        borderWidthSelected: 4,
        shapeProperties: {
        useImageSize: false,
        useBorderWithImage: true,
    },
      },
      edges: {
        width: 2,
        color: { inherit: 'from' },
      },
      physics: {
        enabled: true,
        solver: 'barnesHut', // Consider switching to 'barnesHut'
        stabilization: {
          iterations: 200, // Reduced iterations for faster stabilization
          updateInterval: 50,
        },
        barnesHut: {
          gravitationalConstant: -2000, // Stronger repulsion to spread out nodes faster
          centralGravity: 0.3,
          springLength: 100,
          springConstant: 0.04,
          damping: 0.09,
        },
      },
      layout: {
        improvedLayout: false,
      }
    };

    const network = new Network(container, data, options);

    network.on("stabilizationIterationsDone", function () {
      setLoading(false);  // Stop showing the loading message
    });

    network.on('click', function (params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const clickedNode = data.nodes.find(node => node.id === nodeId);
        setSelectedNode(clickedNode);
      } else {
        setSelectedNode(null);
      }
    });

    return () => {
      network.destroy();
    };
  }, [data]);

  console.log('selectedNode: ', selectedNode);
  console.log('loading: ', loading);

  return (
    <div className='graph__wrapper'>
      <div ref={networkRef} className='graph' />
      {loading && <p className='graph__loading'>Generating...</p>}
      {selectedNode && (
        <div className='graph__details'>
          <p><strong>Type:</strong> {selectedNode.group}</p>
          <p><strong>Name:</strong> {selectedNode.name}</p>
        </div>
      )}
    </div>
  );
};

export default Graph;