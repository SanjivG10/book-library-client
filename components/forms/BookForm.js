import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';

import { BACKEND_URLS } from '@/constants/urls';
import { addBookSchema, editBookSchema } from '@/lib/yup-schemas/book.schema';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

const BookForm = ({ onSubmit, defaultValues = {}, edit = false }) => {

    const { t } = useTranslation();

    const currentDate = edit && defaultValues?.date ? new Date(defaultValues.date) : new Date();
    const defaultDateString = currentDate.toISOString().substring(0, 10);
    const [image, setImage] = useState("");

    const {
        register,
        handleSubmit,
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
            else if (watchCoverImage?.[0]) {
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
                        {t("title")}
                    </label>
                    <input
                        className={`shadow appearance-none ${errors.title ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="title"
                        type="text"
                        {...register('title')}
                        data-testid="title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        {t("author")}
                    </label>
                    <input
                        className={`shadow appearance-none ${errors.author ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="author"
                        type="text"
                        {...register('author')}
                        data-testid="author"
                    />
                    {errors.author && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.author.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        {t("description")}
                    </label>
                    <textarea
                        className={`shadow appearance-none ${errors.description ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="description"
                        {...register('description')}
                        data-testid="description"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.description.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        {t("date")}
                    </label>
                    <input
                        className={`shadow appearance-none ${errors.date ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="date"
                        type="date"
                        defaultValue={defaultDateString}
                        {...register('date')}
                        data-testid="date"
                    />
                    {errors.date && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.date.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                        {t("cover Image")}
                    </label>
                    <input
                        className={`shadow appearance-none ${errors.coverImage ? 'border-red-500' : 'border-gray-200'
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        {...register('coverImage')}
                        data-testid="coverImage"
                    />

                    {errors.coverImage && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.coverImage.message}</p>
                    )}
                </div>
                {
                    image &&
                    <div className='m-2'>
                        <Image alt='cover' width={200} height={400} src={image} />
                    </div>
                }
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        data-testid="submit"
                    >
                        {
                            edit ? t("save") : t("add book")
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookForm