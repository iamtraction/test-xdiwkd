/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import Link from "next/link";

const HeaderLink = ({ name, link }) => (
    <Link href={ link ?? ("/" + name.toLowerCase()) }>
        <a style={{
            padding: 15,
            color: typeof window !== "undefined" && window.location.pathname === (link ?? ("/" + name.toLowerCase())) ? "orangered" : "gray"
        }}>
            { name }
        </a>
    </Link>
);

const Header = () => (
    <div style={{
        marginBottom: 10,
        borderBottom: "3px solid #202020",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#101010",
    }}>
        <HeaderLink name="Home" link="/" />
        <HeaderLink name="Forms" />
        <HeaderLink name="Records" />
    </div>
);

export default Header;
