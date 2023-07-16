import React from "react";
import * as Tone from "tone";

import styles from "./DrumMachine.module.scss";

import { Tooltip } from "react-tooltip";

const NOTE = "C2";

export default function DrumMachine({ samples, numOfSteps = 16 }) {
    const [isPlaying, setIsPlaying] = React.useState(false);

    const tracksRef = React.useRef([]);
    const stepsRef = React.useRef([[]]);
    const lampsRef = React.useRef([]);
    const seqRef = React.useRef(null);
    const textareaRefs = React.useRef([]);

    const trackIds = [...Array(samples.length).keys()];
    const stepIds = [...Array(numOfSteps).keys()];

    const handleStartClick = async () => {
        if (Tone.Transport.state === "started") {
            Tone.Transport.pause();
            setIsPlaying(false);
        } else {
            await Tone.start();
            Tone.Transport.start();
            setIsPlaying(true);
        }
    };

    const handleBpmChange = (e) => {
        Tone.Transport.bpm.value = Number(e.target.value);
    };

    const handleVolumeChange = (e) => {
        Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value));
    };
    const handleGenerateClick = async (e, index) => {
        e.preventDefault();
        const text = textareaRefs.current[index].value;
        console.log(index, text);

        // Define the request parameters
        const url = "https://2a83-68-7-31-205.ngrok-free.app/sound";
        const data = { text }; // Creates an object { text: "blah" } if textarea contains "blah"

        try {
            // Send the request
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // Converts { text: "blah" } to '{"text":"blah"}'
            });

            // Log the response for debugging purposes
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    React.useEffect(() => {
        tracksRef.current = samples.map((sample, i) => ({
            id: i,
            sampler: new Tone.Sampler({
                urls: {
                    [NOTE]: sample.url,
                },
            }).toDestination(),
        }));
        seqRef.current = new Tone.Sequence(
            (time, step) => {
                tracksRef.current.map((trk) => {
                    if (stepsRef.current[trk.id]?.[step]?.checked) {
                        trk.sampler.triggerAttack(NOTE, time);
                    }
                    lampsRef.current[step].checked = true;
                });
            },
            [...stepIds],
            "16n"
        );
        seqRef.current.start(0);

        return () => {
            seqRef.current?.dispose();
            tracksRef.current.map((trk) => trk.sampler.dispose());
        };
    }, [samples, numOfSteps]);

    return (
        <div className={styles.machine}>
            <div className={styles.labelList}>
                {samples.map((sample, index) => (
                    <>
                        <button
                            id={`clickable${sample.index}`}
                            key={index}
                            style={{
                                backgroundColor: "#33ff66",
                                border: "none",
                                borderRadius: 7,
                                color: "white",
                                boxShadow:
                                    "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                                backdropFilter: "blur(6px)",
                                borderRadius: 5,
                                border: "1px solid rgba(255, 255, 255, 0.18)",
                                height: "40px !important",
                                marginBottom: "2px",
                                minWidth: "80px",
                                fontWeight: " bold",
                            }}
                        >
                            {sample.name}
                        </button>
                        <Tooltip
                            anchorSelect={`#clickable${sample.index}`}
                            clickable
                        >
                            <textarea
                                name="a"
                                autoFocus
                                cols="30"
                                rows="2"
                                resize="none"
                                style={{ borderRadius: "5px", resize: "none" }}
                                ref={(elm) => {
                                    // store reference to the textarea
                                    textareaRefs.current[index] = elm;
                                }}
                            ></textarea>

                            <button
                                style={{
                                    background:
                                        "linear-gradient(-90deg, #EE7752, #E73C7E, #23A6D5, #23D5AB, #EE7752)",
                                    textTransform: "uppercase",
                                    fontWeight: "700",
                                    border: "none",
                                    animation: "Gradient 4s ease infinite",
                                    textDecoration: "none",

                                    color: "black",
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                }}
                                onClick={(e) => handleGenerateClick(e, index)}
                            >
                                GENERATE
                            </button>
                        </Tooltip>
                    </>
                ))}
            </div>

            <div className={styles.grid}>
                <div className={styles.row}>
                    {stepIds.map((stepId) => (
                        <label key={stepId} className={styles.lamp}>
                            <input
                                type="radio"
                                name="lamp"
                                id={"lamp" + "-" + stepId}
                                disabled
                                ref={(elm) => {
                                    if (!elm) return;
                                    lampsRef.current[stepId] = elm;
                                }}
                                className={styles.lamp__input}
                            />
                            <div className={styles.lamp__content} />
                        </label>
                    ))}
                </div>
                <div className={styles.cellList}>
                    {trackIds.map((trackId) => (
                        <div key={trackId} className={styles.row}>
                            {stepIds.map((stepId) => {
                                const id = trackId + "-" + stepId;
                                return (
                                    <label key={id} className={styles.cell}>
                                        <input
                                            id={id}
                                            type="checkbox"
                                            ref={(elm) => {
                                                if (!elm) return;
                                                if (
                                                    !stepsRef.current[trackId]
                                                ) {
                                                    stepsRef.current[trackId] =
                                                        [];
                                                }
                                                stepsRef.current[trackId][
                                                    stepId
                                                ] = elm;
                                            }}
                                            className={styles.cell__input}
                                        />
                                        <div className={styles.cell__content} />
                                    </label>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.controls}>
                <button onClick={handleStartClick} className={styles.button}>
                    {isPlaying ? " | | " : "▶"}
                </button>
                <label className={styles.fader}>
                    <span>BPM</span>
                    <input
                        type="range"
                        min={30}
                        max={300}
                        step={1}
                        onChange={handleBpmChange}
                        defaultValue={120}
                    />
                </label>
                <label className={styles.fader}>
                    <span>Volume</span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={handleVolumeChange}
                        defaultValue={1}
                    />
                </label>
            </div>
        </div>
    );
}
