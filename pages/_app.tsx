import { ConfigProvider } from "antd";
import vie from "antd/lib/locale/vi_VN";
import moment from "moment";
import "moment/locale/vi";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import ReactGA from "react-ga";
import TagManager from "react-gtm-module";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "src/app/store";
import BackToTop from "src/components/BackToTop";
import { createGlobalStyle } from "styled-components";
import "../styles/globals.css";
import "../styles/_app.scss";

const GlobalStyles = createGlobalStyle`
  html,body {
    margin: 0;
    /* position: relative; */
    /* overflow-x: hidden; */
    height: 100%;
  }

`;
moment.locale("vi");

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const TRACKING_ID = "UA-248695486-2";
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  ReactGA.initialize(TRACKING_ID);
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-WSCNHD4" });
  }, []);

  return (
    <ConfigProvider locale={vie}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          {getLayout(<Component {...pageProps} />)}
          <BackToTop />
          <div
            className="w-[75px] desktop:w-[87px] aspect-square rounded-full right-[1rem] bottom-[7rem] desktop:bottom-[10rem] fixed z-20"
            style={{
              background:
                "linear-gradient(180deg, #94CE3F 8.85%, #5C8729 91.67%)",
            }}
          >
            <a
              href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html?gidzl=og9BE0H7WqZ9l4uv2b64IyUtJJaJ1eT9s-fBEXbUXX_Ginbe6rRM7jIr73WU0ePFtUzEEJdwrVn70KI1IG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <div>
                  <svg
                    className="map-pin mx-auto"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28.4375 14.2188C28.4375 24.0625 17.5 31.7188 17.5 31.7188C17.5 31.7188 6.56251 24.0625 6.56251 14.2188C6.56251 11.3179 7.71485 8.53595 9.76603 6.48477C11.8172 4.43359 14.5992 3.28125 17.5 3.28125C20.4008 3.28125 23.1828 4.43359 25.234 6.48477C27.2852 8.53595 28.4375 11.3179 28.4375 14.2188V14.2188Z"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.6336 20.5751C21.5148 20.5751 24.6611 17.3937 24.6611 13.4693C24.6611 9.54489 21.5148 6.36353 17.6336 6.36353C13.7524 6.36353 10.6061 9.54489 10.6061 13.4693C10.6061 17.3937 13.7524 20.5751 17.6336 20.5751Z"
                      fill="#DCEEC0"
                    />
                    <path
                      d="M16.9217 12.0564H16.6963V24.3937H16.9217V12.0564Z"
                      fill="#00874A"
                    />
                    <path
                      d="M15.1611 16.8172C14.4811 16.8164 13.8269 16.5537 13.3315 16.0826C12.8361 15.6116 12.5367 14.9674 12.4941 14.2812L12.4843 14.1161L12.6074 14.0053C12.9792 13.6633 13.4395 13.4352 13.9346 13.3475C14.4297 13.2599 14.9392 13.3163 15.4038 13.5103C15.8696 13.7009 16.2723 14.0213 16.5649 14.4344C16.8575 14.8475 17.028 15.3361 17.0566 15.8434L17.0671 16.009L16.9439 16.1192C16.4557 16.5672 15.8204 16.8159 15.1611 16.8172ZM13.1869 14.4063C13.2365 14.7532 13.3748 15.0809 13.5882 15.3571C13.8016 15.6333 14.0827 15.8483 14.4035 15.9809C14.7244 16.1134 15.074 16.1589 15.4176 16.1129C15.7612 16.0668 16.0869 15.9308 16.3626 15.7182C16.3142 15.3709 16.1764 15.0425 15.9628 14.7661C15.7492 14.4897 15.4674 14.275 15.1457 14.1435C14.8252 14.0095 14.4754 13.9632 14.1315 14.0094C13.7876 14.0555 13.4618 14.1924 13.1869 14.4063Z"
                      fill="#00874A"
                    />
                    <path
                      d="M18.7857 16.98C17.9884 16.9782 17.2194 16.6814 16.6237 16.1456L16.5005 16.036L16.5091 15.871C16.5407 15.2495 16.7451 14.6496 17.099 14.1403C17.4528 13.6311 17.9417 13.2333 18.5093 12.9926C19.0769 12.7519 19.7001 12.6781 20.3074 12.7797C20.9146 12.8814 21.4811 13.1543 21.9417 13.5672L22.0649 13.6761L22.0562 13.8418C22.0271 14.464 21.8237 15.0651 21.4697 15.5749C21.1157 16.0848 20.6257 16.4825 20.0568 16.7215C19.6543 16.8923 19.2222 16.9801 18.7857 16.98ZM17.1988 15.7396C17.5613 16.027 17.9933 16.2109 18.4499 16.2722C18.9065 16.3335 19.371 16.27 19.795 16.0883C20.2202 15.9096 20.5903 15.619 20.8668 15.2467C21.1433 14.8744 21.3161 14.434 21.3672 13.9713C21.004 13.6853 20.572 13.5023 20.1158 13.4411C19.6595 13.3798 19.1953 13.4424 18.7709 13.6226C18.3464 13.8028 17.9771 14.094 17.7008 14.4663C17.4246 14.8385 17.2513 15.2785 17.1988 15.7409V15.7396Z"
                      fill="#00874A"
                    />
                    <path
                      d="M16.809 12.5697C16.4631 12.5697 16.125 12.4659 15.8374 12.2716C15.5498 12.0773 15.3257 11.8012 15.1933 11.478C15.0609 11.1549 15.0263 10.7993 15.0938 10.4563C15.1613 10.1133 15.3278 9.7982 15.5724 9.5509C15.817 9.30359 16.1286 9.13517 16.4679 9.06694C16.8071 8.9987 17.1587 9.03373 17.4783 9.16757C17.7978 9.30141 18.071 9.52807 18.2632 9.81887C18.4553 10.1097 18.5579 10.4516 18.5579 10.8013C18.5574 11.2701 18.373 11.7197 18.0451 12.0512C17.7173 12.3827 17.2727 12.5692 16.809 12.5697ZM16.809 9.71726C16.5968 9.71726 16.3894 9.78089 16.213 9.90011C16.0366 10.0193 15.8991 10.1888 15.8179 10.387C15.7367 10.5852 15.7155 10.8034 15.757 11.0138C15.7984 11.2242 15.9006 11.4175 16.0507 11.5691C16.2008 11.7208 16.392 11.8241 16.6001 11.8658C16.8083 11.9076 17.024 11.8861 17.22 11.8039C17.416 11.7217 17.5835 11.5825 17.7013 11.4041C17.8191 11.2256 17.8819 11.0159 17.8818 10.8013C17.8813 10.5138 17.7681 10.2383 17.567 10.0351C17.3659 9.83189 17.0933 9.71759 16.809 9.71726Z"
                      fill="#00874A"
                    />
                  </svg>
                </div>
                <p className="text-base desktop:text-xl font-bold uppercase text-white-500 whitespace-nowrap">
                  góp cây
                </p>
              </div>
            </a>
          </div>
        </QueryClientProvider>
      </Provider>
    </ConfigProvider>
  );
}

export default MyApp;
