import data from '../data/words.json';

export function WriteLocalStorageData() {
    if (!IsDataWritten()) {
        localStorage.setItem('words', JSON.stringify(data));
    }
}
export function InsertLocalStorageData(item, index) {

    const retrievedData = JSON.parse(localStorage.getItem('words'));


    retrievedData.forEach((currElement, dataIndex) => {

        if (dataIndex === index) {
            retrievedData[dataIndex].english = item.english;

            retrievedData[dataIndex].transcription = item.transcription;

            retrievedData[dataIndex].russian = item.russian;
        }
    });

    localStorage.setItem('words', JSON.stringify(retrievedData));

}
export function AddFirstLocalStorageData(english, transcription, russian) {

    const retrievedData = JSON.parse(localStorage.getItem('words'));

    const word = {
        english: `${english}`,
        russian: `${russian}`,
        // tags: "New word",
        transcription: `${transcription}`
    };

    retrievedData.unshift(word);

    localStorage.setItem('words', JSON.stringify(retrievedData));
}

export function RemoveLocalStorageData(index) {

    const retrievedData = JSON.parse(localStorage.getItem('words'));

    retrievedData.forEach((currElement, dataIndex) => {

        if (dataIndex === index) {
            retrievedData.splice(dataIndex, 1);
        }
    });

    localStorage.setItem('words', JSON.stringify(retrievedData));
}

function IsDataWritten() {

    const retrievedData = JSON.parse(localStorage.getItem('words'));

    if (retrievedData === null) {
        return false;
    }

    return true;
}