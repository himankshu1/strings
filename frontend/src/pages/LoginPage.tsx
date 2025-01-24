import { FormEvent, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router';

type LoginFormType = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const [formData, setFormData] = useState<LoginFormType>({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const { login } = useContext(AuthContext)!;

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await login(formData.email, formData.password);
            console.log(res);

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-zinc-700/40 p-8 rounded-md shadow-lg">
                <div className="text-center mb-12">
                    <h1 className="text-3xl text-zinc-200 font-semibold mb-4">
                        Login to String
                    </h1>
                    <p className="text-zinc-00">
                        Please enter your registered email and password
                    </p>
                </div>
                <form onSubmit={submitHandler} className="space-y-4">
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-zinc-600 text-white placeholder-zinc-400"
                        placeholder="test@example.com"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        className="w-full px-4 py-2 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-zinc-600 text-white placeholder-zinc-400"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
