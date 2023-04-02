import { useTranslation } from "next-i18next";
import {
    ImFileEmpty
} from "react-icons/im";

const EmptyBookList = () => {
    const { t } = useTranslation();
    return (
        <div data-testid="empty-book" className="p-6 rounded-md text-center">
            <p className="text-gray-500">{t("No books to show.")}</p>
            <ImFileEmpty className="mx-auto mt-4 text-blue-500 text-4xl" />
        </div>
    );
}

export default EmptyBookList