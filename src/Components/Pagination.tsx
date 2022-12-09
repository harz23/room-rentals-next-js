import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { CollectionPage } from "../types";

type Props = {
  collection: CollectionPage,
  setLoading: (bool: boolean) => void
};

export default function Pagination({ collection, setLoading }: Props) {
  const router = useRouter();
  const t = useTranslations("rooms");

  let curPage = collection.number;

  function changePage(number: number) {
    setLoading(true)
    router.replace({
      query: { page: curPage + number },
    }).then(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <div className="flex justify-center mt-6 mb-6">
        <button
          disabled={curPage <= 1}
          onClick={() => changePage(-1)}
          title="Previous page"
          aria-label="Previous page"
          className="p-1 mr-4 bg-gray-200 hover:bg-gray-400 w-10 disabled:bg-gray-50 rounded-lg"
        >
          ←
        </button>

        {t("pagination.text", {
          curPage: curPage,
          maxPage: collection.totalPages,
          totalResults: collection.totalElements,
        })}

        <button
          disabled={curPage >= collection.totalPages}
          onClick={() => changePage(1)}
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
