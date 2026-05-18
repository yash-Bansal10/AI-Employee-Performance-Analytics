import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const initials = userInfo?.name ? userInfo.name.substring(0, 2).toUpperCase() : 'HR';

    const getLinkStyle = (path) => {
        const isActive = location.pathname === path;
        return {
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
            color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
            fontWeight: isActive ? '600' : '400',
            transition: 'all var(--transition-speed)',
            marginRight: '0.5rem'
        };
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <h2 style={{ color: 'var(--accent-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--accent-primary)', display: 'grid', placeItems: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-inverse)" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    EmpAI
                </h2>
                <div style={{ display: 'flex', backgroundColor: 'var(--bg-card)', padding: '0.25rem', borderRadius: '9999px' }}>
                    <Link to="/dashboard" style={getLinkStyle('/dashboard')}>Dashboard</Link>
                    <Link to="/ai-insights" style={getLinkStyle('/ai-insights')}>AI Insights</Link>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #d4ff3f 0%, #4ade80 100%)',
                        display: 'grid', placeItems: 'center', color: 'var(--bg-color)', fontWeight: 'bold'
                    }}>
                        {initials}
                    </div>
                    <span style={{ fontWeight: '500' }}>{userInfo?.name}</span>
                </div>
                <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
