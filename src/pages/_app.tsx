import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import type { AppProps } from 'next/app'
import Page from '../layout/Page/Page';

function MyApp({ Component, pageProps }: AppProps) {
    return <ThemeProvider theme={theme}>
        <Page>
            <Component {...pageProps} />
        </Page>
    </ThemeProvider>
}

export default MyApp
