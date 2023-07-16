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
    const handleSampleClick = (e) => {};
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
                            id={`clickable${sample.name}`}
                            // onClick={handleSampleClick()}
                            key={index}
                        >
                            {sample.name}
                        </button>
                        <Tooltip
                            anchorSelect={`#clickable${sample.name}`}
                            clickable
                        >
                            <textarea name="a" cols="20" rows="1"></textarea>
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
                    {isPlaying ? "Pause" : "Play"}
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
