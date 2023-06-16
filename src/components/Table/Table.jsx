import { useState } from "react";
import data from "../../words.json";

import "./Table.scss";

function Table() {
    const [editIndexes, setEditIndexes] = useState([]);

    const handleEditClick = (index) => {
        setEditIndexes([...editIndexes, index]);
    };

    const handleSaveClick = (index) => {
        const newEditIndexes = [...editIndexes];
        const editIndex = newEditIndexes.indexOf(index);

        if (editIndex !== -1) {
            newEditIndexes.splice(editIndex, 1);
            setEditIndexes(newEditIndexes);
        }
    };

    const handleCancelClick = (index) => {
        const newEditIndexes = [...editIndexes];
        const editIndex = newEditIndexes.indexOf(index);

        if (editIndex !== -1) {
            newEditIndexes.splice(editIndex, 1);
            setEditIndexes(newEditIndexes);
        }
    };

    const isEditing = (index) => {
        return editIndexes.includes(index);
    };

    const renderCell = (item, index, property) => {
        if (isEditing(index)) {
            return (
                <td>
                    <input type="text" defaultValue={item[property]} />
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
                    <th></th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        {renderCell(item, index, "english")}
                        {renderCell(item, index, "transcription")}
                        {renderCell(item, index, "russian")}
                        <td>
                            <div className="tr-buttons">
                                {isEditing(index) ? (
                                    <>
                                        <button
                                            className="btn-save"
                                            onClick={handleSaveClick}
                                        ></button>
                                        <button
                                            className="btn-cancel"
                                            onClick={handleCancelClick}
                                        ></button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn-save"
                                            onClick={() =>
                                                handleSaveClick(index)
                                            }
                                        ></button>
                                        <button
                                            className="btn-edit"
                                            onClick={() =>
                                                handleEditClick(index)
                                            }
                                        ></button>
                                    </>
                                )}
                                <button className="btn-delete"></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
export { Table };
