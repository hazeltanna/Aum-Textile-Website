import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Download, Menu, X } from "lucide-react";
import editorialGreen from "@assets/aum-images/editorial-green-1.jpg";
import editorialBurgundy from "@assets/aum-images/editorial-2.jpg";
import editorialBlue from "@assets/aum-images/editorial-3.jpg";
import catalog01 from "@assets/aum-images/catalog-01.jpg";
import catalog02 from "@assets/aum-images/catalog-02.jpg";
import catalog03 from "@assets/aum-images/catalog-03.jpg";
import catalog04 from "@assets/aum-images/catalog-04.jpg";
import catalog05 from "@assets/aum-images/catalog-05.jpg";
import catalog06 from "@assets/aum-images/catalog-06.jpg";
import catalog07 from "@assets/aum-images/catalog-07.jpg";

type CollectionName = "All Collections" | "Hospitality Bedding" | "Healthcare & Suites" | "Table Linen & Bath";
type Product = {
  id: string;
  name: string;
  category: Exclude<CollectionName, "All Collections">;
  image: string;
  composition: string;
  weave: string;
  swatches: string[];
  detail: string;
};

const products: Product[] = [
  { id: "01", name: "Meadow Grid", category: "Hospitality Bedding", image: catalog01, composition: "100% Pure Cotton", weave: "Percale", swatches: ["#b8c5a9", "#d2b6a7", "#f3efe6"], detail: "A calm botanical grid designed for repeatable hotel-room schemes." },
  { id: "02", name: "Calla Lily", category: "Hospitality Bedding", image: catalog02, composition: "100% Pure Cotton", weave: "Sateen", swatches: ["#c6b4c7", "#ded8d2", "#b9c9ca"], detail: "A floral study with a soft hand and a composed, residential feel." },
  { id: "03", name: "Garden Bloom", category: "Healthcare & Suites", image: catalog03, composition: "Premium Cotton Fibre", weave: "Percale", swatches: ["#d5e4e4", "#b8c9c0", "#f8f5ed"], detail: "A light botanical pattern for suites and patient rooms that need warmth without visual noise." },
  { id: "04", name: "Royal Damask", category: "Table Linen & Bath", image: catalog04, composition: "100% Pure Cotton", weave: "Sateen", swatches: ["#e8e1d7", "#cac4bb", "#b0aaa0"], detail: "A refined damask ground for dining, lounge, and bath applications." },
  { id: "05", name: "Botanical Scatter", category: "Hospitality Bedding", image: catalog05, composition: "100% Pure Cotton", weave: "Percale", swatches: ["#e9e1d5", "#b7bab1", "#8f9c99"], detail: "An expressive botanical print with a generous, easy-to-specify repeat." },
  { id: "06", name: "Cypress Heritage", category: "Healthcare & Suites", image: catalog06, composition: "Premium Cotton Fibre", weave: "Sateen", swatches: ["#d9e0d7", "#eee9df", "#c2cec5"], detail: "A considered heritage pattern for high-use rooms and residential suites." },
  { id: "07", name: "Classic Plaid", category: "Table Linen & Bath", image: catalog07, composition: "100% Pure Cotton", weave: "Percale", swatches: ["#b9d0ca", "#f1eee8", "#a7b7b5"], detail: "A disciplined plaid that moves easily between table, bath, and bedroom." },
];

const navItems = [
  { label: "Collections", href: "#collections" },
  { label: "The mill", href: "#advantage" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header({ onCatalogue }: { onCatalogue: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="business-header">
      <div className="header-inner shell">
        <a href="#top" className="business-brand" data-testid="link-home"><span>Aum Textile</span><small>Trade / Export</small></a>
        <nav className="business-nav" aria-label="Main navigation">
          {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <button className="catalogue-button" onClick={onCatalogue} data-testid="button-request-catalogue">Request catalogue <ArrowUpRight size={15} /></button>
        <button className="business-menu" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {open && <div className="mobile-business-nav">
        {navItems.map((item) => <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <button className="catalogue-button" onClick={() => { setOpen(false); onCatalogue(); }}>Request catalogue <ArrowUpRight size={15} /></button>
      </div>}
    </header>
  );
}

function Hero({ onCatalogue }: { onCatalogue: () => void }) {
  return <section className="business-hero" id="top">
    <div className="hero-business-grid shell">
      <div className="hero-business-copy">
        <p className="eyebrow">Institutional linen / Mumbai</p>
        <h1>Textiles for spaces with <i>standards.</i></h1>
        <p className="hero-tagline">Premium institutional and export bed, bath and table linen for hotels, hospitals, resorts and trade buyers.</p>
        <div className="hero-actions">
          <a className="solid-button" href="#collections">View collections <ArrowDownRight size={15} /></a>
          <button className="quiet-button" onClick={onCatalogue}>Speak to Aum Textile <ArrowUpRight size={15} /></button>
        </div>
        <div className="hero-note"><span>01</span><p>Direct access to considered textiles and practical specifications for commercial spaces.</p></div>
      </div>
      <div className="hero-business-image">
        <img src={editorialGreen} alt="Green botanical hotel bedding in a styled room" />
        <div className="image-caption"><span>Reference / Meadow Grid</span><span>01 — 05</span></div>
      </div>
    </div>
  </section>;
}

function ClientMarquee() {
  const clients = ["Taj Hotels", "Oberoi Group", "Apollo Hospitals", "Fortis Healthcare", "Lemon Tree Hotels"];
  return <section className="client-marquee" id="clients" aria-label="Key institutional clients"><div className="marquee-track">{[...clients, ...clients].map((client, index) => <span key={`${client}-${index}`}>{client}<b>—</b></span>)}</div></section>;
}

function BusinessIntro() {
  return <section className="business-intro section-business" data-reveal>
    <div className="shell intro-grid">
      <div><p className="eyebrow">A working supplier</p><h2>Designed for the<br />demands of <i>use.</i></h2></div>
      <div className="intro-copy"><p>Aum Textile is a heritage textile manufacturer providing premium linens to 5-star hotels, luxury resorts, hospital suites, and export clients.</p><p>We pair considered design with the practical requirements of institutional supply: dependable fibres, flexible specifications, and factory-direct wholesale value.</p><div className="intro-rule"><span>20+</span><small>Years of mill experience</small><span>500+</span><small>Active designs</small></div></div>
    </div>
  </section>;
}

function CollectionCard({ product, onSpec, onEnquire }: { product: Product; onSpec: (product: Product) => void; onEnquire: (product: Product) => void }) {
  return <article className="business-product" data-reveal>
    <button className="product-visual" onClick={() => onSpec(product)} aria-label={`View ${product.name} quick spec sheet`} data-testid={`button-spec-${product.id}`}>
      <img src={product.image} alt={`${product.name} ${product.category} textile`} />
      <span className="image-index">{product.id}</span>
      <span className="zoom-hint">Open specification <ArrowUpRight size={14} /></span>
    </button>
    <div className="product-info">
      <div><p className="product-category">{product.category}</p><h3>{product.name}</h3><p className="product-spec">{product.composition} <span>·</span> {product.weave}</p></div>
      <div className="swatches" aria-label={`${product.name} available colour swatches`}>{product.swatches.map((swatch) => <span style={{ background: swatch }} key={swatch} />)}</div>
    </div>
    <div className="product-actions"><button onClick={() => onSpec(product)} data-testid={`button-quick-spec-${product.id}`}>Quick spec sheet <Download size={14} /></button><button onClick={() => onEnquire(product)} data-testid={`button-bulk-order-${product.id}`}>Bulk order enquiry <ArrowUpRight size={14} /></button></div>
  </article>;
}

function Collections({ onSpec, onEnquire }: { onSpec: (product: Product) => void; onEnquire: (product: Product) => void }) {
  const [active, setActive] = useState<CollectionName>("All Collections");
  const filters: CollectionName[] = ["All Collections", "Hospitality Bedding", "Healthcare & Suites", "Table Linen & Bath"];
  const visible = useMemo(() => active === "All Collections" ? products : products.filter((product) => product.category === active), [active]);
  return <section className="collections section-business" id="collections">
    <div className="shell">
      <div className="section-heading" data-reveal><div><p className="eyebrow">The design library</p><h2>A considered<br /><i>working selection.</i></h2></div><p>Explore a working selection from 500+ active designs across hospitality, healthcare, bath and table.</p></div>
      <div className="collection-tabs" role="tablist" aria-label="Filter product collections">{filters.map((filter) => <button key={filter} onClick={() => setActive(filter)} className={active === filter ? "active" : ""} role="tab" aria-selected={active === filter}>{filter}</button>)}</div>
      <div className="business-product-grid">{visible.map((product) => <CollectionCard product={product} key={product.id} onSpec={onSpec} onEnquire={onEnquire} />)}</div>
    </div>
  </section>;
}

function MaterialStory() {
  return <section className="material-story section-business">
    <div className="shell material-grid">
      <div className="material-images" data-reveal><img className="material-main" src={editorialBurgundy} alt="Burgundy and natural hotel bedding textile" /><img className="material-inset" src={editorialBlue} alt="Blue floral textile reference" /><span className="image-caption">Material references / 02—03</span></div>
      <div className="material-copy" data-reveal><p className="eyebrow">A tactile point of view</p><h2>Quietly distinctive.<br /><i>Easy to specify.</i></h2><p>Our design language moves between botanical studies, disciplined grids and heritage motifs. The point is not novelty for its own sake. It is a room that feels resolved, and a specification that can be repeated.</p><a className="text-link" href="#advantage">See the mill advantage <ArrowUpRight size={15} /></a></div>
    </div>
  </section>;
}

function Advantage() {
  const pillars = [["01", "100% Pure Cotton & Premium Fibres"], ["02", "Mill-Direct Wholesale Value"], ["03", "Custom Sizes & Dyes"], ["04", "Export Ready"], ["05", "500+ Active Designs"]];
  return <section className="advantage section-business" id="advantage">
    <div className="shell advantage-grid">
      <div data-reveal><p className="eyebrow light">The mill advantage</p><h2>Supply with<br /><i>confidence.</i></h2><p className="advantage-copy">The practical difference is direct access: fewer layers between the mill and your specification, with room for custom requirements and export-ready fulfilment.</p></div>
      <div className="advantage-list" data-reveal>{pillars.map(([number, text]) => <div key={number}><span>{number}</span><strong>{text}</strong><ChevronRight size={17} /></div>)}</div>
    </div>
  </section>;
}

function ContactSection({ onCatalogue }: { onCatalogue: () => void }) {
  return <section className="contact-section section-business" id="contact">
    <div className="shell contact-heading" data-reveal><p className="eyebrow">Wholesale & export enquiries</p><h2>Start with a clear<br /><i>requirement.</i></h2></div>
    <div className="shell contact-grid">
      <div className="contact-details" data-reveal><p>For hotel managers, hospital procurement teams, exporters, and design professionals.</p><dl>
        <div><dt>Visit</dt><dd>Shanti Khana Chowl, 326, Mangaldas Market,<br />Marine Lines East, Chirabazar, Kalbadevi,<br />Mumbai, Maharashtra 400002</dd></div>
        <div><dt>Call / WhatsApp</dt><dd><a href="tel:9820781007">9820781007</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:aumtanna25@gmail.com">aumtanna25@gmail.com</a></dd></div>
      </dl></div>
      <button className="contact-cta" onClick={onCatalogue} data-testid="button-contact-enquiry"><span>Request a complete catalogue</span><ArrowUpRight size={22} /></button>
    </div>
  </section>;
}

function Footer() {
  return <footer className="business-footer"><div className="shell footer-grid"><div><a href="#top" className="footer-brand">Aum Textile</a><p>Premium institutional and export bed, bath and table linen.</p></div><div><p className="footer-label">Navigate</p><a href="#collections">Collections</a><a href="#advantage">The mill advantage</a><a href="#clients">Client portfolio</a><a href="#contact">Contact</a></div><div><p className="footer-label">Contact</p><a href="tel:9820781007">9820781007</a><a href="mailto:aumtanna25@gmail.com">aumtanna25@gmail.com</a></div></div><div className="shell footer-bottom"><span>© 2026 Aum Textile</span><span>Institutional linen / export supply</span></div></footer>;
}

function EnquiryDrawer({ onClose, selectedProduct }: { onClose: () => void; selectedProduct?: Product | null }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <aside className="enquiry-drawer" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <button className="drawer-close" onClick={onClose} aria-label="Close enquiry"><X size={20} /></button>
      {sent ? <div className="drawer-success"><div className="success-icon"><Check size={24} /></div><p className="eyebrow">Enquiry prepared</p><h2 id="enquiry-title">Thank you.</h2><p>Your wholesale enquiry has been recorded in this preview. We look forward to learning more about your requirement.</p><button className="solid-button" onClick={onClose}>Close <ChevronRight size={15} /></button></div> : <>
        <p className="eyebrow">B2B enquiry</p><h2 id="enquiry-title">Request a<br /><i>complete catalogue.</i></h2><p className="drawer-intro">Share your requirements and our team can prepare the right design and specification direction for your project.</p>
        {selectedProduct && <div className="selected-product">Enquiring about <strong>{selectedProduct.name}</strong></div>}
        <form onSubmit={submit} className="business-form">
          <label>Full name<input name="fullName" required placeholder="Full name" data-testid="input-full-name" /></label>
          <label>Organization / hotel name<input name="organization" required placeholder="Organization or hotel" data-testid="input-organization" /></label>
          <div className="form-two"><label>Corporate email<input name="email" type="email" required placeholder="name@company.com" data-testid="input-email" /></label><label>Phone number<input name="phone" type="tel" required placeholder="+91" data-testid="input-phone" /></label></div>
          <div className="form-two"><label>Product category<select name="category" defaultValue={selectedProduct?.category ?? ""} required data-testid="select-category"><option value="" disabled>Select a category</option><option>Hospitality Bedding</option><option>Healthcare &amp; Suites</option><option>Table Linen &amp; Bath</option></select></label><label>Estimated volume<input name="volume" placeholder="Rooms, pieces, or metres" data-testid="input-volume" /></label></div>
          <label>Message<textarea name="message" rows={4} placeholder="Tell us about the requirement" data-testid="input-message" /></label>
          <button className="solid-button form-send" type="submit" data-testid="button-send-enquiry">Send enquiry <ArrowUpRight size={15} /></button>
        </form>
      </>}
    </aside>
  </div>;
}

function SpecSheet({ product, onClose, onEnquire }: { product: Product; onClose: () => void; onEnquire: (product: Product) => void }) {
  return <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <aside className="spec-sheet" role="dialog" aria-modal="true" aria-labelledby="spec-title"><button className="drawer-close" onClick={onClose} aria-label="Close spec sheet"><X size={20} /></button><img src={product.image} alt={`${product.name} specification reference`} /><div className="spec-content"><p className="eyebrow">{product.category}</p><h2 id="spec-title">{product.name}</h2><p>{product.detail}</p><div className="spec-table"><div><span>Composition</span><strong>{product.composition}</strong></div><div><span>Weave</span><strong>{product.weave}</strong></div><div><span>Commercial</span><strong>Factory-direct wholesale rates</strong></div></div><div className="spec-swatch-row"><span>Colour direction</span>{product.swatches.map((swatch) => <i style={{ background: swatch }} key={swatch} />)}</div><button className="solid-button" onClick={() => onEnquire(product)}>Enquire for bulk order <ArrowUpRight size={15} /></button></div></aside>
  </div>;
}

export default function B2BHome() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [specProduct, setSpecProduct] = useState<Product | null>(null);
  useReveal();
  const openEnquiry = (product?: Product) => { setSpecProduct(null); setSelectedProduct(product ?? null); setEnquiryOpen(true); };
  return <div className="business-page">
    <Header onCatalogue={() => openEnquiry()} />
    <main><Hero onCatalogue={() => openEnquiry()} /><ClientMarquee /><BusinessIntro /><Collections onSpec={setSpecProduct} onEnquire={openEnquiry} /><MaterialStory /><Advantage /><ContactSection onCatalogue={() => openEnquiry()} /></main>
    <Footer />
    {enquiryOpen && <EnquiryDrawer onClose={() => setEnquiryOpen(false)} selectedProduct={selectedProduct} />}
    {specProduct && <SpecSheet product={specProduct} onClose={() => setSpecProduct(null)} onEnquire={openEnquiry} />}
  </div>;
}