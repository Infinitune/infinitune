import DrumMachine from "./DrumMachine";
import SynthTest from "./SynthTest";
import * as Tone from "tone";

function App() {
    return (
        <div className="App">
            <SynthTest />
            <DrumMachine
                samples={[
                    {
                        synths: [
                            {
                                type: "MembraneSynth",
                                config: Tone.Synth.getDefaults(),
                                note: "C2",
                                duration: "8n",
                            },
                        ],
                        name: "KICK",
                        index: 0,
                    },
                    {
                        synths: [
                            {
                                type: "Synth",
                                config: Tone.NoiseSynth.getDefaults(),
                                note: null,
                                duration: "16n",
                            },
                        ],
                        name: "CLAP",
                        index: 1,
                    },
                    {
                        synths: [
                            {
                                type: "Synth",
                                config: Tone.NoiseSynth.getDefaults(),
                                note: null,
                                duration: "16n",
                            },
                        ],
                        name: "HIHAT",
                        index: 2,
                    },
                    {
                        synths: [
                            {
                                type: "Synth",
                                config: Tone.NoiseSynth.getDefaults(),
                                note: null,
                                duration: "16n",
                            },
                            {
                                type: "MembraneSynth",
                                config: Tone.Synth.getDefaults(),
                                note: "C2",
                                duration: "16n",
                            },
                        ],
                        name: "SNARE",
                        index: 3,
                    },
                    {
                        synths: [
                            {
                                type: "MetalSynth",
                                config: Tone.MetalSynth.getDefaults(),
                                note: null,
                                duration: "16n",
                            },
                        ],
                        name: "SNAP",
                        index: 4,
                    },
                ]}
            />
        </div>
    );
}

export default App;
