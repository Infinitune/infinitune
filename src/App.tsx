import DrumMachine from "./DrumMachine";

function App() {
    return (
        <DrumMachine
            samples={[
                { url: "/hat-closed.wav", name: "CH" },
                { url: "/clap.wav", name: "CL" },
                { url: "/snare.wav", name: "SD" },
                { url: "/kick.wav", name: "BD" },
                { url: "/kick.wav", name: "BLAH" },
            ]}
        />
    );
}

export default App;
