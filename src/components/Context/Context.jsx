import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await axios.get(
                    'http://itgirlschool.justmakeit.ru/api/words'
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

    const addWord = (word) => {
        setWords([...words, word]);
    };

    const removeWord = (index) => {
        const updatedWords = [...words];
        updatedWords.splice(index, 1);
        setWords(updatedWords);
    };

    const updateWord = (index, updatedWord) => {
        const updatedWords = [...words];
        updatedWords[index] = updatedWord;
        setWords(updatedWords);
    };

    return (
        <AppContext.Provider
            value={{ words, loading, error, addWord, removeWord, updateWord }}
        >
            {children}
        </AppContext.Provider>
    );
};
