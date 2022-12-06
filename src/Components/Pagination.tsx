import { useRouter } from "next/router";
import {useTranslations} from 'next-intl';

type Props = {
    maxPage: number,
    totalResults: number
}

export default function Pagination({maxPage, totalResults}: Props) {
    const router = useRouter();
    const t = useTranslations('pagination')

    let curPage = Number(router.query.page)
    
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
        <button disabled={curPage <= 1} onClick={previousPage} className="p-1 mr-4 bg-gray-200 hover:bg-gray-400 w-10 disabled:bg-gray-50">
            ←
        </button>
        
        {t("text", {curPage: curPage, maxPage: maxPage, totalResults: totalResults})}
        
        <button disabled={curPage >= maxPage} onClick={nextPage} className="p-1 ml-4 bg-gray-200 hover:bg-gray-400 w-10 disabled:bg-gray-50">
            →
        </button>
    </div>
    </>
}