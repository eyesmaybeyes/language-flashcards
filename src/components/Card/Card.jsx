import React from 'react';
import './Card.scss';
import { useEffect, useState } from 'react';

function Flashcard(props) {
    const [key, setKey] = useState(Date.now());
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };
    // const { word, transcription, translation } = props;
    const word = props.word;

    const transcription = props.transcription;

    const translation = props.translation;

    const isCardRefresh = props.isCardRefresh;
    useEffect(() => {
        setKey(Date.now());
    }, [word]);

    const handlePrev = (e) => {
        e.stopPropagation();
        ChangeCardPrev();
    };

    const handleNext = (e) => {
        e.stopPropagation();
        ChangeCardNext();
    };

    const ChangeCardNext = () => {
        props.ChangeCardNext();
    };
    const ChangeCardPrev = () => {
        props.ChangeCardPrev();
    };

    return (
        <div
            key={key}
            className="flashcard"
            style={{ transform: isFlipped ? 'rotateX(180deg)' : '' }}
        >
            <div key={isCardRefresh} className="front" onClick={handleFlipCard}>
                <button className="btn-prev" onClick={handlePrev}></button>
                <h2 className="btn-english">{word}</h2>
                <p className="btn-transcription">{transcription}</p>
                <button className="btn-turn"></button>
                <button className="btn-next" onClick={handleNext}></button>
            </div>
            <div className="back" onClick={handleFlipCard}>
                <h2 className="btn-russian">{translation}</h2>
                <button className="btn-turn"></button>
            </div>
        </div>
    );
}

export { Flashcard };
