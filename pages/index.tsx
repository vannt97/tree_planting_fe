import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Script from "next/script";
import { ReactElement } from "react";
import Seo from "src/components/Seo";
import DefaultLayout from "src/containers/DefaultLayout";
import HomePage from "src/containers/home";
import HomeBannerImg from "public/images/home-banner.png";
import Head from "next/head";
import "aos/dist/aos.css";

export interface HomeProps {
  data: any;
}

const Home = (props: HomeProps) => {
  const { data } = props;
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="../public/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}`}
        title="Trồng cây cùng Panasonic Việt Nam"
        thumnail={`${data && data?.length > 0 ? data[0]?.url : ``}`}
        description="Từ ngày 01/11/2023 đến 31/03/2024, với mỗi sản phẩm thuộc bộ GIẢI PHÁP SỨC KHỎE TOÀN DIỆN được bán ra, Panasonic Việt Nam sẽ trồng một cây xanh phát triển rừng.
        VÌ MỘT VIỆT NAM XANH KHỎE MẠNH
        Mỗi cây sẽ có một mã số riêng giúp bạn có thể theo dõi và ngắm nhìn tiến trình sinh trưởng bất kì lúc nào.
        Mời bạn đăng kí bảo hành điện tử để nhận mã cây và có cơ hội nhận nhiều ưu đãi hấp dẫn từ Panasonic Việt Nam."
      />
      <HomePage imageData={data} />
      {/* <Script src="https://sp.zalo.me/plugins/sdk.js"></Script> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-248537004-2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-248537004-2');
        `}
      </Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-XXXXX-Y', 'auto');
          ga('send', 'pageview');
        `}
      </Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-248537004-2', 'auto');
          ga('send', 'pageview');
        `}
      </Script>

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-4HMFWRNT84"
      />
      <Script id="google-analytics-4.0">
        {`
          window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-4HMFWRNT84'); 
        `}
      </Script>

      <Script
        src="https://www.google-analytics.com/analytics.js"
        strategy="afterInteractive"
      />
      <Script src="https://www.google.com/recaptcha/api.js"></Script>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context: GetServerSidePropsContext
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_API}/api/StaticPages/ImageTrial`
  );
  const data = await response.json();
  return {
    props: {
      data: data.data,
    },
  };
};
