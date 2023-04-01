
const ReadingDropdownOption = ({ selectedOption, onChange }) => {

    return (
        <select
            className="bg-green-800 text-white py-2 px-4 mr-2 rounded-md w-full"
            value={selectedOption}
            onChange={(e) => onChange(e.target.value)}
        >
            <option className="bg-white text-black" value="" disabled>Add to shelf</option>
            <option className="bg-purple-800 text-white" value="WANT_TO_READ">Want to read</option>
            <option className="bg-purple-800 text-white" value="READING">Reading</option>
            <option className="bg-purple-800 text-white" value="READ">Read</option>
        </select>
    );
}

export default ReadingDropdownOption
