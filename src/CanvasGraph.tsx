import React, { useEffect, useRef } from "react";

interface Node {
  id: string;
  x?: number;
  y?: number;
  count?: number;
}

interface Edge {
  source: string;
  target: string;
}

const GraphCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const nodes: Node[] = [
        { id: "A", x: 100, y: 100, count: 50 },
        { id: "B", x: 200, y: 150, count: 200 },
        { id: "C", x: 300, y: 200, count: 400 },
        { id: "D", x: 200, y: 350, count: 500 },
        { id: "E", x: 200, y: 50, count: 1000 },
        { id: "F", x: 280, y: 100, count: 2000 },
        { id: "G", x: 300, y: 200, count: 3000 },
        { id: "H", x: 310, y: 300, count: 4000 },
        { id: "I", x: 250, y: 420, count: 5000 },
        { id: "J", x: 100, y: 450, count: 6000 },
        { id: "K", x: 100, y: 300, count: 7000 },
        // Add more nodes as needed
      ];

      const edges: Edge[] = [
        { source: "A", target: "B" },
        { source: "B", target: "C" },
        { source: "B", target: "D" },
        { source: "B", target: "E" },
        { source: "G", target: "B" },
        { source: "F", target: "B" },
        { source: "C", target: "D" },
        { source: "K", target: "D" },
        { source: "H", target: "D" },
        { source: "I", target: "D" },
        { source: "J", target: "D" },
        // Define edges between nodes
      ];

      // Dynamically calculate initial positions based on canvas dimensions
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      nodes.forEach((node, index) => {
        const angle = (index / nodes.length) * (2 * Math.PI);
        const radius = Math.min(centerX, centerY) * 0.8; // Adjust the radius as needed
        node.x = centerX + radius * Math.cos(angle);
        node.y = centerY + radius * Math.sin(angle);
      });

      // Visualization: Draw nodes and edges on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      edges.forEach((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);

        if (sourceNode && targetNode && targetNode.x && targetNode.y) {
          if (sourceNode.x && sourceNode.y) {
            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.strokeStyle = "black";
            ctx.stroke();
          }
        }
      });

      nodes.forEach((node) => {
        if (node.x && node.y) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.strokeStyle = "blue";
          ctx.stroke();
          ctx.font = "bold 14px Arial";
          ctx.fillStyle = "blue";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.id, node.x, node.y);
        }
      });
    }
  }, []);

  return <canvas ref={canvasRef} width={400} height={300} />;
};

export default GraphCanvas;
