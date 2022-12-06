import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import FormInput from "../../Components/Reusables/FormInput";
import FormItem from "../../Components/Reusables/FormItem";
import Switcher from "../../Components/Reusables/Switcher";
import Text from "../../Components/Reusables/Text";
import db from "../../db";

type Props = {};

export default function Rooms() {
  const t = useTranslations("add_cabin");

  return (
    <>
      <Head>
        <title>{t("create_cabin_page_title")}</title>
      </Head>

      <div className="py-20 m-auto max-w-4xl">
        <Text as="h2" variant="h2">
          {t("add_rentable_cabin")}
        </Text>

        <form className="mt-12">
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            <FormItem labelText="URL">
              <FormInput ariaLabel="URL"/>
            </FormItem>              

            <FormItem labelText="Description">
              <FormInput ariaLabel="Description"/>
            </FormItem>       

            <FormItem labelText="Hero image URL">
              <FormInput ariaLabel="Hero image URL"/>
            </FormItem>       

            <FormItem labelText="Featured">
              <Switcher/>
            </FormItem>       

            <button className="mt-10 py-2 rounded-md w-32 bg-cyan-600 text-white font-semibold">
              Add cabin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const data = await db.read();

  return {
    props: {
      translation: (await import(`../../../translation/${context.locale}.json`)).default,
      sessionUser: {
        id: data.sessionUser.id,
        firstName: data.sessionUser.firstName,
        lastName: data.sessionUser.lastName,
        portraitUrl: data.sessionUser.portraitUrl,
        starredRooms: data.sessionUser.starredRooms,
      },
    },
  };
}
