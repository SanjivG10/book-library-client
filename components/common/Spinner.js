import { FaSpinner } from 'react-icons/fa';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
        </div>
    );
};

export default Spinner;
