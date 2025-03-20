import React, { useEffect, useRef } from "react";
import ForceGraph from "force-graph";
import { chessMoves } from "../../../../service/data/ChessMoves";

export default function ChessForceGraph() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const myGraph = new ForceGraph(containerRef.current)
            .graphData(chessMoves)
            .nodeLabel("id")
            .nodeRelSize(5)
            .backgroundColor("#101010")
            .linkWidth(0.5)
            .linkColor(() => "white")
            .dagMode("radialin")
            .onNodeHover(node => (containerRef.current!.style.cursor = node ? "pointer" : "default"))
            .onNodeClick(node => alert(`Move selected: ${node.id}`))
            .warmupTicks(0)
            .cooldownTicks(Infinity)
            .cooldownTime(Infinity)
            myGraph
                .d3AlphaDecay(0.01)  // Slower decay keeps the animation running
                .d3VelocityDecay(0.3) // Lower decay means nodes keep moving longer


            // Custom Glow Effect using `nodeCanvasObject`
            .nodeCanvasObject((node, ctx, globalScale) => {
                const label = node.id as string;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "white";

                // Draw glowing circle
                ctx.shadowColor = "white";
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(node.x!, node.y!, 8, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow

                // Draw node label
                ctx.fillText(label, node.x!, node.y! + 15);
            });

        const chargeForce = myGraph.d3Force("charge");
        if (chargeForce) chargeForce.strength(-800);

        const linkForce = myGraph.d3Force("link");
        if (linkForce) linkForce.distance(200).strength(0.1);;


    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100vw",
                height: "95vh",
                background: "#101010"
            }}
        />
    );
}
