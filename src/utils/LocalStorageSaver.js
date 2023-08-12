import data from '../data/words.json';

export function WriteLocalStorageData() {

    const words = data;

    words.forEach(function (word) {
        word.IsWordKnown = false;
    });

    if (!IsDataWritten()) {
        localStorage.setItem('words', JSON.stringify(words));
    }
}
export function SetLocalStorageData(item, index) {

    const retrievedData = JSON.parse(localStorage.getItem('words'));

    retrievedData.forEach((currElement, dataIndex) => {

        if (dataIndex === index) {
            retrievedData[dataIndex].english = item.english;

            retrievedData[dataIndex].transcription = item.transcription;

            retrievedData[dataIndex].russian = item.russian;

            console.log(`Сохранено: ${item.english} ${item.transcription} ${item.russian}`);
        }
    });
    localStorage.setItem('words', JSON.stringify(retrievedData));

}

export function SetWordKnowLocalStorageData(index, isWordKnown) {

    const retrievedData = JSON.parse(localStorage.getItem('words'));

    retrievedData.forEach((currElement, dataIndex) => {

        if (dataIndex === index) {
            retrievedData[dataIndex].IsWordKnown = isWordKnown;
        }
    });

    localStorage.setItem('words', JSON.stringify(retrievedData));
}

export function GetWordKnowCount() {

    const retrievedData = JSON.parse(localStorage.getItem('words'));

    let wordKnowCount = 0;

    retrievedData.forEach((currElement, dataIndex) => {

        if (retrievedData[dataIndex].IsWordKnown == true) {
            wordKnowCount++;
        }
    });

    return wordKnowCount;
}

export function IsWordKnow(word) {

    const retrievedData = JSON.parse(localStorage.getItem('words'));

    let result = false;

    retrievedData.forEach((currElement, dataIndex) => {

        if (retrievedData[dataIndex].english == word) {

            if (retrievedData[dataIndex].IsWordKnown == true) {
                result = true;
            }
        }
    });

    return result;
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