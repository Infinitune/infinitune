import React from "react";
import * as Tone from "tone";

export default function SynthTest() {
    const handleClick = async () => {
        await Tone.start();
        const synth = new Tone.NoiseSynth().toDestination();
        synth.triggerAttackRelease("8n");

        const metal = new Tone.MetalSynth().toDestination();
        metal.triggerAttackRelease("8n");
    };

    return <button onClick={handleClick}>Click me to play sounds</button>;
}
