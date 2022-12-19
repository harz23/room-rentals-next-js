import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect } from "react";
import usePromised from "use-promised";
import FormInput from "../../Components/Reusables/FormInput";
import FormItem from "../../Components/Reusables/FormItem";
import Switch from "../../Components/Reusables/Switch";
import Text from "../../Components/Reusables/Text";
import db from "../../db";
import { AuthContext } from '../../pages/_app';
import { HttpError, RoomService } from "../../services";

type Props = {};

export default function Rooms() {
  const sessionUser = useContext(AuthContext)
  const t = useTranslations("add_cabin");
  
  const router = useRouter();

  const [submitPromise, setSubmitPromise] = usePromised<void, HttpError>();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const formData = new FormData(form)

    const input = {
      "featured": formData.get("isFeatured")?.toString() === "on" ? true : false as boolean,
      "owner": {
        "id": sessionUser?.id as number,
        "firstName": sessionUser?.firstName as string,
        "lastName": sessionUser?.lastName as string,
        "portraitUrl": sessionUser?.portraitUrl as string
      },
      "title": formData.get("title") as string,
      "description": formData.get("description") as string,
      "imageUrl": formData.get("imageUrl") as string
    }

    const promise = RoomService.post(input)
                               .then(() => form.reset())
                               

    setSubmitPromise(promise)
  }

  useEffect(() => {
    if(submitPromise.fulfilled) {
      router.push("/rooms")
    }
  }, [router, submitPromise])
         
  return <>
      <Head>
        <title>{t("create_cabin_page_title")}</title>
      </Head>

      <div className="py-20 m-auto max-w-4xl">
        <Text as="h2" variant="h2">
          {t("add_rentable_cabin")}
        </Text>

        <form className="mt-12" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            <FormItem labelText={t("title")}>
              <FormInput name="title" ariaLabel={t("title")} disabled={submitPromise.pending} required />
            </FormItem>

            <FormItem labelText={t("description")}>
              <FormInput name="description" ariaLabel={t("description")} disabled={submitPromise.pending} required />
            </FormItem>       

            <FormItem labelText={t("imageUrl")}>
              <FormInput name="imageUrl" ariaLabel={t("imageUrl")} disabled={submitPromise.pending} required />
            </FormItem>       

            <FormItem labelText={t("featured")}>
              <Switch name="isFeatured" ariaLabel={t("featureSwitch")} disabled={submitPromise.pending} />
            </FormItem>     

            <button className="mt-10 py-2 rounded-md w-32 bg-cyan-600 text-white font-semibold">
              {t("add_cabin")}
            </button>
          </div>
        </form>

        <div className="mt-10">
          {submitPromise.error && <Text>{t("createCabinError")} {submitPromise.error.status || "N/A"}</Text>}  
        </div>
      </div>
    </>
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const data = await db.read();

  return {
    props: {
      translation: (await import(`../../../translation/${context.locale}.json`)).default,
      sessionUser: data.sessionUser
    },
  };
}
