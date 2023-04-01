import {
    ImFileEmpty
} from "react-icons/im";

const EmptyBookList = () => {
    return (
        <div className="p-6 rounded-md text-center">
            <p className="text-gray-500">No books to show.</p>
            <ImFileEmpty className="mx-auto mt-4 text-blue-500 text-4xl" />
        </div>
    );
}

export default EmptyBookList