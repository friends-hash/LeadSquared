import React from "react";
import "./tasks.css";
import { Search, Filter, ChevronDown, Plus, X } from "lucide-react";

function Tasks() {
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
  const [showMeetingForm, setShowMeetingForm] = React.useState(false);
  const [meetingData, setMeetingData] = React.useState({
    owner: "",
    subject: "",
    location: "",
    start: "",
    end: ""
  });
  const [meetingErrors, setMeetingErrors] = React.useState({});

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

  const validateMeeting = () => {
    const errs = {};
    if (!meetingData.owner.trim()) errs.owner = "Owner is required";
    if (!meetingData.subject.trim()) errs.subject = "Subject is required";
    if (!meetingData.start) errs.start = "Start time is required";
    if (!meetingData.end) errs.end = "End time is required";
    setMeetingErrors(errs);
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
        <h1>My Tasks</h1>
        <p>View and manage your tasks</p>
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
        <div className="add-task-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          <span>Add Task</span>
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
                      if (t.label === 'Meeting') {
                        // show full meeting form popup instead of navigating
                        setShowAddModal(false);
                        setFormData({ taskType: "", taskStatus: "", taskOwner: "", dueDate: "" });
                        setErrors({});
                        setTypeSearch("");
                        setShowMeetingForm(true);
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

      {/* Meeting form popup */}
      {showMeetingForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>Appointment - Meeting</h2>
              <X size={18} className="close-icon" onClick={() => setShowMeetingForm(false)} />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Owner *</label>
                <input type="text" name="owner" value={meetingData.owner} onChange={e => setMeetingData(prev => ({ ...prev, owner: e.target.value }))} />
                {meetingErrors.owner && <div className="error">{meetingErrors.owner}</div>}
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <input type="text" name="subject" value={meetingData.subject} onChange={e => setMeetingData(prev => ({ ...prev, subject: e.target.value }))} />
                {meetingErrors.subject && <div className="error">{meetingErrors.subject}</div>}
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={meetingData.location} onChange={e => setMeetingData(prev => ({ ...prev, location: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Start *</label>
                <input type="datetime-local" name="start" value={meetingData.start} onChange={e => setMeetingData(prev => ({ ...prev, start: e.target.value }))} />
                {meetingErrors.start && <div className="error">{meetingErrors.start}</div>}
              </div>
              <div className="form-group">
                <label>End *</label>
                <input type="datetime-local" name="end" value={meetingData.end} onChange={e => setMeetingData(prev => ({ ...prev, end: e.target.value }))} />
                {meetingErrors.end && <div className="error">{meetingErrors.end}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowMeetingForm(false)}>Cancel</button>
              <button className="primary" onClick={() => {
                if (validateMeeting()) {
                  setTasks(prev => [...prev, { ...meetingData, taskType: 'Meeting', id: Date.now() }]);
                  setShowMeetingForm(false);
                  setMeetingData({ owner: "", subject: "", location: "", start: "", end: "" });
                  setMeetingErrors({});
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
