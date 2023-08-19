import { useState, useContext } from "react";

import "./Table.scss";
import Swal from "sweetalert2";

// import {
//     SetLocalStorageData,
//     RemoveLocalStorageData,
//     AddFirstLocalStorageData,
// } from "../../utils/LocalStorageSaver.js";

import { AppContext } from "../Context/Context.jsx";

const isValueClicked = true;
const isValueNotClicked = false;

function Table(props) {
    const { words, loading, error, addWord, removeWord, updateWord } =
        useContext(AppContext);
    // if (words) {
    //     words.map((item, index) => {
    //         console.log(item.english);
    //     });
    // }
    // let data = JSON.parse(localStorage.getItem("words"));
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
    const RefreshCard = () => {
        props.RefreshCard();
    };
    const handleEditClick = (index) => {
        setEditIndex(index);
    };

    const handleSaveClick = (item, index) => {
        const inputEnglish = document.querySelector(".english");
        const inputTranscription = document.querySelector(".transcription");
        const inputRussian = document.querySelector(".russian");

        const inputEnglishValue = inputEnglish.value.trim();
        const inputTranscriptionValue = inputTranscription.value.trim();
        const inputRussianValue = inputRussian.value.trim();

        const inputs = [
            { element: inputEnglish, value: inputEnglishValue },
            { element: inputTranscription, value: inputTranscriptionValue },
            { element: inputRussian, value: inputRussianValue },
        ];

        let hasEmptyFields = false;
        inputs.forEach((input) => {
            if (input.value === "") {
                input.element.style.border = "2px solid red";
                hasEmptyFields = true;
            }
        });

        if (hasEmptyFields) {
            Swal.fire("Пожалуйста, заполните все поля");
            return;
        }

        const updatedItem = {
            ...item,
            english: editEnglish || inputEnglishValue,
            transcription: editTranscription || inputTranscriptionValue,
            russian: editRussian || inputRussianValue,
        };

        // SetLocalStorageData(item, index);
        updateWord(index, updatedItem);
        setEnglish("");
        setTranscription("");
        setRussian("");

        setEditIndex(-1);

        RefreshCard();
    };
    const removeInputBorder = (e) => {
        e.target.style.border = "2px solid var(--header-link)";
    };
    const handleKeyDown = (e, item, index) => {
        if (e.key === "Enter") {
            handleSaveClick(item, index);
        }
    };

    const handleCancelClick = () => {
        setEditIndex(-1);
        setEnglish("");
        setTranscription("");
        setRussian("");
    };

    const handleDeleteClick = (index) => {
        // RemoveLocalStorageData(index);
        removeWord(index);
        setEnglish("");
        setTranscription("");
        setRussian("");

        RefreshTable();

        RefreshCard();
    };
    const setInputBorder = (input, color) => {
        input.style.border = `2px solid ${color}`;
    };
    const handleAddClick = () => {
        setEditIndex(-1);

        const table = document.getElementById("word-table");
        const newRow = document.createElement("tr");

        newRow.innerHTML = `<td><input type="text" class="english" value=""></td>
            <td><input type="text" class="transcription" value=""></td>
            <td><input type="text" class="russian" value=""></td>
            <td><div class="tr-buttons"><button class="btn-save"></button>
            <button class="btn-cancel"></button></div></td>`;

        const btnSave = newRow.getElementsByClassName("btn-save")[0];

        const btnCancel = newRow.getElementsByClassName("btn-cancel")[0];

        btnSave.addEventListener("click", function () {
            const inputs = [
                {
                    name: "english",
                    node: newRow.getElementsByClassName("english")[0],
                },
                {
                    name: "transcription",
                    node: newRow.getElementsByClassName("transcription")[0],
                },
                {
                    name: "russian",
                    node: newRow.getElementsByClassName("russian")[0],
                },
            ];

            let hasEmptyFields = false;
            inputs.forEach((input) => {
                input.value = input.node.value.trim();

                if (input.value === "") {
                    input.node.style.border = "2px solid red";
                    hasEmptyFields = true;
                }
            });

            inputs.forEach((input) => {
                input.node.addEventListener("input", () => {
                    if (input.node.value.trim() !== "") {
                        setInputBorder(input.node, "var(--header-link)");
                    }
                });
            });

            if (hasEmptyFields) {
                Swal.fire("Пожалуйста, заполните все поля");
                return;
            }

            // AddFirstLocalStorageData(
            //     inputs[0].value,
            //     inputs[1].value,
            //     inputs[2].value
            // );

            addWord({
                english: inputs[0].value,
                transcription: inputs[1].value,
                russian: inputs[2].value,
            });

            newRow.remove();

            RefreshTable();

            RefreshCard();
        });

        btnCancel.addEventListener("click", function () {
            newRow.remove();
        });

        table.insertBefore(newRow, table.children[1]);
    };

    const renderCell = (item, index, property) => {
        // data = JSON.parse(localStorage.getItem("words"));

        if (index === editIndex) {
            return (
                <td>
                    <input
                        type="text"
                        defaultValue={item[property]}
                        className={property}
                        onChange={(event) => onChangeHandler(event, property)}
                        onKeyDown={(e) => handleKeyDown(e, item, index)}
                        onFocus={removeInputBorder}
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
                    <th>Word</th>
                    <th>Transcription</th>
                    <th>Translate</th>
                    <th className="th__end">
                        <button
                            className="btn-add"
                            onClick={() => handleAddClick()}
                        ></button>
                    </th>
                </tr>
                {words.map((item, index) => (
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

    function RefreshTable() {
        if (editIndex == isValueClicked) {
            setEditIndex(isValueNotClicked);
        } else {
            setEditIndex(isValueClicked);
        }
    }
}
export { Table };
