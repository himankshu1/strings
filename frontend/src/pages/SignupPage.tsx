import { FormEvent, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';

export type SignupFormType = {
    fullName: string;
    email: string;
    password: string;
};

const SignupPage = () => {
    const { signup } = useContext(AuthContext)!;

    const [formData, setFormData] = useState<SignupFormType>({
        fullName: '',
        email: '',
        password: '',
    });

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await signup(formData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className="border-2 border-black"
                placeholder="full name"
                value={formData.fullName}
                onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                }
            />
            <input
                type="email"
                className="border-2 border-black"
                placeholder="email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
            <input
                type="password"
                className="border-2 border-black"
                placeholder="password"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
            />
            <button>Sign up</button>
        </form>
    );
};

export default SignupPage;
