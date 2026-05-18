import { useState } from 'react';
import API from '../utils/api';

const EmployeeRegistrationForm = ({ onEmployeeAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: 'Engineering',
        performanceScore: '',
        experience: '',
        skills: []
    });
    const [skillInput, setSkillInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const skill = skillInput.trim();
            if (skill && !formData.skills.includes(skill)) {
                setFormData({ ...formData, skills: [...formData.skills, skill] });
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await API.post('/api/employees', {
                ...formData,
                performanceScore: Number(formData.performanceScore),
                experience: Number(formData.experience)
            });
            onEmployeeAdded(res.data);
            setFormData({ name: '', email: '', department: 'Engineering', performanceScore: '', experience: '', skills: [] });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card" style={{ height: 'fit-content' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Add New Employee
            </h3>

            {error && <div className="badge badge-danger" style={{ marginBottom: '1rem', width: '100%' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" name="name" className="input-field" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" className="input-field" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <select name="department" className="input-field" value={formData.department} onChange={handleChange}>
                        <option value="Engineering">Engineering</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                    </select>
                    <input type="number" name="experience" className="input-field" placeholder="Years Exp" value={formData.experience} onChange={handleChange} required min="0" />
                </div>

                <input type="number" name="performanceScore" className="input-field" placeholder="Performance Score (0-100)" value={formData.performanceScore} onChange={handleChange} required min="0" max="100" />
                
                <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: formData.skills.length > 0 ? '0.5rem' : '0' }}>
                        {formData.skills.map(skill => (
                            <span key={skill} className="badge badge-success" style={{ gap: '0.5rem' }}>
                                {skill}
                                <span style={{ cursor: 'pointer', color: 'var(--text-inverse)' }} onClick={() => removeSkill(skill)}>×</span>
                            </span>
                        ))}
                    </div>
                    <input 
                        type="text" 
                        placeholder="Add skills (press Enter)" 
                        value={skillInput} 
                        onChange={(e) => setSkillInput(e.target.value)} 
                        onKeyDown={handleAddSkill}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : '+ Add Employee'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeRegistrationForm;
