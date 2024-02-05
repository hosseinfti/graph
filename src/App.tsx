import React, { useRef, useEffect } from "react";

interface nodeType {
  id: string;
  x: number;
  y: number;
  count: number;
}
interface edgesType {
  source: string;
  target: string;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawGraph();
  }, []);

  const nodes: nodeType[] = [
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
  ];
  
  const edges: edgesType[] = [
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
  ];

  // function calculateCoordinates(
  //   nodes: nodeType[],
  //   edges: edgesType[],
  //   iterations: number
  // ): nodeType[] {
  //   // Initialize node positions randomly
  //   nodes.forEach((node: nodeType, index) => {
  //     node.x = (Math.random() * node.count) / 2 + index;
  //     node.y = (Math.random() * node.count) / 2 + index;
  //   });

  //   // Repulsive force constant
  //   const k = 0.1;

  //   // Attractive force constant
  //   const l = 0.1;

  //   // Perform iterations of force simulation
  //   for (let i = 0; i < iterations; i++) {
  //     // Calculate repulsive forces between nodes
  //     nodes.forEach((node1: nodeType) => {
  //       nodes.forEach((node2: nodeType) => {
  //         if (node1 !== node2) {
  //           const dx = node2.x - node1.x;
  //           const dy = node2.y - node1.y;
  //           const distanceSquared = dx * dx + dy * dy;
  //           const force = k / distanceSquared;
  //           node1.x += force * dx;
  //           node1.y += force * dy;
  //         }
  //       });
  //     });

  //     // Calculate attractive forces along edges
  //     edges.forEach((edge) => {
  //       const sourceNode = nodes.find(
  //         (node: nodeType) => node.id === edge.source
  //       );
  //       const targetNode = nodes.find(
  //         (node: nodeType) => node.id === edge.target
  //       );

  //       if (sourceNode && targetNode) {
  //         const dx = targetNode.x - sourceNode.x;
  //         const dy = targetNode.y - sourceNode.y;
  //         const distance = Math.sqrt(dx * dx + dy * dy);
  //         const force = l * distance;
  //         sourceNode.x += (force * dx) / distance;
  //         sourceNode.y += (force * dy) / distance;
  //         targetNode.x -= (force * dx) / distance;
  //         targetNode.y -= (force * dy) / distance;
  //       }
  //     });
  //   }

  //   return nodes;
  // }
  // const iterations = 100; // Number of iterations for the force simulation
  // const calculatedNodes = calculateCoordinates(nodes, edges, iterations);
  // console.log(calculatedNodes);

  // Function to draw a node

  function drawNode(ctx: CanvasRenderingContext2D, node: nodeType) {
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

  // Function to draw an edge
  function drawEdge(ctx: any, edge: any) {
    const sourceNode: nodeType | undefined = nodes.find(
      (node) => node.id === edge.source
    );
    const targetNode: nodeType | undefined = nodes.find(
      (node) => node.id === edge.target
    );
    ctx.beginPath();
    ctx.moveTo(sourceNode?.x, sourceNode?.y);
    ctx.lineTo(targetNode?.x, targetNode?.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // Function to draw the entire graph
  function drawGraph() {
    const canvas: HTMLCanvasElement = document.getElementById(
      "graphCanvas"
    ) as HTMLCanvasElement;

    // console.log({ startWidth: window.innerWidth / 2 / 2 });
    // console.log({ startHeight: window.innerHeight / 2 / 2 });
    // console.log({
    //   endWidth: window.innerWidth / 2 + window.innerWidth / 2 / 2,
    // });
    // console.log({
    //   endHeight: window.innerHeight / 2 + window.innerWidth / 2 / 2,
    // });
    if (canvasRef) {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (canvas) {
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (canvas && ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          // const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          edges.forEach((edge) => drawEdge(ctx, edge));
          nodes.forEach((node) => drawNode(ctx, node));
        }
      }
    }
  }

  // Call the drawGraph function to render the graph

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <canvas id={"graphCanvas"} ref={canvasRef} />
    </div>
  );
}

export default App;
