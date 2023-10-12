import { ConfigProvider } from 'antd';
import vie from 'antd/lib/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import BackToTop from 'src/components/BackToTop';
import { createGlobalStyle } from 'styled-components';
import '../styles/globals.css';
import '../styles/_app.scss';

const GlobalStyles = createGlobalStyle`
  html,body {
    margin: 0;
    /* position: relative; */
    /* overflow-x: hidden; */
    height: 100%;
  }

`;
moment.locale('vi');

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const TRACKING_ID = 'UA-248695486-2';
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  ReactGA.initialize(TRACKING_ID);
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-WSCNHD4' });
  }, []);

  return (
    <ConfigProvider locale={vie}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
            {getLayout(<Component {...pageProps} />)}
          <BackToTop />
        </QueryClientProvider>
      </Provider>
    </ConfigProvider>
  );
}

export default MyApp;
