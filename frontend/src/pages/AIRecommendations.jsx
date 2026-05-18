import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/api';

const AIRecommendations = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // AI State
    const [aiInsights, setAiInsights] = useState({});
    const [loadingInsights, setLoadingInsights] = useState({});

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const { data } = await API.get('/api/employees');
                // Sort by performance score descending for Ranking Dashboard
                const sorted = data.sort((a, b) => b.performanceScore - a.performanceScore);
                setEmployees(sorted);
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleGenerateInsight = async (employee) => {
        setLoadingInsights({ ...loadingInsights, [employee._id]: true });
        
        try {
            const { data } = await API.post('/api/ai/recommend', {
                employeeData: {
                    name: employee.name,
                    department: employee.department,
                    skills: employee.skills,
                    performanceScore: employee.performanceScore,
                    experience: employee.experience
                }
            });
            
            setAiInsights({ ...aiInsights, [employee._id]: data });
        } catch (error) {
            console.error('AI Insight failed:', error);
            alert('Failed to generate AI insight. Ensure API key is valid.');
        } finally {
            setLoadingInsights({ ...loadingInsights, [employee._id]: false });
        }
    };

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <Navbar />
            
            <div className="main-content">
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>AI Insights & Rankings</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>View real-time employee rankings and generate AI-driven promotion & training strategies.</p>
                </div>

                {loading ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>Loading Rankings...</div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {employees.map((emp, index) => (
                            <div key={emp._id} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'flex-start' }}>
                                
                                {/* Left Side: Employee Ranking Info */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ 
                                            width: '40px', height: '40px', borderRadius: '50%', 
                                            backgroundColor: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : index === 2 ? '#b45309' : 'var(--bg-secondary)',
                                            color: index <= 2 ? 'var(--bg-color)' : 'var(--text-secondary)',
                                            display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '1.2rem',
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{emp.name}</h3>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{emp.department} • {emp.experience} yrs</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                        <div className="badge" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-color)' }}>
                                            Score: {emp.performanceScore}/100
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                        {emp.skills.map((skill, i) => (
                                            <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '9999px', border: '1px solid var(--border-color)' }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Side: AI Insights Area */}
                                <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    {!aiInsights[emp._id] && !loadingInsights[emp._id] ? (
                                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            <button 
                                                onClick={() => handleGenerateInsight(emp)} 
                                                className="btn-primary"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                                                Generate AI Strategy
                                            </button>
                                            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Analyze performance using Trinity AI</p>
                                        </div>
                                    ) : loadingInsights[emp._id] ? (
                                        <div style={{ textAlign: 'center', color: 'var(--accent-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '30px', height: '30px', border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                            Analyzing {emp.name}...
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: '600' }}>AI Promotion Verdict:</span>
                                                {aiInsights[emp._id].promotionRecommendation?.toLowerCase().includes('yes') ? (
                                                    <span className="badge badge-success">Recommended</span>
                                                ) : (
                                                    <span className="badge badge-danger">Not Ready</span>
                                                )}
                                            </div>
                                            
                                            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>HR Feedback</div>
                                                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{aiInsights[emp._id].feedback}</p>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended Training</div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    {(aiInsights[emp._id].trainingSuggestions || []).map((t, i) => (
                                                        <span key={i} className="badge" style={{ backgroundColor: 'rgba(212, 255, 63, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(212, 255, 63, 0.2)' }}>
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AIRecommendations;
