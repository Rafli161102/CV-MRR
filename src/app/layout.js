import React from 'react';

const RootLayout = ({ children }) => {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;