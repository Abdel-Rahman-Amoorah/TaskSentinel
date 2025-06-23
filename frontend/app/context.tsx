import React, { createContext, ReactNode, useContext, useState } from 'react';

// 1. Define the shape of the context data
type UserContextType = {
    username: string | null;
    setUsername: (name: string | null) => void;
};

// 2. Create the context with default values
const UserContext = createContext<UserContextType>({
    username: null,
    setUsername: () => { },
});

// 3. Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

// 4. Custom hook for easy usage
export const useUser = () => useContext(UserContext);
