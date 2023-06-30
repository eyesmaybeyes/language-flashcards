import './App.scss';
import './components/Header/Header.scss';
import './components/Footer/Footer.scss';
import { useState } from 'react';

import { WriteLocalStorageData } from './utils/LocalStorageSaver.js';
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { Table } from './components/Table/Table.jsx';
import { Flashcard } from './components/Card/Card.jsx';


let retrievedData = JSON.parse(localStorage.getItem('words'));

let currentElementIndex = 0;

function App() {

    WriteLocalStorageData();

    retrievedData = JSON.parse(localStorage.getItem('words'));

    let selectedWordTemp = '';
    let selectedTranscriptionTemp = '';
    let selectedTranslationTemp = '';

    if (retrievedData.length == 0) {

        selectedWordTemp = 'Not defined';
        selectedTranscriptionTemp = 'Not defined';
        selectedTranslationTemp = 'Not defined';
    } else {
        selectedWordTemp = retrievedData[currentElementIndex].english;
        selectedTranscriptionTemp = retrievedData[currentElementIndex].transcription;
        selectedTranslationTemp = retrievedData[currentElementIndex].russian;

    }
    const [selectedWord, setSelectedWord] = useState(selectedWordTemp);
    const [selectedTranscription, setSelectedTranscription] = useState(selectedTranscriptionTemp);
    const [selectedTranslation, setSelectedTranslation] = useState(selectedTranslationTemp);
    const [isCardRefresh, setCardRefresh] = useState(false);

    const ChangeCardPrev = () => {

        // retrievedData = JSON.parse(localStorage.getItem('words'));

        if (currentElementIndex > 0) {
            currentElementIndex--;
        }
        else {

            return;
        }
        setSelectedWord(retrievedData[currentElementIndex].english);
        setSelectedTranscription(retrievedData[currentElementIndex].transcription);
        setSelectedTranslation(retrievedData[currentElementIndex].russian);

    };
    const ChangeCardNext = () => {

        // retrievedData = JSON.parse(localStorage.getItem('words'));

        if (currentElementIndex + 1 < retrievedData.length) {
            currentElementIndex++;
        }
        else {

            return;
        }

        setSelectedWord(retrievedData[currentElementIndex].english);
        setSelectedTranscription(retrievedData[currentElementIndex].transcription);
        setSelectedTranslation(retrievedData[currentElementIndex].russian);
    };


    const RefreshCard = () => {
        retrievedData = JSON.parse(localStorage.getItem('words'));

        setCardRefresh(!isCardRefresh);

        currentElementIndex = 0;

        if (retrievedData.length == 0) {
            window.location.reload();
        } else {

            setSelectedWord(retrievedData[currentElementIndex].english);
            setSelectedTranscription(retrievedData[currentElementIndex].transcription);
            setSelectedTranslation(retrievedData[currentElementIndex].russian);
            return;
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="container">
                <Flashcard ChangeCardNext={ChangeCardNext}
                    ChangeCardPrev={ChangeCardPrev}
                    word={selectedWord}
                    transcription={selectedTranscription}
                    translation={selectedTranslation}
                    isCardRefresh={isCardRefresh}
                />
                <Table RefreshCard={RefreshCard} />
            </div>
            <Footer />
        </div>
    );

}

export default App;

