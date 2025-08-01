
import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            role="status"
            aria-label="Loading"
        >
        </div>
    );
};

export default Spinner;
