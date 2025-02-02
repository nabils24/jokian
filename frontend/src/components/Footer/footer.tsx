const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full footer footer-center bg-pink-500 p-4 text-white">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Naffie's Restaurant</p>
            </aside>
        </footer>
    );
};

export default Footer;