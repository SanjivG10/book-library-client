
import { useMutation } from '@apollo/client';
import { PAGE_URLS } from '@constants/urls';
import SIGNUP from '@graphql/mutations/signup.mutation';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@lib/yup-schemas/auth.schema';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export async function getStaticProps({ locale = "en" }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(yupResolver(signupSchema));

    const router = useRouter();
    const [signup, { error }] = useMutation(SIGNUP);

    const onSubmit = async (variables) => {
        try {
            const response = await signup({ variables });
            localStorage.setItem('token', response.data.register.token);
            router.push(PAGE_URLS.HOME);
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t("Sign up for us")}</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                {t("Email")}
                            </label>
                            <input
                                {...register('email')}
                                id="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder={t("Email")}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">
                                {t("Username")}
                            </label>
                            <input
                                {...register('username')}
                                id="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder={t("Username")}
                            />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {t("Password")}
                            </label>
                            <input
                                {...register('password')}
                                id="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder={t("Password")}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t("Sign up")}
                        </button>
                    </div>

                    <div className='flex flex-col'>
                        {error?.graphQLErrors.map(({ message }, i) => (
                            <div className='text-center text-[#ff0000] p-0 mt-1' key={i}>{message}</div>
                        ))}
                    </div>

                    <div>
                        <Link href={PAGE_URLS.LOGIN}>
                            <div className='text-center text-indigo-600'>
                                {t("Already have an account? Sign in.")}
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
