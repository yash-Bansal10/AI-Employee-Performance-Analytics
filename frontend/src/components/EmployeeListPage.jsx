import { useState } from 'react';

const EmployeeListPage = ({ employees, loading, onDelete, onUpdateScore }) => {
    const [editScoreId, setEditScoreId] = useState(null);
    const [tempScore, setTempScore] = useState('');

    const handleEditClick = (emp) => {
        setEditScoreId(emp._id);
        setTempScore(emp.performanceScore);
    };

    const handleSaveScore = (id) => {
        onUpdateScore(id, Number(tempScore));
        setEditScoreId(null);
    };

    if (loading) {
        return <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>Loading employees...</div>;
    }

    if (employees.length === 0) {
        return <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>No employees found. Add one to get started!</div>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {employees.map(emp => (
                <div key={emp._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ 
                                width: '48px', height: '48px', borderRadius: '50%', 
                                background: 'linear-gradient(135deg, #d4ff3f 0%, #4ade80 100%)',
                                display: 'grid', placeItems: 'center', color: 'var(--bg-color)', fontWeight: 'bold', fontSize: '1.2rem'
                            }}>
                                {emp.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{emp.name}</h3>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{emp.department}</span>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                            {editScoreId === emp._id ? (
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input 
                                        type="number" 
                                        value={tempScore} 
                                        onChange={(e) => setTempScore(e.target.value)} 
                                        style={{ width: '60px', padding: '0.2rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                                    />
                                    <button onClick={() => handleSaveScore(emp._id)} className="badge badge-success" style={{ cursor: 'pointer', border: 'none' }}>Save</button>
                                </div>
                            ) : (
                                <div className="badge" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-color)', fontWeight: 'bold' }}>
                                    {emp.performanceScore} / 100
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <div>Email: {emp.email}</div>
                        <div>Experience: {emp.experience} years</div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                        {emp.skills.map((skill, index) => (
                            <span key={index} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '9999px', border: '1px solid var(--border-color)' }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                        {editScoreId !== emp._id && (
                            <button onClick={() => handleEditClick(emp)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem' }}>
                                Edit Score
                            </button>
                        )}
                        <button onClick={() => onDelete(emp._id)} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem' }}>
                            Delete
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default EmployeeListPage;
