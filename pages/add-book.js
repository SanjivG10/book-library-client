import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";

import { BACKEND_URLS, PAGE_URLS } from '@constants/urls';
import ADD_BOOK from '@graphql/mutations/addBook.mutation';
import { addBookSchema } from '@lib/yup-schemas';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const AddBook = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(addBookSchema),
    });

    const [addBook] = useMutation(ADD_BOOK);
    const router = useRouter();

    const uploadCoverImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append("coverImage", file);
            const response = await axios.post(BACKEND_URLS.UPLOAD_ROUTE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data.file
        }
        catch {
            console.log("File Upload Failed");
        }
    };

    const onSubmit = async (data) => {
        const { title, author, date, coverImage, collectionType } = data;
        const uploadedImageUrl = await uploadCoverImage(coverImage[0]);
        if (uploadedImageUrl) {
            await addBook({
                variables: { title, author, date: date.toISOString(), coverImage: uploadedImageUrl, collectionType }
            });
            router.push(PAGE_URLS.HOME);
        }

    };

    const today = new Date();
    const dateString = today.toISOString().substring(0, 10);


    return (
        <div className="container mx-auto mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className={`shadow appearance-none ${errors.title ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="title"
                        type="text"
                        {...register('title')}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        Author
                    </label>
                    <input
                        className={`shadow appearance-none ${errors.author ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="title"
                        type="text"
                        {...register('author')}
                    />
                    {errors.author && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.author.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date
                    </label>
                    <input
                        className={`shadow appearance-none ${errors.date ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="title"
                        type="date"
                        defaultValue={dateString}
                        {...register('date')}
                    />
                    {errors.date && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.date.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                        Cover Image
                    </label>
                    <input
                        className={`shadow appearance-none ${errors.coverImage ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        {...register('coverImage')}
                    />
                    {errors.coverImage && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.coverImage.message}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collection">
                        Collection
                    </label>
                    <Controller
                        render={({ field }) => (
                            <select
                                {...field}
                                className={`shadow appearance-none border ${errors.collectionType ? 'border-red-500' : 'border-gray-200'
                                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            >
                                <option value="">Select a collection</option>
                                <option value="WANT_TO_READ">Want to read</option>
                                <option value="READING">Reading</option>
                                <option value="READ">Read</option>
                            </select>
                        )}
                        control={control}
                        name="collectionType"
                    />
                    {errors.collectionType && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.collectionType.message}</p>
                    )}

                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;


