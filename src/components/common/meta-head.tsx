import { SuperSEO } from "react-super-seo";

export default function MetaHead({ title }: { title: string }) {
  return (
    <SuperSEO
      title={`${title} | Welath Wise`}
      description="Aplikasi Perencanaan Keuangan Bersama Weatlh Wise"
      lang="id"
      openGraph={{
        ogTitle: `${title} | Welath Wise`,
        ogDescription: "Aplikasi Perencanaan Keuangan Bersama Weatlh Wise",
        ogImage: {
          ogImage: "https://wealth-wise-eight.vercel.app/assets/logo.png",
          ogImageAlt: "logo wealth wise",
        },
      }}
    />
  );
}
