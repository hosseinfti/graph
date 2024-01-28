import React, { useRef, useEffect } from "react";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // const canvas: any = canvasRef.current;
    // if (canvas) {
    //   const ctx = canvas.getContext("2d");

    //   // Set properties for drawing
    //   ctx.fillStyle = "blue"; // Fill color
    //   ctx.strokeStyle = "red"; // Stroke color

    //   // Draw a circle using arc method
    //   ctx.beginPath();
    //   ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    //   ctx.fill(); // Fill the circle with blue color
    //   ctx.stroke(); // Draw the outline of the circle with red color
    // }
    drawGraph();
  }, []);

  const nodes = [
    { id: "A", x: 100, y: 100 },
    { id: "B", x: 200, y: 150 },
    { id: "C", x: 300, y: 200 },
  ];
  const edges = [
    { source: "A", target: "B" },
    { source: "B", target: "C" },
  ];

  // Function to draw a node
  function drawNode(ctx: any, node: any) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.id, node.x, node.y);
  }

  // Function to draw an edge
  function drawEdge(ctx: any, edge: any) {
    const sourceNode: any = nodes.find((node) => node.id === edge.source);
    const targetNode: any = nodes.find((node) => node.id === edge.target);
    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.lineTo(targetNode.x, targetNode.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // Function to draw the entire graph
  function drawGraph() {
    const canvas: any = document.getElementById("graphCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    edges.forEach((edge) => drawEdge(ctx, edge));
    nodes.forEach((node) => drawNode(ctx, node));
  }

  // Call the drawGraph function to render the graph

  return <canvas id={"graphCanvas"} ref={canvasRef} width={500} height={500} />;
}

export default App;
