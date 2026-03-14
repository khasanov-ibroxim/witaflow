const Footer = () => {
    return (
        <footer
            className="py-8 bg-secondary border-t border-border"
            role="contentinfo"
            aria-label="Vitaflow Pharm footer"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground font-body text-sm">
                        © {new Date().getFullYear()} Vitaflow Pharm. Barcha huquqlar himoyalangan.
                    </p>
                    <nav aria-label="Footer navigatsiyasi" className="flex gap-6">
                        <a
                            href="#mahsulot"
                            className="text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                        >
                            Mahsulot
                        </a>
                        <a
                            href="#haqida"
                            className="text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                        >
                            Kompaniya
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;