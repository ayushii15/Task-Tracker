import React, { useState, useEffect } from 'react';
import Popup from '../components/popup'; 
import '../styles/TaskForm.css';

function TaskForm({ onSave, editingTask, onClose }) { 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('Open');
    const [assignee, setAssignee] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [showPopup, setShowPopup] = useState(false); 

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setStatus(editingTask.status);
            setAssignee(editingTask.assignee);
            setStartDate(editingTask.startDate);
            setDueDate(editingTask.dueDate);
        } else {
            setTitle('');
            setDescription('');
            setPriority('Low');
            setStatus('Open');
            setAssignee('');
            setStartDate('');
            setDueDate('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (startDate && dueDate && new Date(startDate) > new Date(dueDate)) {
            setShowPopup(true); 
            return;
        }

        const updatedTask = {
            id: editingTask ? editingTask.id : null,
            title,
            description,
            priority,
            status,
            assignee,
            startDate,
            dueDate,
            timeSpent: editingTask ? editingTask.timeSpent : 0,
            createdAt: new Date().toISOString().split('T')[0],
        };

        onSave(updatedTask);

        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('Low');
        setStatus('Open');
        setAssignee('');
        setStartDate('');
        setDueDate('');
    };

    return (
        <>
            {showPopup && (
                <Popup
                    message="Start date should be less than or equal to the due date."
                    onClose={() => setShowPopup(false)} // Close popup
                />
            )}
            <form className="task-form" onSubmit={handleSubmit}>
                <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Assignee:</label>
                        <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Priority:</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Due Date:</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className= "button-container">
                <button type="submit">{editingTask ? 'Update Task' : 'Create Task'}</button>
                <button type="button" className="close-button" onClick={onClose}>Close</button>
                </div>
            </form>
        </>
    );
}

export default TaskForm;
