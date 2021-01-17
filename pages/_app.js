import { Provider } from "react-redux";
import { initStore } from "../store";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const store = initStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
