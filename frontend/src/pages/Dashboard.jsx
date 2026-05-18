import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import EmployeeRegistrationForm from '../components/EmployeeRegistrationForm';
import EmployeeListPage from '../components/EmployeeListPage';
import API from '../utils/api';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/api/employees');
            setEmployees(data);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fulfills Test Case 2: Fetch employee list using useEffect
    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleEmployeeAdded = (newEmployee) => {
        setEmployees([newEmployee, ...employees]);
    };

    // Calculate dynamic stats
    const avgScore = employees.length > 0 
        ? Math.round(employees.reduce((acc, curr) => acc + curr.performanceScore, 0) / employees.length) 
        : 0;
    
    const promotionCandidates = employees.filter(emp => emp.performanceScore >= 85).length;

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <Navbar />
            
            <div className="main-content">
                {/* Top Metrics Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    
                    <div className="glass-card" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-color)', borderColor: 'var(--accent-primary)' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem' }}>Total Employees</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{employees.length}</div>
                    </div>
                    
                    <div className="glass-card">
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Avg Performance</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{avgScore}</div>
                    </div>

                    <div className="glass-card">
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Top Candidates</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>{promotionCandidates}</div>
                    </div>

                </div>

                {/* Main Content Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    
                    {/* Left Column: Form */}
                    <div>
                        <EmployeeRegistrationForm onEmployeeAdded={handleEmployeeAdded} />
                    </div>

                    {/* Right Column: List */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Employee Directory</h2>
                            {/* Search/Filter will go here in Part 4 */}
                        </div>
                        <EmployeeListPage employees={employees} loading={loading} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
