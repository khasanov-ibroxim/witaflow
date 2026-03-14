const Footer = () => {
  return (
    <footer className="py-8 bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-muted-foreground font-body text-sm">
          © {new Date().getFullYear()} Vitaflow Pharm. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
