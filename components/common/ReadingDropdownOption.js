import { useTranslation } from "next-i18next";

const ReadingDropdownOption = ({ selectedOption, onChange }) => {

    const { t } = useTranslation();

    return (
        <select
            className="bg-green-800 text-white py-2 px-4 mr-2 rounded-md w-full"
            value={selectedOption || ""}
            onChange={(e) => onChange(e.target.value)}
        >
            <option className="bg-white text-black" value="" disabled>{t("Add to shelf")}</option>
            <option className="bg-purple-800 text-white" value="WANT_TO_READ">{t("Want to read")}</option>
            <option className="bg-purple-800 text-white" value="READING">{t("Reading")}</option>
            <option className="bg-purple-800 text-white" value="READ">{t("Read")}</option>
        </select>
    );
}

export default ReadingDropdownOption
