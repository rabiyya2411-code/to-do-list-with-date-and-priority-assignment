import React from 'react';
import ToDo from './ToDo';
import "./ToDoForm.css";

const ToDoList = ({toDoList, handleToggle, handleFilter, editTask}) => {
    return (
        <div>
            {toDoList.map(todo => {
                return (
                    <ul className="theList">
                    <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter} editTask={editTask}/>
                    </ul>
                )
            })}
            <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
        </div>
    );
};

export default ToDoList;