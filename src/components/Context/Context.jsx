import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await axios.get(
                    "http://itgirlschool.justmakeit.ru/api/words"
                );
                setWords(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchWords();
    }, []);

    const addWord = async (word) => {
        try {
            const response = await axios.post(
                'http://itgirlschool.justmakeit.ru/api/words/add',
                { word }
            );
            setWords([...words, response.data]);
        } catch (error) {
            setError(error);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const removeWord = async (index) => {
        try {
            const wordToDelete = words[index];
            await axios.post(
                `http://itgirlschool.justmakeit.ru/api/words/${wordToDelete.id}/delete`
            );
            const updatedWords = [...words];
            updatedWords.splice(index, 1);
            setWords(updatedWords);
        } catch (error) {
            setError(error);
        }
    };

    const updateWord = async (index, updatedWord) => {
        try {
            const wordToUpdate = words[index];
            await axios.post(
                `http://itgirlschool.justmakeit.ru/api/words/${wordToUpdate.id}/update`,
                { updatedWord }
            );
            const updatedWords = [...words];
            updatedWords[index] = updatedWord;
            setWords(updatedWords);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <AppContext.Provider
            value={{ words, loading, error, addWord, removeWord, updateWord }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
