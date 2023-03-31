import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import LOGIN from '@graphql/mutations/login.mutation';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@lib/yup-schemas/auth.schema';
import Link from 'next/link';
import { PAGE_URLS } from '@constants/urls';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(yupResolver(loginSchema));

    const router = useRouter();
    const [login, { error }] = useMutation(LOGIN);

    const onSubmit = async ({ username, password }) => {
        try {
            const { data } = await login({ variables: { username, password } });
            localStorage.setItem('token', data.login.token);
            router.push(PAGE_URLS.ADD_BOOK);
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                {...register('username')}
                                id="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                {...register('password')}
                                id="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className='flex flex-col'>
                        {error?.graphQLErrors.map(({ message }, i) => (
                            <div className='text-center text-[#ff0000] p-0 mt-1' key={i}>{message}</div>
                        ))}
                    </div>

                    <div>
                        <Link href={PAGE_URLS.SIGNUP}>
                            <div className='text-center text-indigo-600'>
                                Don't have an account? Sign up.
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
