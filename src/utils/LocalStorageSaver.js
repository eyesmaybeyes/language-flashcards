import axios from 'axios';

export async function WriteLocalStorageData() {

    try {
        const response = await axios.get('http://itgirlschool.justmakeit.ru/api/words');
        const words = response.data;

        words.forEach(function (word) {
            word.IsWordKnown = false;
        });

        if (!IsDataWritten()) {
            localStorage.setItem('words', JSON.stringify(words));
        }
    } catch (error) {
        console.error(error);
    }
}
export async function SetLocalStorageData(item, index) {
    try {
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
    } catch (error) {
        console.error(error);
    }
}

export async function SetWordKnowLocalStorageData(index, isWordKnown) {
    try {
        const retrievedData = JSON.parse(localStorage.getItem('words'));

        retrievedData.forEach((currElement, dataIndex) => {
            if (dataIndex === index) {
                retrievedData[dataIndex].IsWordKnown = isWordKnown;
            }
        });

        localStorage.setItem('words', JSON.stringify(retrievedData));
    } catch (error) {
        console.error(error);
    }
}
export function GetWordKnowCount() {
    try {
        const retrievedData = JSON.parse(localStorage.getItem('words'));

        let wordKnowCount = 0;

        retrievedData.forEach((currElement, dataIndex) => {
            if (retrievedData[dataIndex].IsWordKnown == true) {
                wordKnowCount++;
            }
        });

        return wordKnowCount;
    } catch (error) {
        console.error(error);
    }
}
export function IsWordKnow(word) {
    try {
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
    } catch (error) {
        console.error(error);
    }
}

export async function AddFirstLocalStorageData(english, transcription, russian) {
    try {
        const retrievedData = JSON.parse(localStorage.getItem('words'));

        const word = {
            english: `${english}`,
            russian: `${russian}`,
            // tags: "New word",
            transcription: `${transcription}`
        };

        retrievedData.unshift(word);

        localStorage.setItem('words', JSON.stringify(retrievedData));
    } catch (error) {
        console.error(error);
    }
}
export async function RemoveLocalStorageData(index) {
    try {
        const retrievedData = JSON.parse(localStorage.getItem('words'));

        retrievedData.forEach((currElement, dataIndex) => {
            if (dataIndex === index) {
                retrievedData.splice(dataIndex, 1);
            }
        });

        localStorage.setItem('words', JSON.stringify(retrievedData));
    } catch (error) {
        console.error(error);
    }
}
function IsDataWritten() {
    try {
        const retrievedData = JSON.parse(localStorage.getItem('words'));

        if (retrievedData === null) {
            return false;
        }

        return true;
    }
    catch (error) {
        console.error(error);
    }
}