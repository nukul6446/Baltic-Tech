import { useState } from 'react'
import { ArrowUpRight, Menu, X, ChevronDown, ShieldCheck, BrainCircuit, Scaling, Sparkles } from 'lucide-react'

const services = [
  ['01', 'Crypto Exchange Development', 'Powerful cryptocurrency trading platforms with secure matching engines, order books, liquidity integration, and AI-assisted risk monitoring.'],
  ['02', 'Crypto Payment Gateway', 'Seamless cryptocurrency payment integration with multi-coin support, automated settlements, and smart fraud detection.'],
  ['03', 'Blockchain Development', 'Smart contracts and blockchain applications with clean, audit-ready code across leading networks.'],
  ['04', 'Crypto Wallet Development', 'Modern multi-asset wallets with intelligent insights, alerts, and effortless transfers.'],
  ['05', 'Token Development', 'From tokenomics planning to deployment, we help you launch tokens ready for the market.'],
  ['06', 'Web3 & DeFi Solutions', 'Decentralized applications and staking platforms with AI-driven analytics for smarter on-chain decisions.'],
  ['07', 'AI Development & Automation', 'AI agents, predictive models, and workflow automation that unlock smarter business operations.'],
  ['08', 'Custom Software Development', 'Websites, dashboards, APIs, and business tools that connect your crypto products with everyday operations.'],
]

const solutions = [
  ['01', 'For Startups', 'Validate, build, and launch an AI-ready MVP quickly, then scale as you grow.'],
  ['02', 'For Enterprises', 'Integrate blockchain and AI into existing systems to improve transparency and decision-making.'],
  ['03', 'For Crypto Projects', 'Build token ecosystems with wallets, staking, and AI-powered dashboards designed as one ecosystem.'],
  ['04', 'For Digital Businesses', 'Enable crypto payments and Web3 experiences with AI-driven personalization.'],
]

const faqs = [
  ['What services does Baltic Tech offer?', 'We offer crypto exchange development, payment gateways, blockchain and smart contract development, wallets, tokens, Web3, DeFi, AI, and custom software.'],
  ['Do you build AI solutions?', 'Yes. We develop AI agents, chatbots, predictive analytics, automation tools, and AI-powered products from scratch.'],
  ['Can AI be integrated with blockchain products?', 'Absolutely. We combine AI with blockchain for analytics, fraud detection, automation, and intelligent user experiences.'],
  ['Can you build a custom crypto exchange or wallet?', 'Yes. We design and build exchanges and wallets tailored to your business model, features, and branding.'],
  ['How do I get started?', 'Fill in the enquiry form or click Get Started. Our team will get in touch to discuss your idea and recommend the right solution.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [sent, setSent] = useState(false)
  const [contactError, setContactError] = useState('')
  const [isSending, setIsSending] = useState(false)

  return (
    <main>
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 text-white sm:px-10 lg:px-20">
        <a href="#top" className="brand" aria-label="Baltic Tech home"><img className="h-auto w-36 object-contain sm:w-44" src="/brand/baltic-tech-logo.png" alt="Baltic Tech" width="180" height="46" /></a>
        <nav className={`reference-nav absolute left-5 right-5 top-20 flex-col gap-0 rounded-2xl border border-white/15 bg-[#080c24]/95 p-3 backdrop-blur-xl sm:left-auto sm:right-10 sm:top-24 lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none ${menuOpen ? 'flex' : 'hidden'}`}>
          {['Services', 'Solutions', 'About', 'FAQ'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="nav-cta inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3" href="#contact" onClick={() => setMenuOpen(false)}>Start a project <ArrowUpRight size={15} /></a>
        </nav>
        <button className="reference-menu-toggle block border-0 bg-transparent text-white lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero-reference relative isolate min-h-190 overflow-hidden bg-[#030612] px-6 pb-14 pt-36 text-white sm:px-10 lg:min-h-svh lg:px-16 lg:py-32" id="top">
        <div className="hero-reference-glow pointer-events-none absolute -right-32 top-24 -z-10 h-135 w-135 rounded-full bg-blue-600/35 blur-[90px] sm:right-0 lg:h-175 lg:w-175" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)] lg:gap-10">
          <div className="relative z-20 lg:-translate-x-6 lg:pr-12">
            <div className="hero-reference-eyebrow lens-target mb-7 text-[11px] font-bold uppercase tracking-[.22em] text-blue-200 sm:text-sm">BALTIC TECH PVT. LTD. <span className="mx-3 text-white/40">—</span> Your complete crypto & AI technology partner</div>
            <h1 className="hero-reference-title max-w-3xl text-[clamp(3.5rem,6.4vw,6.8rem)] font-semibold leading-[.92] tracking-[-.07em] text-white"><span className="block whitespace-nowrap">Building technology</span><span className="block whitespace-nowrap">for a smarter</span><em className="block whitespace-nowrap text-blue-500 not-italic">crypto future.</em></h1>
            <div className="mt-10 max-w-lg sm:mt-12"><p className="text-base leading-7 text-slate-200 sm:text-lg">Innovative software solutions for the next generation of blockchain and digital finance.</p><div className="mt-7 flex flex-wrap gap-3"><a className="inline-flex items-center gap-4 rounded-full bg-blue-600 px-6 py-4 text-xs font-bold uppercase tracking-[.12em] text-white transition hover:-translate-y-1 hover:bg-blue-500" href="#services">Explore Services <ArrowUpRight size={18} /></a><a className="inline-flex items-center gap-4 rounded-full border border-white/35 px-6 py-4 text-xs font-bold uppercase tracking-[.12em] text-white transition hover:-translate-y-1 hover:bg-white/10" href="#contact">Get Started <ArrowUpRight size={18} /></a></div></div>
          </div>
          <div className="hero-reference-visual relative order-last min-h-72 overflow-hidden lg:absolute lg:inset-y-0 lg:right-[-9%] lg:z-0 lg:min-h-0 lg:w-[56%]">
            <video className="hero-reference-video absolute inset-0 z-0 h-full w-full object-cover opacity-90" autoPlay muted loop playsInline aria-hidden="true" poster="/brand/baltic-tech-logo.png">
              <source src="/Video%20Project%208.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-[#030612]/60 via-transparent to-blue-950/10 lg:bg-linear-to-r lg:from-[#030612] lg:via-[#030612]/20 lg:to-transparent" />
          </div>
          <div className="relative mt-1 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:col-span-2 lg:mt-4 lg:max-w-6xl">
            {[[ShieldCheck, 'Secure by Design'], [BrainCircuit, 'AI-Powered'], [Scaling, 'Scalable Architecture'], [Sparkles, 'Future-Ready']].map(([Icon, label]) => <span className="lens-target flex min-h-18 items-center gap-3 rounded-lg border border-blue-300/25 bg-[#071330]/75 px-3 py-3 text-[11px] font-semibold uppercase leading-tight tracking-[.08em] text-blue-50 backdrop-blur-md sm:px-4 sm:text-xs" key={label}><Icon className="shrink-0 text-blue-500" size={21} />{label}</span>)}
          </div>
        </div>
      </section>

      <section className="section services" id="services"><div className="section-label">02 / SERVICES</div><div className="section-intro"><h2>Complete crypto & AI <span>technology services.</span></h2><p>End-to-end technology services to build, launch, and grow crypto and AI-driven businesses. Every system is designed for security, scale, and the next stage of your ambition.</p></div><div className="service-grid">{services.map(([num, title, desc]) => <article className="service-card" key={num}><span className="card-number">{num}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight className="card-arrow" /></article>)}</div></section>

      <section className="blue-band" id="solutions"><div className="section-label">03 / SOLUTIONS</div><div className="band-content"><h2>Technology for <em>every stage</em> of your business.</h2><p>From startups to established enterprises, every project is shaped around your goals, your users, and your growth plans.</p></div><div className="solution-grid">{solutions.map(([num, title, desc]) => <div className="solution-card" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>

      <section className="section future"><div className="section-label">05 / AI & FUTURE TECH</div><div className="section-intro"><h2>Building intelligent technology for <span>what comes next.</span></h2><p>We combine artificial intelligence, blockchain, and Web3 to create smart, automated, and secure digital products that stay ahead of the market.</p></div><div className="pill-row">{['AI Agents', 'Machine Learning', 'Predictive Analytics', 'Automation', 'AI + Blockchain'].map((pill) => <span key={pill}>{pill}</span>)}</div></section>

      <section className="section about" id="about"><div className="section-label">06 / ABOUT US</div><div className="about-grid"><h2>Powering the next generation of <em>crypto & AI technology.</em></h2><div><p>Baltic Tech Pvt. Ltd. is focused on developing innovative technology for the cryptocurrency, blockchain, and AI industries. We combine software engineering, blockchain development, and artificial intelligence to help businesses create reliable, scalable, and user-friendly digital solutions.</p><p>Our team works closely with every client, from the first idea to launch and beyond, so every product is practical, secure, intelligent, and ready for real users.</p></div></div><div className="vision-row"><div><span>OUR VISION</span><strong>To become a trusted technology partner in the global crypto, blockchain, and AI ecosystem.</strong></div><div><span>OUR MISSION</span><strong>To simplify complex technology and empower businesses through innovative, AI-driven digital solutions.</strong></div></div></section>

      <section className="section faq" id="faq"><div className="section-label">07 / FAQ</div><div className="faq-layout"><h2>Questions, <em>answered.</em></h2><div>{faqs.map(([q, a], i) => <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{q}</span><ChevronDown /></button>{openFaq === i && <p>{a}</p>}</div>)}</div></div></section>

      <section className="contact" id="contact"><div className="section-label">08 / CONTACT US</div><div className="contact-grid"><div><h2>Let&apos;s build your next <em>big idea.</em></h2><p>Have a crypto, blockchain, or AI project in mind? Connect with our team to explore the right solution.</p><div className="steps"><div><b>01</b><span>Share your idea</span></div><div><b>02</b><span>We plan & propose</span></div><div><b>03</b><span>Build & launch</span></div></div></div><form onSubmit={async (e) => {
        e.preventDefault()
        setContactError('')
        setIsSending(true)
        const form = e.currentTarget
        const data = Object.fromEntries(new FormData(form))
        const endpoint = import.meta.env.VITE_CONTACT_API_URL || '/api/contact'

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          const result = await response.json().catch(() => ({}))
          if (!response.ok) throw new Error(result?.error || 'Unable to send your enquiry right now.')
          setSent(true)
          form.reset()
        } catch (error) {
          setContactError(error instanceof Error ? error.message : 'Unable to send your enquiry right now.')
        } finally {
          setIsSending(false)
        }
      }} className="contact-form">{sent ? <div className="success"><span>✓</span><h3>Thanks — we&apos;ll be in touch.</h3><p>Your idea is on its way to the Baltic Tech team.</p></div> : <><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label><label>Full name<input name="name" required maxLength="100" placeholder="Enter full name" /></label><label>Business email<input name="email" required maxLength="160" type="email" placeholder="Enter business email" /></label><label>Company name<input name="company" maxLength="120" placeholder="Enter company name" /></label><label>Project details<textarea name="message" required maxLength="4000" placeholder="Tell us about your project…" rows={4} /></label><button className="submit-btn" type="submit" disabled={isSending}>{isSending ? 'Sending…' : 'Send enquiry'} {!isSending && <ArrowUpRight size={17} />}</button>{contactError && <p className="form-error" role="alert">{contactError}</p>}</>}</form></div></section>

      <section className="get-started" id="get-started"><div className="section-label">09 / GET STARTED</div><div className="get-started-content"><div> <h2>Your Crypto &amp; AI Vision <em>Starts Here</em></h2></div><div><p>Partner with Baltic Tech to build, launch, and scale your next crypto, blockchain, or AI project. Tell us your idea and our team will help turn it into a secure, intelligent, market-ready product.</p><div className="get-started-actions"><a className="button button-primary" href="#contact">Start Your Project <ArrowUpRight size={17} /></a><a className="button button-ghost" href="#contact">Talk to Our Team <ArrowUpRight size={17} /></a></div></div></div></section>

      <footer className="footer"><video className="footer-video" autoPlay muted loop playsInline aria-hidden="true"><source src="/Video%20Project%2010.mp4" type="video/mp4" /></video><div className="footer-top"><div><img src="/brand/baltic-tech-logo.png" alt="Baltic Tech" width="210" height="54" /><p>Building the technology behind the future of crypto & AI.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#services">Services</a><a href="#solutions">Solutions</a><a href="#about">About us</a><a href="#faq">FAQ</a></div><div><span>CONNECT</span><a href="#contact">Start a project</a><a href="#contact">LinkedIn</a><a href="#contact">X / Twitter</a><a href="#contact">GitHub</a></div></div></div><div className="footer-bottom"><span>© 2026 Baltic Tech Pvt. Ltd. All rights reserved.</span><span>Privacy policy &nbsp; / &nbsp; Terms</span><span>Designed with intent.</span></div></footer>
    </main>
  )
}

