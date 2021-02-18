/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import { Provider } from "react-redux";

import SEO from "../components/SEO";
import Header from "../components/Header";
import { useStore } from "../state";

import "../css/normalize.css";
import "../css/main.css";

const App = ({ Component, pageProps }) => {
    const store = useStore();

    return (
        <Provider store={ store }>
            <SEO />
            <Header />
            <Component { ...pageProps } />
        </Provider>
    );
};

export default App;
