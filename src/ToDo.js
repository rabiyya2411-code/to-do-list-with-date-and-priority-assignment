import React from 'react';
import "./ToDoForm.css";

const ToDo = ({ todo, handleToggle, editTask }) => {
    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id, e.target.value)
    }
    const handleEditClick = (e) => {
        editTask(e.target.id);
    }
    return (
        <div className="row">
            <div className="col-sm-9">
                <div id={todo.id} key={todo.id + todo.task} name="todo" value={todo.id} onClick={handleClick} 
                className={todo.complete ? "todo strike" : "todo"}>
                    <strong>{todo.task}</strong> <br></br> 
                    <i>Due on: </i>{todo.dueDate ? todo.dueDate : "-"} <br></br> 
                    <i>Priority: </i>{todo.priority ? todo.priority : "Medium"}
                </div>
            </div>

            <div className="col-sm-3">
                <button id={todo.id}  key={todo.id + todo.task} onClick={handleEditClick}>Edit</button>
            </div>
        </div>

    );
};

export default ToDo;