import { useState } from "react";

import "./Table.scss";

import {
    InsertLocalStorageData,
    RemoveLocalStorageData,
} from "../../utils/LocalStorageSaver.js";

function Table() {
    let data = JSON.parse(localStorage.getItem("words"));
    const [editIndex, setEditIndex] = useState(-1);
    const [editEnglish, setEnglish] = useState("");
    const [editTranscription, setTranscription] = useState("");
    const [editRussian, setRussian] = useState("");

    const onChangeHandler = (event, property) => {
        if (property === "english") {
            setEnglish(event.target.value);
        }

        if (property === "transcription") {
            setTranscription(event.target.value);
        }
        if (property === "russian") {
            setRussian(event.target.value);
        }
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
    };

    const handleSaveClick = (item, index) => {
        if (!editEnglish == "") {
            item.english = editEnglish;
        }

        if (!editTranscription == "") {
            item.transcription = editTranscription;
        }

        if (!editRussian == "") {
            item.russian = editRussian;
        }

        InsertLocalStorageData(item, index);

        setEnglish("");
        setTranscription("");
        setRussian("");

        setEditIndex(-1);
    };

    const handleCancelClick = () => {
        setEditIndex(-1);
        setEnglish("");
        setTranscription("");
        setRussian("");
    };

    const handleDeleteClick = (index) => {
        RemoveLocalStorageData(index);

        setEnglish("");
        setTranscription("");
        setRussian("");

        if (editIndex == "9999") {
            setEditIndex("999");
        } else {
            setEditIndex("9999");
        }
    };

    const renderCell = (item, index, property) => {
        data = JSON.parse(localStorage.getItem("words"));

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
            <table>
                <tr>
                    <th>Слово</th>
                    <th>Произношение</th>
                    <th>Перевод</th>
                    <th className="th__end">
                        {/* <button className="btn-add"></button> */}
                    </th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        {renderCell(item, index, "english")}
                        {renderCell(item, index, "transcription")}
                        {renderCell(item, index, "russian")}
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
}
export { Table };
