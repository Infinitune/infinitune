import DrumMachine from "./DrumMachine";

function App() {
    return (
        <DrumMachine
            samples={[
                { url: "/kick.wav", name: "KICK", index: 0 },
                { url: "/clap.wav", name: "CLAP", index: 1 },
                { url: "/hat-closed.wav", name: "HIHAT", index: 2 },
                { url: "/snare.wav", name: "SNARE", index: 3 },
                { url: "/snap.wav", name: "SNAP", index: 4 },
            ]}
        />
    );
}

export default App;
