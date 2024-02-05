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

const Arrange3: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const root: Node = { id: "A", x: canvas.width / 2, y: 50 }; // Root node at the top center
      const relatedNodes: Node[] = [
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
        // Add more related nodes as needed
      ];

      // Calculate initial positions for related nodes
      if (root.x && root.y) {
        const centerX = root.x;
        const centerY = root.y + 100; // Adjust vertical distance from root node
        const radius = Math.min(canvas.width, canvas.height) * 0.3; // Adjust the radius as needed
        const angleIncrement = (2 * Math.PI) / relatedNodes.length;

        relatedNodes.forEach((node, index) => {
          const angle = index * angleIncrement;
          node.x = centerX + radius * Math.cos(angle);
          node.y = centerY + radius * Math.sin(angle);
        });
      }

      const nodes: Node[] = [root, ...relatedNodes];

      // Visualization: Draw nodes and edges on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        if (node.x && node.y) {
          ctx.beginPath();
          ctx.fillStyle = node === root ? "red" : "white"; // Color root node differently
          ctx.fill();
          ctx.beginPath();
          ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
          ctx.fill();
          ctx.strokeStyle = "blue";
          ctx.stroke();
          ctx.font = "bold 14px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.id, node.x, node.y);
        }
      });

      const edges: Edge[] = relatedNodes.map((node) => ({
        source: root.id,
        target: node.id,
      }));

      edges.forEach((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);

        if (sourceNode && targetNode) {
          if (sourceNode.x && sourceNode.y && targetNode.x && targetNode.y) {
            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.strokeStyle = "black";
            ctx.stroke();
          }
        }
      });
    }
  }, []);

  return <canvas ref={canvasRef} width={400} height={300} />;
};

export default Arrange3;
