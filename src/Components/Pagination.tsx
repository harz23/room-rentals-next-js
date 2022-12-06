import { useRouter } from "next/router";
import {useTranslations} from 'next-intl';
import { CollectionPage } from "../types";

type Props = {
    collection: CollectionPage
}

export default function Pagination({collection}: Props) {
    const router = useRouter();
    const t = useTranslations('pagination')

    let curPage = collection.number
    
    function previousPage() {
        let newPage
        if(curPage - 1 >= 1) {
            newPage = curPage - 1
        }
        router.replace({
            query: {page: newPage}
        })
    }

    function nextPage() {
        router.replace({
            query: {page: curPage + 1}
        })
    }

    return <>
    <div className="flex justify-center mt-6 mb-6">
        <button disabled={curPage <= 1} onClick={previousPage} title="Previous page" aria-label="Previous page" className="p-1 mr-4 bg-gray-200 hover:bg-gray-400 w-10 disabled:bg-gray-50">
            ←
        </button>
        
        {t("text", {curPage: curPage, maxPage: collection.totalPages, totalResults: collection.totalElements})}
        
        <button disabled={curPage >= collection.totalPages} onClick={nextPage} title="Next page" aria-label="Next page" className="p-1 ml-4 bg-gray-200 hover:bg-gray-400 w-10 disabled:bg-gray-50">
            →
        </button>
    </div>
    </>
}