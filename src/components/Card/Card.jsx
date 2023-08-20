import React from "react";
import "./Card.scss";
import { useEffect, useState, useRef, useContext } from "react";

import { AppContext } from "../Context/Context.jsx";
import {
    SetWordKnowLocalStorageData,
    IsWordKnow,
} from "../../utils/LocalStorageSaver.js";

function Flashcard(props) {
    const [key, setKey] = useState(Date.now());
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };

    // const {
    //     word,
    //     transcription,
    //     translation,
    //     isCardRefresh,
    //     elementIndex,
    //     dataLength,
    //     onKnowClick,
    // } = props;
    const appContext = useContext(AppContext);
    const words = appContext.words;

    const { isCardRefresh, onKnowClick, elementIndex } = props;

    const word = words[elementIndex]?.english;
    const transcription = words[elementIndex]?.transcription;
    const translation = words[elementIndex]?.russian;
    const dataLength = words.length;
    const [knowClicked, setKnowClicked] = useState(false);

    const knowRef = useRef();

    const handleKnow = (e) => {
        e.stopPropagation();

        SetWordKnowLocalStorageData(elementIndex, true);
        knowRef.current.classList.add("button-clicked");

        onKnowClick();

        setKnowClicked(!knowClicked);
        knowRef.current.blur();
    };

    const handleNotKnow = (e) => {
        e.stopPropagation();

        SetWordKnowLocalStorageData(elementIndex, false);
        knowRef.current.classList.remove("button-clicked");

        onKnowClick();

        setKnowClicked(!knowClicked);
    };

    useEffect(() => {
        setKnowClicked(false);
    }, [word]);

    useEffect(() => {
        if (IsWordKnow(word)) {
            knowRef.current.classList.add("button-clicked");
        } else {
            knowRef.current.classList.remove("button-clicked");
        }
        if (!knowRef.current.classList.contains("button-clicked")) {
            knowRef.current.focus();
        }
    }, [word]);

    const handlePrev = (e) => {
        e.stopPropagation();
        props.ChangeCardPrev();
    };

    const handleNext = (e) => {
        e.stopPropagation();
        props.ChangeCardNext();
    };

    return (
        <>
            <div
                key={key}
                className="flashcard"
                style={{ transform: isFlipped ? "rotateX(180deg)" : "" }}
            >
                <div
                    key={isCardRefresh}
                    className="front"
                    onClick={handleFlipCard}
                >
                    <div className="flashcard__counter">
                        {elementIndex + 1}/{dataLength}
                    </div>
                    <button className="btn-prev" onClick={handlePrev}></button>
                    <h2 className="btn-english">{word}</h2>
                    <p className="btn-transcription">{transcription}</p>
                    <button className="btn-turn"></button>
                    <button className="btn-next" onClick={handleNext}></button>
                </div>
                <div className="back" onClick={handleFlipCard}>
                    <div className="flashcard__counter">
                        {elementIndex + 1}/{dataLength}
                    </div>
                    <h2 className="btn-russian">{translation}</h2>
                    <button className="btn-turn"></button>
                </div>
            </div>
            <div className="flashcard__buttons">
                <button ref={knowRef} className="btn-know" onClick={handleKnow}>
                    Знаю
                </button>
                <button
                    className="btn-notknow"
                    type="button"
                    onClick={handleNotKnow}
                >
                    Не знаю
                </button>
            </div>
        </>
    );
}

export { Flashcard };
