const SearchFilter = ({ searchQuery, setSearchQuery, departmentFilter, setDepartmentFilter }) => {
    return (
        <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' }}>
            <div style={{ flex: 2, position: 'relative' }}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                />
                <svg 
                    width="18" height="18" 
                    viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"
                    style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }}
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            
            <div style={{ flex: 1 }}>
                <select 
                    className="input-field" 
                    value={departmentFilter} 
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    style={{ cursor: 'pointer' }}
                >
                    <option value="">All Depts</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                </select>
            </div>
        </div>
    );
};

export default SearchFilter;
