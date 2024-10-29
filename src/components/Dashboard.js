import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
// import TrendLine from './TrendLine'; // Import the TrendLine component
import '../styles/Dashboard.css'; 

function Dashboard({ username, onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSaveTask = (newTask) => {
        console.log("New Task received in Dashboard:", newTask);

        setTasks(prevTasks => {
            console.log("Tasks before update:", prevTasks);

            if (newTask.id) {
             
                const updatedTasks = prevTasks.map(task => 
                    task.id === newTask.id ? newTask : task
                );
                console.log("Updated Tasks State (after editing):", updatedTasks);
                return updatedTasks;
            } else {
                
                const updatedTasks = [...prevTasks, { ...newTask, id: Date.now() }];
                console.log("Updated Tasks State (after adding):", updatedTasks);
                return updatedTasks;
            }
        });

        
        setEditingTask(null); 
        setIsFormVisible(false); 
    };

    useEffect(() => {
        console.log("Updated Tasks in Dashboard:", tasks);
    }, [tasks]);

    const handleEditTask = (id) => {
        const task = tasks.find(task => task.id === id);
        setEditingTask(task);
        setIsFormVisible(true); // Show the form when editing
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleUpdateTime = (id, timeSpent) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, timeSpent } : task));
    };

    const handleFilter = (criteria) => {
        setFilterCriteria(criteria);
    };

    const filteredTasks = tasks.filter(task => 
        !filterCriteria || task.priority === filterCriteria || task.status === filterCriteria
    );

    const getTrendData = () => {
        const taskCountByDate = tasks.reduce((acc, task) => {
            acc[task.createdAt] = (acc[task.createdAt] || 0) + 1;
            return acc;
        }, {});
        
        return Object.keys(taskCountByDate).map(date => ({
            date,
            count: taskCountByDate[date],
        }));
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2 className="dashboard-title">Task Tracker</h2>
                <div className="user-info">
                    <p className="username">Welcome {username}</p>
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                </div>
            </div>
            <TaskList 
                tasks={filteredTasks} 
                onEdit={handleEditTask} 
                onDelete={handleDeleteTask} 
                onFilter={handleFilter} 
                onUpdateTime={handleUpdateTime}  
            />
          
            <button 
                className="create-task-button" 
                onClick={() => {
                    setEditingTask(null);
                    setIsFormVisible(true); 
                }}
            >
                Create New Task
            </button>

          
            {isFormVisible && (
                <div className="form-overlay">
                    <div className="form-container">
                    <TaskForm onSave={handleSaveTask} editingTask={editingTask} onClose={() => setIsFormVisible(false)} />
                    </div>
                </div>
            )}
            
            
        </div>
    );
}

export default Dashboard;