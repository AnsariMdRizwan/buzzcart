import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center text-sm">
            <p>
                © {new Date().getFullYear()} All Rights Reserved |
                <a href="/terms" className="hover:underline mx-1">Terms of Use</a> and
                <a href="/privacy" className="hover:underline mx-1">Privacy Policy</a>
            </p>
            <p className="mt-1">Made with ❤️ by <span className="font-semibold">MD Rizwan</span></p>
        </footer>
    );
};

export default Footer;
