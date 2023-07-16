import DrumMachine from "./DrumMachine";

function App() {
    return (
        <DrumMachine
            samples={[
                { url: "/hat-closed.wav", name: "HIHAT", index: 0 },
                { url: "/clap.wav", name: "CLAP", index: 1 },
                { url: "/snare.wav", name: "SD", index: 2 },
                { url: "/kick.wav", name: "BD", index: 3 },
                { url: "/kick.wav", name: "BLAH", index: 4 },
            ]}
        />
    );
}

export default App;
