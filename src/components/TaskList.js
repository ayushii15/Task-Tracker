import React from 'react';
import TimeTracker from './TimeTracker';
import '../styles/TaskList.css';

function TaskList({ tasks, onEdit, onDelete, onFilter, onUpdateTime }) {
    const [filterCriteria, setFilterCriteria] = React.useState('');
    const [sortCriteria, setSortCriteria] = React.useState('');

    const handleFilterChange = (e) => {
        setFilterCriteria(e.target.value);
        onFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const filteredTasks = tasks.filter(task => 
        !filterCriteria || task.priority === filterCriteria || task.status === filterCriteria
    );

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortCriteria === 'Priority') {
            return a.priority > b.priority ? 1 : -1;
        }
        if (sortCriteria === 'Status') {
            return a.status > b.status ? 1 : -1; 
        }
        return 0;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Low':
                return 'green';
            case 'Medium':
                return 'orange';
            case 'High':
                return 'red';
            default:
                return 'black';
        }
    };

    return (
        <div>
            <h3>Task List</h3>
            <div className="controls-container">
                <label className="label">Filter by:</label>
                <select value={filterCriteria} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>

                <label className="label">Sort by:</label>
                <select value={sortCriteria} onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="Priority">Priority</option>
                    <option value="Status">Status</option>
                </select>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Assignee</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Time Spent</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.length === 0 ? (
                            <tr>
                                <td colSpan="8">No tasks available.</td>
                            </tr>
                        ) : (
                            sortedTasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.assignee}</td>
                                    <td>{task.startDate}</td>
                                    <td>{task.dueDate}</td>
                                    <td style={{ color: getPriorityColor(task.priority) }}>{task.priority}</td>
                                    <td>{task.status}</td>
                                    <td>
                                        <TimeTracker task={task} onUpdateTime={onUpdateTime} />
                                    </td>
                                    <td>
                                        <button onClick={() => onEdit(task.id)}>Edit</button>
                                        <button onClick={() => onDelete(task.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;
