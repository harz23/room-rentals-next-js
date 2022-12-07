import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { CollectionPage } from "../types";
import { useEffect } from "react";

type Props = {
  collection: CollectionPage,
  setLoading: (bool: boolean) => void
};

export default function Pagination({ collection, setLoading }: Props) {
  const router = useRouter();
  const t = useTranslations("pagination");

  let curPage = collection.number;

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))
    router.events.on('routeChangeError', () => setLoading(false))  
  })

  function previousPage() {
    router.replace({
      query: { page: curPage - 1 },
    });
  }

  function nextPage() {
    router.replace({
      query: { page: curPage + 1 },
    });
  }

  return (
    <>
      <div className="flex justify-center mt-6 mb-6">
        <button
          disabled={curPage <= 1}
          onClick={previousPage}
          title="Previous page"
          aria-label="Previous page"
          className="p-1 mr-4 bg-gray-200 hover:bg-gray-400 w-10 disabled:bg-gray-50 rounded-lg"
        >
          ←
        </button>

        {t("text", {
          curPage: curPage,
          maxPage: collection.totalPages,
          totalResults: collection.totalElements,
        })}

        <button
          disabled={curPage >= collection.totalPages}
          onClick={nextPage}
          title="Next page"
          aria-label="Next page"
          className="p-1 ml-4 bg-gray-200 hover:bg-gray-400 w-10 disabled:bg-gray-50 rounded-lg"
        >
          →
        </button>
      </div>
    </>
  );
}
