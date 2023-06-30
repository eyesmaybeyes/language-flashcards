import { useState } from 'react';

import './Table.scss';

import {
    InsertLocalStorageData,
    RemoveLocalStorageData,
    AddFirstLocalStorageData,
} from '../../utils/LocalStorageSaver.js';

const isValueClicked = true;
const isValueNotClicked = false;

function Table(props) {
    let data = JSON.parse(localStorage.getItem('words'));
    const [editIndex, setEditIndex] = useState(-1);
    const [editEnglish, setEnglish] = useState('');
    const [editTranscription, setTranscription] = useState('');
    const [editRussian, setRussian] = useState('');

    const onChangeHandler = (event, property) => {
        if (property === 'english') {
            setEnglish(event.target.value);
        }

        if (property === 'transcription') {
            setTranscription(event.target.value);
        }
        if (property === 'russian') {
            setRussian(event.target.value);
        }
    };
    const RefreshCard = () => {
        props.RefreshCard();
    };
    const handleEditClick = (index) => {
        setEditIndex(index);
    };

    const handleSaveClick = (item, index) => {
        if (!editEnglish == '') {
            item.english = editEnglish;
        }

        if (!editTranscription == '') {
            item.transcription = editTranscription;
        }

        if (!editRussian == '') {
            item.russian = editRussian;
        }

        InsertLocalStorageData(item, index);

        setEnglish('');
        setTranscription('');
        setRussian('');

        setEditIndex(-1);

        RefreshCard();
    };

    const handleCancelClick = () => {
        setEditIndex(-1);
        setEnglish('');
        setTranscription('');
        setRussian('');
    };

    const handleDeleteClick = (index) => {
        RemoveLocalStorageData(index);

        setEnglish('');
        setTranscription('');
        setRussian('');

        RefreshTable();

        RefreshCard();
    };
    const handleAddClick = () => {
        const table = document.getElementById('word-table');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `<td><input type="text" class="english" value=""></td>
            <td><input type="text" class="transcription" value=""></td>
            <td><input type="text" class="russian" value=""></td>
            <td><div class="tr-buttons"><button class="btn-save"></button>
            <button class="btn-cancel"></button></div></td>`;

        const btnSave = newRow.getElementsByClassName('btn-save')[0];

        const btnCancel = newRow.getElementsByClassName('btn-cancel')[0];

        btnSave.addEventListener('click', function () {
            const english = newRow.getElementsByClassName('english')[0].value;
            const transcription =
                newRow.getElementsByClassName('transcription')[0].value;
            const russian = newRow.getElementsByClassName('russian')[0].value;

            AddFirstLocalStorageData(english, transcription, russian);

            newRow.remove();

            RefreshTable();

            RefreshCard();
        });

        btnCancel.addEventListener('click', function () {
            newRow.remove();
        });

        table.insertBefore(newRow, table.children[1]);
    };

    const renderCell = (item, index, property) => {
        data = JSON.parse(localStorage.getItem('words'));

        if (index === editIndex) {
            return (
                <td>
                    <input
                        type="text"
                        defaultValue={item[property]}
                        onChange={(event) => onChangeHandler(event, property)}
                    />
                </td>
            );
        } else {
            return <td>{item[property]}</td>;
        }
    };
    return (
        <div className="table-wrapper">
            <table id="word-table">
                <tr>
                    <th>Слово</th>
                    <th>Произношение</th>
                    <th>Перевод</th>
                    <th className="th__end">
                        <button
                            className="btn-add"
                            onClick={() => handleAddClick()}
                        ></button>
                    </th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        {renderCell(item, index, 'english')}
                        {renderCell(item, index, 'transcription')}
                        {renderCell(item, index, 'russian')}
                        <td>
                            <div className="tr-buttons">
                                {index === editIndex ? (
                                    <>
                                        <button
                                            className="btn-save"
                                            onClick={() =>
                                                handleSaveClick(item, index)
                                            }
                                        ></button>
                                        <button
                                            className="btn-cancel"
                                            onClick={handleCancelClick}
                                        ></button>
                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                handleDeleteClick(index)
                                            }
                                        ></button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn-save"></button>
                                        <button
                                            className="btn-edit"
                                            onClick={() =>
                                                handleEditClick(index)
                                            }
                                        ></button>
                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                handleDeleteClick(index)
                                            }
                                        ></button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );

    function RefreshTable() {
        if (editIndex == isValueClicked) {
            setEditIndex(isValueNotClicked);
        } else {
            setEditIndex(isValueClicked);
        }
    }
}
export { Table };
