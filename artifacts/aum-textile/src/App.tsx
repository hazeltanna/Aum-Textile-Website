import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Heart, Menu, X } from "lucide-react";
import editorialGreen from "@assets/aum-images/editorial-green-1.jpg";
import editorialBurgundy from "@assets/aum-images/editorial-2.jpg";
import editorialBlue from "@assets/aum-images/editorial-3.jpg";
import editorialNeutral from "@assets/aum-images/editorial-4.jpg";
import editorialFloral from "@assets/aum-images/editorial-5.jpg";
import catalog01 from "@assets/aum-images/catalog-01.jpg";
import catalog02 from "@assets/aum-images/catalog-02.jpg";
import catalog03 from "@assets/aum-images/catalog-03.jpg";
import catalog04 from "@assets/aum-images/catalog-04.jpg";
import catalog05 from "@assets/aum-images/catalog-05.jpg";
import catalog06 from "@assets/aum-images/catalog-06.jpg";
import catalog07 from "@assets/aum-images/catalog-07.jpg";
import catalog08 from "@assets/aum-images/catalog-08.jpg";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";

const queryClient = new QueryClient();

type Product = {
  id: string;
  name: string;
  note: string;
  image: string;
  category: string;
  tag?: string;
};

const products: Product[] = [
  { id: "01", name: "Meadow Check", note: "Percale · Fern", image: catalog01, category: "Botanical", tag: "New" },
  { id: "02", name: "Meadow Check", note: "Percale · Lilac", image: catalog02, category: "Botanical" },
  { id: "03", name: "Meadow Check", note: "Percale · Pool", image: catalog03, category: "Botanical" },
  { id: "04", name: "Calla Study", note: "Sateen · Shell", image: catalog04, category: "Quiet" },
  { id: "05", name: "Calla Study", note: "Sateen · Ink", image: catalog05, category: "Signature", tag: "Studio edit" },
  { id: "06", name: "Garden Grid", note: "Percale · Parchment", image: catalog06, category: "Hospitality" },
  { id: "07", name: "Calla Study", note: "Sateen · Cobalt", image: catalog07, category: "Signature" },
  { id: "08", name: "Calla Study", note: "Sateen · Rosewood", image: catalog08, category: "Quiet" },
];

const navItems = [
  { label: "The house", href: "#house" },
  { label: "Collections", href: "#collections" },
  { label: "For spaces", href: "#spaces" },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header({ onEnquire }: { onEnquire: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 34);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="topline">Trade appointments · Sample library now open in Mumbai and Delhi</div>
      <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="aum-container nav-inner">
          <a className="brand" href="#top" data-testid="link-home"><span className="brand-mark">ॐ</span><span>Aum Textile</span></a>
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replace(" ", "-")}`}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="nav-enquire" onClick={onEnquire} data-testid="button-nav-enquire">Start a project</button>
            <a href="#footer" data-testid="link-contact">Contact</a>
          </div>
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" data-testid="button-mobile-menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && <div className="mobile-menu">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}>{item.label}</a>)}
          <button className="nav-enquire" onClick={() => { setOpen(false); onEnquire(); }} data-testid="button-mobile-enquire">Start a project</button>
        </div>}
      </header>
    </>
  );
}

function Hero({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div>
            <div className="eyebrow mono">Textiles for staying awhile</div>
            <h1 className="serif">Sleep<br /><em>beautifully.</em></h1>
          </div>
          <div>
            <p className="hero-intro">A considered linen house for hotels, retreats, and rooms with a point of view. Made in India, specified for the world.</p>
            <button className="hero-note" onClick={onEnquire} data-testid="button-hero-enquire"><span>View the house collection</span><ArrowUpRight size={16} /></button>
          </div>
        </div>
        <div className="hero-image"><img src={editorialGreen} alt="Leaf-patterned green bedding in a light-filled room" /></div>
      </div>
      <div className="scroll-cue"><span className="mono">Scroll to explore</span><span className="scroll-line" /></div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto section-pad" id="house">
      <div className="aum-container manifesto-grid">
        <div className="reveal">
          <div className="eyebrow mono">The Aum point of view</div>
          <h2 className="serif">The room<br />starts with<br /><em>the cloth.</em></h2>
        </div>
        <div className="manifesto-copy reveal delay-2">
          <p>Aum is a textile house for places that understand the quiet power of a well-made bed. We work from touch outward: the weight of a sheet, the edge of a hem, the way a print settles into afternoon light.</p>
          <p>Our collections move between the graphic and the botanical, always grounded by generous cloth and a palette that lives comfortably for years.</p>
          <a className="text-link" href="#craft" data-testid="link-our-method">Read our method <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

function Rooms() {
  const cards = [
    { title: "The slow room", sub: "Soft neutrals", image: editorialNeutral },
    { title: "A little drama", sub: "Burgundy / clay", image: editorialBurgundy },
    { title: "Blue hour", sub: "Indigo / chalk", image: editorialBlue },
    { title: "The garden room", sub: "Floral studies", image: editorialFloral },
  ];
  return (
    <section className="rooms" id="spaces">
      <div className="aum-container">
        <div className="rooms-head reveal">
          <div><div className="eyebrow mono">Rooms in feeling</div><h2 className="serif">Make space<br />for <em>feeling.</em></h2></div>
          <p className="rooms-intro">Four moods, one house. Discover the palettes our clients return to, season after season.</p>
        </div>
        <div className="editorial-grid">
          {cards.map((card, index) => (
            <article className={`editorial-card reveal delay-${(index % 3) + 1}`} key={card.title}>
              <img src={card.image} alt={`${card.title} bedding collection`} />
              <div className="editorial-label"><h3>{card.title}</h3><span>{card.sub}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collection({ onOpen }: { onOpen: (product: Product) => void }) {
  const [filter, setFilter] = useState("All pieces");
  const [saved, setSaved] = useState<string[]>([]);
  const filters = ["All pieces", "Signature", "Quiet", "Botanical", "Hospitality"];
  const visibleProducts = useMemo(() => filter === "All pieces" ? products : products.filter((product) => product.category === filter), [filter]);
  const toggleSaved = (id: string) => setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  return (
    <section className="collection section-pad" id="collections">
      <div className="aum-container">
        <div className="collection-head reveal">
          <div><div className="eyebrow mono">The current collection</div><h2 className="serif">Pieces for<br /><em>staying.</em></h2></div>
          <p className="collection-copy">A working library of patterns and solids for guest rooms, private sanctuaries, and everywhere between.</p>
        </div>
        <div className="filters reveal" role="tablist" aria-label="Filter collection">
          {filters.map((item) => <button className={`filter ${filter === item ? "active" : ""}`} key={item} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item} data-testid={`button-filter-${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</button>)}
        </div>
        <div className="product-grid">
          {visibleProducts.length ? visibleProducts.map((product) => (
            <article className="product-card reveal" key={product.id} data-testid={`card-product-${product.id}`}>
              <div className="product-image" role="button" tabIndex={0} onClick={() => onOpen(product)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onOpen(product); }} aria-label={`View ${product.name} ${product.note}`} data-testid={`button-view-product-${product.id}`}>
                <img src={product.image} alt={`${product.name}, ${product.note}`} />
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <button className={`heart ${saved.includes(product.id) ? "saved" : ""}`} onClick={(event) => { event.stopPropagation(); toggleSaved(product.id); }} aria-label={saved.includes(product.id) ? "Remove from saved pieces" : "Save piece"} data-testid={`button-save-product-${product.id}`}><Heart size={15} fill={saved.includes(product.id) ? "currentColor" : "none"} /></button>
              </div>
              <div className="product-meta"><div><h3>{product.name}</h3><p>{product.note}</p></div><span className="product-number">A/{product.id}</span></div>
            </article>
          )) : <div className="empty-filter">No pieces in this edit yet. Try another direction.</div>}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  return (
    <section className="craft section-pad" id="craft">
      <div className="aum-container craft-grid">
        <div className="reveal">
          <div className="eyebrow mono">The craft of comfort</div>
          <h2 className="serif">Good cloth<br />does more<br /><em>than cover.</em></h2>
          <p className="craft-copy">It holds the temperature of a room. It catches the morning. It gives a guest one more reason to stay in bed. We make for that feeling — with honest fibers, considered color, and details that withstand a busy house.</p>
          <div className="craft-list">
            <div><b>01</b><span>Long-staple cotton</span></div>
            <div><b>02</b><span>Colour that softens</span></div>
            <div><b>03</b><span>Built for the wash</span></div>
          </div>
        </div>
        <div className="craft-stamp reveal delay-2" aria-label="Aum Textile established 1998"><span className="stamp-mark">ॐ</span></div>
      </div>
    </section>
  );
}

function Enquiry({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="enquiry" id="enquiry">
      <div className="aum-container enquiry-grid">
        <div className="reveal"><div className="eyebrow mono">For considered spaces</div><h2 className="serif">Let’s make<br /><em>a room.</em></h2></div>
        <div className="reveal delay-2">
          <p className="enquiry-copy">Tell us what you are building, renovating, or quietly rethinking. Our studio can help with specifications, custom colour, and a sample edit made for your space.</p>
          <button className="enquiry-button" onClick={onOpen} data-testid="button-open-enquiry">Begin a project <ArrowUpRight size={16} /></button>
          <div className="contact-index">
            <div><small>Studio hours</small><span>Mon–Fri · 10–18 IST</span></div>
            <div><small>Write to us</small><span>hello@aumtextile.in</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnquiryModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
        <button className="modal-close" onClick={onClose} aria-label="Close enquiry" data-testid="button-close-enquiry"><X size={20} /></button>
        {sent ? <div className="success-state"><div className="success-icon"><Check size={24} /></div><div className="eyebrow mono" style={{ justifyContent: "center" }}>Message received</div><h2 id="enquiry-title">We’ll be in touch.</h2><p>Thank you for sharing a little of what you are making. Our studio will reply within two working days.</p><button className="form-submit" onClick={onClose} data-testid="button-close-success">Back to the house</button></div> :
          <>
            <div className="eyebrow mono">Project enquiry</div><h2 id="enquiry-title">Tell us about<br />the space.</h2><p>For trade, hospitality, and residential projects. A little detail helps us make a better first edit.</p>
            <form onSubmit={submit}>
              <div className="form-grid">
                <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="Name" data-testid="input-enquiry-name" /></div>
                <div className="form-field"><label htmlFor="email">Email</label><input id="email" type="email" name="email" required placeholder="you@email.com" data-testid="input-enquiry-email" /></div>
                <div className="form-field"><label htmlFor="project">Project / studio</label><input id="project" name="project" placeholder="Project name" data-testid="input-enquiry-project" /></div>
                <div className="form-field"><label htmlFor="scope">Project type</label><input id="scope" name="scope" placeholder="Hotel, home, retreat…" data-testid="input-enquiry-type" /></div>
                <div className="form-field full"><label htmlFor="message">A note</label><textarea id="message" name="message" rows={3} placeholder="Tell us what you are looking for…" data-testid="input-enquiry-message" /></div>
              </div>
              <button className="form-submit" type="submit" data-testid="button-submit-enquiry">Send enquiry <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle" }} /></button>
            </form>
          </>}
      </div>
    </div>
  );
}

function ProductLightbox({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
        <button className="modal-close" onClick={onClose} aria-label="Close product" data-testid="button-close-product"><X size={20} /></button>
        <img className="lightbox-image" src={product.image} alt={`${product.name}, ${product.note}`} />
        <div className="lightbox-caption"><div><div className="eyebrow mono">Aum / {product.id}</div><h3 style={{ font: "31px var(--app-font-serif)", margin: "8px 0 0" }}>{product.name}</h3><p style={{ color: "var(--muted)", fontSize: "12px", margin: "4px 0" }}>{product.note}</p></div><button className="text-link" onClick={onClose} data-testid="button-lightbox-close">Close <X size={14} /></button></div>
      </div>
    </div>
  );
}

function Footer() {
  return <footer className="site-footer" id="footer"><div className="aum-container footer-row"><p>© 2024 Aum Textile · A considered linen house</p><div className="footer-links"><a href="#top" data-testid="link-back-top">Back to top ↑</a><a href="mailto:hello@aumtextile.in" data-testid="link-email">Email studio</a></div></div></footer>;
}

function Home() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  useReveal();
  return (
    <div className="aum-page">
      <Header onEnquire={() => setEnquiryOpen(true)} />
      <main>
        <Hero onEnquire={() => setEnquiryOpen(true)} />
        <div className="ticker" aria-label="Aum Textile values"><div className="ticker-track">{Array.from({ length: 2 }).flatMap((_, group) => ["Natural fibres", "Made for hospitality", "Colour with a point of view", "Since 1998"].map((item, index) => <span key={`${group}-${index}`}>{item} <b>·</b></span>))}</div></div>
        <Manifesto />
        <Rooms />
        <Collection onOpen={setProduct} />
        <Craft />
        <section className="quote"><div className="reveal"><blockquote>“The best rooms do not announce themselves. They leave something soft behind.”</blockquote><cite>— Aum studio notes, volume 01</cite></div></section>
        <Enquiry onOpen={() => setEnquiryOpen(true)} />
      </main>
      <Footer />
      {enquiryOpen && <EnquiryModal onClose={() => setEnquiryOpen(false)} />}
      {product && <ProductLightbox product={product} onClose={() => setProduct(null)} />}
    </div>
  );
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;