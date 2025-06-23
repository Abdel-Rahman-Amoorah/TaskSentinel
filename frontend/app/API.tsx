import * as Device from "expo-device";

const _device = {
    brand: Device.brand,
    modelName: Device.modelName,
    osName: Device.osName,
    osVersion: Device.osVersion
}
export const handleLogout = async (currentUser: string) => {
    try {
        const response = await fetch('http://your-splunk-instance/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentUser, _device }),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    }
    catch (error) {
        console.error("Logout request failed:", error);
        throw new Error("Failed to connect to the server. Please try again later.");
    }
};

export const handleLogin = async (username: string, password: string) => {
    try {
        const response = await fetch('http://your-splunk-instance/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, _device }),
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        return data.message;
    }
    catch (error) {
        console.error("Login request failed:", error);
        throw new Error("Failed to connect to the server. Please try again later.");
    }
};

export const handleRegister = async (username: string, password: string, email: string) => {
    try {
        const response = await fetch('http://your-splunk-instance/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, _device }),
        });
        const data = await response.json();

        return data;
    }
    catch (error) {
        console.error("Registration request failed:", error);
        throw new Error("Failed to connect to the server. Please try again later.");
    }

};

export const handleTask = async (user: string | null,operation: string,comment: string ) => {
    operation = operation.toLowerCase();
    const _method  = () => {
        switch (operation) {
            case 'create':
                return 'POST';
            case 'read':
                return 'POST';
            case 'update':
                return 'PUT';
            case 'delete':
                return 'DELETE';
            default:
                throw new Error("Invalid operation");
        }
    }
    console.log("Operation:", operation, "Method:", _method());
    const response = await fetch('http://your-splunk-instance/'+ operation, {
        method: _method(),
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user,operation, comment, _device }),
    });

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }

    return data.error;
};