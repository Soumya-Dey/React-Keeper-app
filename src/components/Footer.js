import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer">
            <p>
                &copy; {currentYear} | Made with{" "}
                <span role="img" aria-label="love-icon">
                    ❤️
                </span>{" "}
                by{" "}
                <a
                    href="https://github.com/Soumya-Dey"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Soumya Dey
                </a>
            </p>
        </div>
    );
};

export default Footer;
