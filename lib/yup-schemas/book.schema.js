import * as yup from 'yup';

const supportedImageFormats = ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/webp"];

const bookSchema =
    yup.object().shape({
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        description: yup.string().required('Description is required'),
        date: yup.date().required("Date field is required"),
    });

export const addBookSchema = bookSchema.shape({
    coverImage: yup.mixed().optional().test('file format', 'Valid Image File required.', (value) => {
        const file = value?.[0];
        return (file && supportedImageFormats.includes(file?.type))
    }),
});

export const editBookSchema = bookSchema.shape({
    coverImage: yup.mixed().optional().test('file format', 'Valid Image File required.', (value) => {
        if (!value || !value?.length || typeof value === "string") {
            return true
        }
        const file = value?.[0];
        return (file && supportedImageFormats.includes(file?.type))
    }),
    collectionType: yup.string().required('Collection is required'),
});
