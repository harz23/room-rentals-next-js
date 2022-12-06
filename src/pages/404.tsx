import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Text from "../Components/Reusables/Text";

type Props = {
    translation: any
}

export default function Custom404() {
    const t = useTranslations("error");

    return <>
      <div className="m-auto max-w-4xl mt-20">
        <Text variant="h1">{t("NotFound")}</Text>
        
        <div className="mt-4">
          <Link href="/rooms">
            <Text variant="navigation" color="primary" className="underline hover:text-cyan-800">{t("back")}</Text>
          </Link>
        </div>
      </div>
    </>
}


export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
    return {
      props: {
        translation: (await import(`../../translation/${context.locale}.json`)).default,
      },
    }
  }
  