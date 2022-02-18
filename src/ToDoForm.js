import * as React from 'react';
import "./ToDoForm.css";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import moment from 'moment-timezone';

const ToDoForm = ({ saveTask, presentId, setpresentId, userInput, userDate,
    userPriority, setUserInput, setUserDate, setUserPriority }) => {
    const handleInputChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleDateChange = (newValue) => {
        setUserDate(newValue)
    }
    // const handleDateChange = (e) => {
    //     setUserDate(e.target.value)
    // }

    const handlePriorityChange = (e) => {
        setUserPriority(e.target.value)

    }
    const handleIdChange = (e) => {
        setpresentId(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formatedDate = (moment(userDate).format("YYYY-MM-DD"));
        saveTask(userInput, formatedDate, userPriority, presentId);
        setUserInput("");
        setpresentId(-1);
    }

    return (
        <div className="todoform">
            <form onSubmit={handleSubmit}>
                <input value={presentId} type="hidden" onChange={handleIdChange} />
                <input value={userInput} type="text" onChange={handleInputChange} placeholder="Enter task..." />
                <br></br>
                <br></br>
            {/* <input value={userDate} type="date" onChange={handleDateChange} /> */}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack>
                        <center>
                            <DesktopDatePicker
                           
                                label="Date Picker"
                                inputFormat="yyyy-MM-dd"
                                value={userDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField
                                    type="datetime-local"
                                    sx={{ width: 260}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...params} />}
                            />
                        </center>
                    </Stack>
                </LocalizationProvider>
               
                <br></br>
                <br></br>

                <Box sx={{ minWidth: 120}}>
                    <FormControl sx={{ minWidth: 160, fontSize: 14 }}>
                        <InputLabel id="priority" sx={{ fontSize: 14, margin: 'dense' }}>Set Task Priority</InputLabel>
                        <Select
                            name="priority"
                            id="priority"
                            value={userPriority}
                            onChange={handlePriorityChange}
                            label="Priority">
                            <MenuItem sx={{ fontSize: 14 }} value="High">High</MenuItem>
                            <MenuItem sx={{ fontSize: 14 }} value="Medium" defaultValue>Medium</MenuItem>
                            <MenuItem sx={{ fontSize: 14 }} value="Low">Low</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <br></br>
                <br></br>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};
export default ToDoForm;