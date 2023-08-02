import React from 'react';
import './Card.scss';
import { useEffect, useState } from 'react';

import { SetWordKnowLocalStorageData } from '../../utils/LocalStorageSaver.js';

function Flashcard(props) {
    const [key, setKey] = useState(Date.now());
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const {
        word,
        transcription,
        translation,
        isCardRefresh,
        elementIndex,
        dataLength,
        onKnowClick,
    } = props;

    const [knowClicked, setKnowClicked] = useState(false);
    const handleKnow = (e) => {
        e.stopPropagation();

        SetWordKnowLocalStorageData(elementIndex, true);

        onKnowClick();

        setKnowClicked(!knowClicked);
    };
    const handleNotKnow = (e) => {
        e.stopPropagation();

        SetWordKnowLocalStorageData(elementIndex, false);

        onKnowClick();

        setKnowClicked(!knowClicked);
    };
    useEffect(() => {
        setKnowClicked(false);
    }, [word]);

    useEffect(
        () => {
            setKey(Date.now());
        },
        [word],
        [elementIndex]
    );

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
                style={{ transform: isFlipped ? 'rotateX(180deg)' : '' }}
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
                <button
                    className="btn-know"
                    // className={`btn-know ${
                    //     knowClicked ? "button-clicked" : ""
                    // }`}
                    onClick={handleKnow}
                >
                    Знаю
                </button>
                <button
                    className="btn-notknow"
                    type="button"
                    // disabled={!knowClicked}
                    onClick={handleNotKnow}
                >
                    Не знаю
                </button>
            </div>
        </>
    );
}

export { Flashcard };
