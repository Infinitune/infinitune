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

    // API CALL
    const handleGenerateClick = (e, index) => {
        e.preventDefault();
        const text = textareaRefs.current[index].value;
        console.log(index, text);

        // Define the request parameters
        const baseUrl = "https://2a83-68-7-31-205.ngrok-free.app/";
        const data = { text }; // Creates an object { text: "blah" } if textarea contains "blah"

        // Send the request
        /*fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Converts { text: "blah" } to '{"text":"blah"}'
        })
            .then((response) => response.json())
            .then((data) => {
                const fileId = data.fileId; // replace 'fileId' with the actual property name
                const soundUrl = `${baseUrl}sounds/${fileId}`;

                // Fetch the .wav file
                return fetch(soundUrl);
            })
            .then((response) => response.blob())
            .then((blob) => {
                // Create a Blob URL and log it
                const blobUrl = URL.createObjectURL(blob);
                console.log(blobUrl);

                // You can now use 'blobUrl' as the source for an HTML5 audio element,
                // or to create a download link for the .wav file.
            })
            .catch((error) => {
                console.error("Error:", error);
            }); */

        // Define the request parameters
        const fileId = "sine_20230716114832"; // replace with the actual fileId
        const soundUrl = `${baseUrl}sounds/${fileId}.wav`;

        // Fetch the .wav file
        fetch(soundUrl)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a Blob URL and log it
                const blobUrl = URL.createObjectURL(blob);
                console.log(blobUrl);

                // You can now use 'blobUrl' as the source for an HTML5 audio element,
                // or to create a download link for the .wav file.
            })
            .catch((error) => {
                console.error("Error:", error);
            });
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
                            className="sampleName"
                            key={index}
                            style={{
                                border: "none",
                                borderRadius: 7,
                                boxShadow:
                                    "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                                backdropFilter: "blur(6px)",
                                borderRadius: 5,
                                border: "1px solid rgba(255, 255, 255, 0.18)",
                                height: "40px !important",
                                marginBottom: "2px",
                                minWidth: "80px",

                                fontWeight: " bold",
                                cursor: "pointer",
                                color: "white",
                                backgroundColor: "rgba(51, 204, 255, 0.5)",
                                width: "80px",
                                lineHeight: "2",
                                borderRadius: "4px",
                                transition: "background-color 0.3s",
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
                                    backgroundColor: "#33ff66",
                                    textTransform: "uppercase",
                                    fontWeight: "700",
                                    border: "none",
                                    textDecoration: "none",

                                    color: "black",
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
                    <span style={{ fontWeight: "bold", color: "white" }}>
                        BPM
                    </span>
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
                    <span style={{ fontWeight: "bold", color: "white" }}>
                        Volume
                    </span>
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
