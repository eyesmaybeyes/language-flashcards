import './App.scss';
import './components/Header/Header.scss';
import './components/Footer/Footer.scss';
import './components/NotFoundPage/NotFoundPage.scss';

import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { WriteLocalStorageData } from './utils/LocalStorageSaver.js';
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { Table } from './components/Table/Table.jsx';
import { Flashcard } from './components/Card/Card.jsx';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage.jsx';

let retrievedData = JSON.parse(localStorage.getItem('words'));

let currentElementIndex = 0;

function App() {

    WriteLocalStorageData();

    retrievedData = JSON.parse(localStorage.getItem('words'));

    let selectedWordTemp = '';
    let selectedTranscriptionTemp = '';
    let selectedTranslationTemp = '';
    let selectedCurrentElementIndexTemp = '';
    let selectedDataLengthTemp = '';

    if (retrievedData.length == 0) {

        selectedWordTemp = 'Not defined';
        selectedTranscriptionTemp = 'Not defined';
        selectedTranslationTemp = 'Not defined';

    } else {
        selectedWordTemp = retrievedData[currentElementIndex].english;
        selectedTranscriptionTemp = retrievedData[currentElementIndex].transcription;
        selectedTranslationTemp = retrievedData[currentElementIndex].russian;
        selectedCurrentElementIndexTemp = currentElementIndex;
        selectedDataLengthTemp = retrievedData.length;

    }
    const [selectedWord, setSelectedWord] = useState(selectedWordTemp);
    const [selectedTranscription, setSelectedTranscription] = useState(selectedTranscriptionTemp);
    const [selectedTranslation, setSelectedTranslation] = useState(selectedTranslationTemp);
    const [selectedCurrentElementIndex, setSelectedCurrentElementIndex] = useState(selectedCurrentElementIndexTemp);
    const [selectedDataLength, setSelectedDataLength] = useState(selectedDataLengthTemp);
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
        setSelectedCurrentElementIndex(currentElementIndex);
        setSelectedDataLength(retrievedData.length);

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
        setSelectedCurrentElementIndex(currentElementIndex);
        setSelectedDataLength(retrievedData.length);
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
            setSelectedCurrentElementIndex(currentElementIndex);
            setSelectedDataLength(retrievedData.length);
            return;
        }
    };

    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/language-flashcards" element={
                    <>
                        <Header />
                        <div className="container">
                            <Table RefreshCard={RefreshCard} />
                        </div>
                        <Footer />
                    </>
                } />
                <Route path="/language-flashcards/game" element={
                    <>
                        <Header />
                        <div className="container">
                            <Flashcard ChangeCardNext={ChangeCardNext}
                                ChangeCardPrev={ChangeCardPrev}
                                word={selectedWord}
                                transcription={selectedTranscription}
                                translation={selectedTranslation}
                                isCardRefresh={isCardRefresh}
                                elementIndex={selectedCurrentElementIndex}
                                dataLength={selectedDataLength}
                            />
                        </div>
                        <Footer />
                    </>
                } />
            </Routes>
        </div>
    );
}

export default App;

