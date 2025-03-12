import { TranslationProvider } from './lib/translation';
import MainPage from './page/index';

export default function Home() {
  return (
    <div>
      <TranslationProvider>
        <MainPage />
      </TranslationProvider>
    </div>
  );
}
