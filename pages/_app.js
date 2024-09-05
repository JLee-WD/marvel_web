import '../src/app/globals.css';
import { ComicProvider } from '../src/context/ComicContext';

function MyApp({ Component, pageProps }) {
  return (
    <ComicProvider>
      <Component {...pageProps} />
    </ComicProvider>
    )
}

export default MyApp;