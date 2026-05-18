const EmployeeListPage = ({ employees, loading }) => {
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
                        <div className="badge" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-color)', fontWeight: 'bold' }}>
                            {emp.performanceScore} / 100
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

                </div>
            ))}
        </div>
    );
};

export default EmployeeListPage;
