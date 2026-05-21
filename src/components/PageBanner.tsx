interface PageBannerProps {
  title: string;
  subtitle?: string;
}

const PageBanner = ({ title, subtitle }: PageBannerProps) => (
  <section className="bg-navy text-white py-14 md:py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/40 to-transparent" />
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/8 -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/5 translate-y-1/2 -translate-x-1/2" />
    <div className="container relative z-10">
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-2">{title}</h1>
      {subtitle && <p className="text-white/50 text-lg">{subtitle}</p>}
      <div className="section-divider mt-4" />
    </div>
  </section>
);

export default PageBanner;
