import '../src/styles/globals.css';
import { ComicProvider } from '../src/context/ComicContext';
import ReadingList from '../src/components/ReadingList';

function MyApp({ Component, pageProps }) {
  return (
    <ComicProvider>
      <Component {...pageProps} />
    </ComicProvider>
    )
}

export default MyApp;