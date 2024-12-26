import React from 'react';

const PlayerMultiProgress = () => {
    // Static progress bar data
    const data = [
        { value: 20, color: '#FDCA40' }, // Azure
        { value: 50, color: '#6665DD' }, // Purple
        { value: 10, color: '#7ED321' }, // Grass
        { value: 20, color: '#0496FF' }, // Accent
    ];

    // Total value for calculating percentages
    const total = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                margin: '0 auto',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            {/* Info Section */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                }}
            >
                <span>457</span>
                <span style={{ borderLeft: '1px solid #ccc', height: '20px', margin: '0 12px' }} />
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    6 <i style={{ border: 'solid black', borderWidth: '0 2px 2px 0', padding: '3px', transform: 'rotate(-45deg)' }} />
                </span>
            </div>

            {/* Multi-Progress Bar */}
            <div
                style={{
                    display: 'flex',
                    height: '20px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#f1f1f1',
                }}
            >
                {data.map((item, index) => {
                    const percentage = (item.value / total) * 100;
                    return (
                        <div
                            key={index}
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: item.color,
                                transition: 'width 0.5s ease',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerMultiProgress;
