export const chessMoves = {
    nodes: [
        { id: "Start" },
        { id: "e4" }, { id: "e5" },
        { id: "Nf3" }, { id: "Nc6" },
        { id: "Bb5" }, { id: "a6" },
        { id: "Ba4" }, { id: "Nf6" },
        { id: "O-O White" }, { id: "Be7" },
        { id: "Re1" }, { id: "b5" },
        { id: "Bb3" }, { id: "d6" },
        { id: "c3" }, { id: "O-O Black" },
        { id: "h3" }, { id: "Na5" },
        { id: "Bc2" }, { id: "c5" }
    ],
    links: [
        { source: "Start", target: "e4" },
        { source: "e4", target: "e5" },
        { source: "e5", target: "Nf3" },
        { source: "Nf3", target: "Nc6" },
        { source: "Nc6", target: "Bb5" },
        { source: "Bb5", target: "a6" },
        { source: "a6", target: "Ba4" },
        { source: "Ba4", target: "Nf6" },
        { source: "Nf6", target: "O-O White" },
        { source: "O-O White", target: "Be7" },
        { source: "Be7", target: "Re1" },
        { source: "Re1", target: "b5" },
        { source: "b5", target: "Bb3" },
        { source: "Bb3", target: "d6" },
        { source: "d6", target: "c3" },
        { source: "c3", target: "O-O Black" },
        { source: "O-O Black", target: "h3" },
        { source: "h3", target: "Na5" },
        { source: "Na5", target: "Bc2" },
        { source: "Bc2", target: "c5" }
    ]
};
