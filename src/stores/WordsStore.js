import React, { createContext, useEffect } from 'react';
import { useLocalObservable, useObserver } from 'mobx-react-lite';
import { autorun } from 'mobx';
import axios from 'axios';

import ErrorComponent from '../components/Error/Error.jsx';
import Loading from '../components/Loading/Loading.jsx';

export const AppContext = createContext();

const AppStore = () => {
    const store = useLocalObservable(() => ({
        words: [],
        loading: true,
        error: null,
        setWords: (newWords) => {
            store.words = newWords;
        },
        setLoading: (isLoading) => {
            store.loading = isLoading;
        },
        setError: (error) => {
            store.error = error;
        },

        addWord: async (word) => {
            try {
                const response = await axios.post('/api/words/add', word);
                const newlyAddedWord = { ...response.data, know: false };
                store.setWords([...store.words, newlyAddedWord]);
            } catch (error) {
                store.setError(error);
            }
        },
        removeWord: async (index) => {
            try {
                const wordToDelete = store.words[index];
                await axios.post(
                    `http://itgirlschool.justmakeit.ru/api/words/${wordToDelete.id}/delete`
                );
                const updatedWords = store.words.filter((_, idx) => idx !== index);
                store.setWords(updatedWords);
            } catch (error) {
                store.setError(error);
            }
        },
        updateWord: async (index, updatedWord) => {
            try {
                const wordToUpdate = store.words[index];
                await axios.post(
                    `http://itgirlschool.justmakeit.ru/api/words/${wordToUpdate.id}/update`,
                    updatedWord
                );
                const updatedWords = store.words.map((word, idx) =>
                    idx === index ? { ...updatedWord, id: wordToUpdate.id } : word
                );
                store.setWords(updatedWords);
            } catch (error) {
                store.setError(error);
            }
        },
    }));

    const SetupDataReaction = () => {
        useEffect(() => {
            const fetchWords = async () => {
                try {
                    const response = await axios.get(
                        'http://itgirlschool.justmakeit.ru/api/words'
                    );
                    store.setWords(response.data);
                    store.setLoading(false);
                } catch (error) {
                    store.setError(error);
                    store.setLoading(false);
                }
            };

            fetchWords();
            autorun(() => store.words);
        }, []);
    };

    SetupDataReaction();
    return store;
};

export const AppProvider = (props) => {
    const store = AppStore();

    return (
        <AppContext.Provider value={store}>
            {useObserver(() => {
                if (store.loading) {
                    return (
                        <Loading />
                    );
                }

                if (store.error) {
                    return (
                        <ErrorComponent message={store.error.message} />
                    );
                }

                return props.children;
            })}
        </AppContext.Provider>
    );
};

export default AppContext;
