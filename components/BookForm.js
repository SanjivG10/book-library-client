import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";

import { BACKEND_URLS } from '@constants/urls';
import { addBookSchema, editBookSchema } from '@lib/yup-schemas/book.schema';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const BookForm = ({ onSubmit, defaultValues = {}, edit = false }) => {

    const currentDate = edit && defaultValues?.date ? new Date(defaultValues.date) : new Date();
    const defaultDateString = currentDate.toISOString().substring(0, 10);
    const [image, setImage] = useState("");

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch
    } = useForm({
        resolver: yupResolver(edit ? editBookSchema : addBookSchema),
        defaultValues: {
            ...defaultValues,
            date: defaultDateString
        }
    });


    const watchCoverImage = watch("coverImage");
    useEffect(() => {
        if (watchCoverImage) {
            if (typeof watchCoverImage === "string") {
                const image = BACKEND_URLS.IMAGE_URL + watchCoverImage;
                setImage(image);
            }
            else {
                const fileUrl = URL.createObjectURL(watchCoverImage[0]);
                setImage(fileUrl);
            }
        }
    }, [watchCoverImage])


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

    const submitForm = async (data) => {
        let uploadedImageUrl = "";
        if (!data.coverImage.length || typeof data.coverImage === "string") {
            uploadedImageUrl = defaultValues?.coverImage;
        }
        else {
            uploadedImageUrl = await uploadCoverImage(data.coverImage[0]);
        }
        onSubmit(data, uploadedImageUrl);
    };

    return (
        <div className="container mx-auto mt-10">
            <form onSubmit={handleSubmit(submitForm)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                        defaultValue={defaultDateString}
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
                {
                    image &&
                    <div>
                        <Image alt='cover' width={200} height={400} src={image} />
                    </div>
                }
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collection">
                        Collection
                    </label>
                    <select
                        name="collectionType"
                        className={`shadow appearance-none border ${errors.collectionType ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    >
                        <option value="">Select a collection</option>
                        <option value="WANT_TO_READ">Want to read</option>
                        <option value="READING">Reading</option>
                        <option value="READ">Read</option>
                    </select>
                    {errors.collectionType && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.collectionType.message}</p>
                    )}

                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {
                            edit ? "Save" : "Add Book"
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookForm