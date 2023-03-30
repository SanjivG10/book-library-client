import * as yup from 'yup';

const supportedImageFormats = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const addBookSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    date: yup.date().required("Date field is required"),
    coverImage: yup.mixed()
        .test('file format', 'Valid Image File required.', (value) => {
            if (!value?.length) {
                return false
            }
            const file = value?.[0];
            return (file && supportedImageFormats.includes(file?.type))
        }),
    collection: yup.string().required('Collection is required'),
});
