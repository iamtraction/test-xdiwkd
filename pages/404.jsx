/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import SEO from "../components/SEO";

const NotFoundPage = () => (
    <>
        <SEO
            title="Error 404"
            description="Page Not Found"
        />

        <div style={{ margin: 25 }}>
            <h1>Error 404</h1>
            <p>Page Not Found</p>
        </div>
    </>
);

export default NotFoundPage;
