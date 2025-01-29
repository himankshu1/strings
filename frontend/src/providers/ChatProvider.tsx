import { axiosClient } from '@/lib/axios';
import { IChatContext } from '@/types';
import { createContext, useEffect, useState } from 'react';

const fetchUsers = async () => {
    try {
        const { data } = await axiosClient.get('/users/get-all-users');
        // console.log('users', data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

//! move context objects to context folder to remove the warning
export const ChatContext = createContext<IChatContext | undefined>(undefined);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //* fetch users on component mount
    useEffect(() => {
        setIsLoading(true);
        const fetchAllUsers = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData);
        };
        fetchAllUsers();
        setIsLoading(false);
    }, []);

    return (
        <ChatContext.Provider value={{ users, fetchUsers, isLoading }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
