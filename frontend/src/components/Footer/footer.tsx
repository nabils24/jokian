const footer = () => {
    const websiteName = process.env.REACT_APP_WEBSITE_NAME;
    return (
        <footer className="footer footer-center bg-pink-500 p-4 text-white">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by {websiteName}</p>
            </aside>
        </footer>
    );
};

export default footer;