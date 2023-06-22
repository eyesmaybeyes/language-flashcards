import React from "react";

import "./Card.scss";

class Flashcard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
        };
    }

    handleFlipCard = () => {
        this.setState((prevState) => ({
            isFlipped: !prevState.isFlipped,
        }));
    };

    render() {
        const { word, transcription, translation } = this.props;
        const { isFlipped } = this.state;

        return (
            <div
                className="flashcard"
                onClick={this.handleFlipCard}
                style={{ transform: isFlipped ? "rotateX(180deg)" : "" }}
            >
                <div className="front">
                    <h2>{word}Слово</h2>
                    <p>{transcription}Транскрипция</p>
                    <button className="btn-turn"></button>
                </div>
                <div className="back">
                    <h2>{translation}Перевод</h2>
                    <button className="btn-turn"></button>
                </div>
            </div>
        );
    }
}

export { Flashcard };
