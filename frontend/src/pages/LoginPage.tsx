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

    const { login, logout } = useContext(AuthContext)!;

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
        <>
            <form onSubmit={submitHandler}>
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
                <button>login</button>
            </form>

            <button onClick={() => logout()}>logout</button>
        </>
    );
};

export default LoginPage;
