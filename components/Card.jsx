/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

const Card = ({ name, description, selected, clickHandler, deleteHandler }) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            padding: "15px 20px",
            backgroundColor: "#222",
            color: selected ? "orangered" : "inherit",
            cursor: "pointer",
            ":hover": {
                backgroundColor: "#333",
            },
        }}
        onClick={ () => clickHandler() }
    >
        <div>
            <div>{ name }</div>
            <div style={{ color: "gray" }}>{ description }</div>
        </div>
        {
            deleteHandler && (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={e => {
                        e.stopPropagation();
                        deleteHandler();
                    }}
                >
                    ✖️
                </span>
            )
        }
    </div>
);

export default Card;
