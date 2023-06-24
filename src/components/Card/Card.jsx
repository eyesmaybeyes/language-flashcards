import React from "react";
import { useState } from "react";

import "./Card.scss";

function Flashcard(props) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const { word, transcription, translation } = props;

    return (
        <div
            className="flashcard"
            style={{ transform: isFlipped ? "rotateX(180deg)" : "" }}
        >
            <div className="front" onClick={handleFlipCard}>
                <button className="btn-prev"></button>
                <h2>{word}Слово</h2>
                <p>{transcription}Транскрипция</p>
                <button className="btn-turn"></button>
                <button className="btn-next"></button>
            </div>
            <div className="back" onClick={handleFlipCard}>
                <h2>{translation}Перевод</h2>
                <button className="btn-turn"></button>
            </div>
        </div>
    );
}

export { Flashcard };
