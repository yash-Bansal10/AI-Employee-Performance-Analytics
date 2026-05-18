import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import EmployeeRegistrationForm from '../components/EmployeeRegistrationForm';
import EmployeeListPage from '../components/EmployeeListPage';
import SearchFilter from '../components/SearchFilter';
import API from '../utils/api';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');

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

    const handleDeleteEmployee = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;
        try {
            await API.delete(`/api/employees/${id}`);
            setEmployees(employees.filter(emp => emp._id !== id));
        } catch (error) {
            console.error('Failed to delete employee:', error);
            alert('Failed to delete employee');
        }
    };

    const handleUpdateScore = async (id, newScore) => {
        try {
            const { data } = await API.put(`/api/employees/${id}/score`, { performanceScore: newScore });
            setEmployees(employees.map(emp => emp._id === id ? data : emp));
        } catch (error) {
            console.error('Failed to update score:', error);
            alert('Failed to update score');
        }
    };

    // Filter Logic
    const filteredEmployees = employees.filter(emp => {
        const matchesName = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = departmentFilter ? emp.department === departmentFilter : true;
        return matchesName && matchesDept;
    });

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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Employee Directory</h2>
                            <SearchFilter 
                                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter}
                            />
                        </div>
                        <EmployeeListPage 
                            employees={filteredEmployees} 
                            loading={loading} 
                            onDelete={handleDeleteEmployee}
                            onUpdateScore={handleUpdateScore}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
