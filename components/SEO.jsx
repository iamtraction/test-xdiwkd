/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import Head from "next/head";

const SEO = ({ title, description }) => {
    const defaultTitle = "Test";
    const defaultDescription = "Some random test.";

    return (
        <Head>
            <title>{ title || defaultTitle }</title>
            <meta name="description" content={ description || defaultDescription } />
        </Head>
    );
};

export default SEO;
