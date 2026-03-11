import React from "react";
import "./tasks.css";
import { Search, Filter, ChevronDown, Plus, X, ArrowLeft } from "lucide-react";

function Tasks({ onNavigate }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    taskType: "",
    taskStatus: "",
    taskOwner: "",
    dueDate: ""
  });
  const [errors, setErrors] = React.useState({});
  const [typeSearch, setTypeSearch] = React.useState("");
  const [showTypeForm, setShowTypeForm] = React.useState(false);
  const [currentType, setCurrentType] = React.useState("");
  const [typeFormData, setTypeFormData] = React.useState({
    owner: "",
    subject: "",
    location: "",
    start: "",
    end: ""
  });
  const [typeFormErrors, setTypeFormErrors] = React.useState({});

  const allTypes = [
    { label: "Meeting", group: "APPOINTMENT" },
    { label: "Follow-Up", group: "TODO" },
    { label: "Phone Call", group: "TODO" }
  ];

  const filteredTypes = allTypes.filter(t =>
    t.label.toLowerCase().includes(typeSearch.toLowerCase()) ||
    t.group.toLowerCase().includes(typeSearch.toLowerCase())
  );

  const validate = () => {
    const errs = {};
    if (!formData.taskType) errs.taskType = "Task type is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateTypeForm = () => {
    const errs = {};
    if (!typeFormData.owner.trim()) errs.owner = "Owner is required";
    if (!typeFormData.subject.trim()) errs.subject = "Subject is required";
    if (!typeFormData.start) errs.start = "Start time is required";
    if (!typeFormData.end) errs.end = "End time is required";
    setTypeFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (validate()) {
      setTasks(prev => [...prev, { ...formData, id: Date.now() }]);
      setShowAddModal(false);
      setFormData({ taskType: "", taskStatus: "", taskOwner: "", dueDate: "" });
      setErrors({});
      setTypeSearch("");
    }
  };

  return (
    <div className="tasks-container">
      {/* Header */}
      <div className="tasks-header">
        <div className="header-content">
          {onNavigate && (
            <button className="back-arrow-btn" onClick={() => onNavigate('smart-views')} title="Go back">
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1>My Tasks</h1>
            <p>View and manage your tasks</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="tasks-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <button className="filter-btn">
            <Filter size={16} />
            <span>Task Type</span>
            <ChevronDown size={14} />
          </button>
          <button className="filter-btn">
            <span>Task Status</span>
            <ChevronDown size={14} />
          </button>
          <button className="filter-btn">
            <span>Task Owner</span>
            <ChevronDown size={14} />
          </button>
          <button className="filter-btn">
            <span>Due Date</span>
            <ChevronDown size={14} />
          </button>
        </div>
        
      </div>

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className="tasks-empty">
          <p>No records added yet!</p>
          <button className="primary" onClick={() => setShowAddModal(true)}>Add Task</button>
        </div>
      )}

      {/* TODO: render task list when available */}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Task</h2>
              <X size={18} className="close-icon" onClick={() => setShowAddModal(false)} />
            </div>
            <div className="modal-body">
              <label>Task Type</label>
              <input
                type="text"
                name="taskType"
                placeholder="Type to Search"
                value={typeSearch}
                onChange={(e) => { setTypeSearch(e.target.value); setFormData(prev => ({ ...prev, taskType: e.target.value })); }}
              />
              {errors.taskType && <div className="error">{errors.taskType}</div>}
              <div className="type-options">
                {filteredTypes.map(t => (
                  <div
                    key={t.label}
                    className="type-option"
                    onClick={() => {
                      if (['Meeting','Follow-Up','Phone Call'].includes(t.label)) {
                        setShowAddModal(false);
                        setFormData({ taskType: "", taskStatus: "", taskOwner: "", dueDate: "" });
                        setErrors({});
                        setTypeSearch("");
                        setCurrentType(t.label);
                        setShowTypeForm(true);
                      } else {
                        setFormData(prev => ({ ...prev, taskType: t.label }));
                        setTypeSearch(t.label);
                      }
                    }}
                  >
                    <strong>{t.group}</strong> - {t.label}
                  </div>
                ))}
              </div>

              {/* other fields could be added here */}
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="primary" onClick={handleAdd}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Type-specific form popup */}
      {showTypeForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>{currentType}</h2>
              <X size={18} className="close-icon" onClick={() => setShowTypeForm(false)} />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Owner *</label>
                <input type="text" name="owner" value={typeFormData.owner} onChange={e => setTypeFormData(prev => ({ ...prev, owner: e.target.value }))} />
                {typeFormErrors.owner && <div className="error">{typeFormErrors.owner}</div>}
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <input type="text" name="subject" value={typeFormData.subject} onChange={e => setTypeFormData(prev => ({ ...prev, subject: e.target.value }))} />
                {typeFormErrors.subject && <div className="error">{typeFormErrors.subject}</div>}
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={typeFormData.location} onChange={e => setTypeFormData(prev => ({ ...prev, location: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Start *</label>
                <input type="datetime-local" name="start" value={typeFormData.start} onChange={e => setTypeFormData(prev => ({ ...prev, start: e.target.value }))} />
                {typeFormErrors.start && <div className="error">{typeFormErrors.start}</div>}
              </div>
              <div className="form-group">
                <label>End *</label>
                <input type="datetime-local" name="end" value={typeFormData.end} onChange={e => setTypeFormData(prev => ({ ...prev, end: e.target.value }))} />
                {typeFormErrors.end && <div className="error">{typeFormErrors.end}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowTypeForm(false)}>Cancel</button>
              <button className="primary" onClick={() => {
                if (validateTypeForm()) {
                  setTasks(prev => [...prev, { ...typeFormData, taskType: currentType, id: Date.now() }]);
                  setShowTypeForm(false);
                  setTypeFormData({ owner: "", subject: "", location: "", start: "", end: "" });
                  setTypeFormErrors({});
                }
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
