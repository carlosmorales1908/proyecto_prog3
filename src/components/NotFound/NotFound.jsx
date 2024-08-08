import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column bg-secondary bg-gradient vh-100">
                <img src="/assets/404.png" alt="image-404" />
                <h1>PAGE NOT FOUND</h1>
                <div className="mt-3 text-center">
                    <Link to={"/"}>
                        <button className="btn btn-primary">
                            Volver al inicio
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
