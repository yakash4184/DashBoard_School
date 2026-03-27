import { useEffect, useMemo, useState } from 'react'
import backBuilding from './assets/back-building.jpg'
import bizedifyLogo from './assets/bizedify-logo.png'
import frontBuilding from './assets/front-building.png'
import logo from './assets/logo.png'
import {
  actionCards,
  bookListEntries,
  certificateModules,
  designModules,
  schoolLinks,
  statCards,
} from './data/dashboardData'

const classes = ['All Classes', ...bookListEntries.map((item) => item.className)]
const sessions = ['All Sessions', ...new Set(bookListEntries.map((item) => item.session))]

function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(date)
}

function formatTime(date) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(date)
}

function ResourceCard({ title, description, label, href, badge, accent, meta }) {
  return (
    <article className={`resource-card accent-${accent}`}>
      <div className="resource-topline">
        <span className="resource-badge">{badge || meta || 'School Resource'}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a className="button-link" href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    </article>
  )
}

function App() {
  const [now, setNow] = useState(() => new Date())
  const [selectedClass, setSelectedClass] = useState('All Classes')
  const [selectedSession, setSelectedSession] = useState('2026-27')

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const filteredBooks = useMemo(() => {
    return bookListEntries.filter((entry) => {
      const matchesClass = selectedClass === 'All Classes' || entry.className === selectedClass
      const matchesSession =
        selectedSession === 'All Sessions' || entry.session === selectedSession
      return matchesClass && matchesSession
    })
  }, [selectedClass, selectedSession])

  const featuredBook = filteredBooks[0] ?? bookListEntries[0]

  return (
    <div className="dashboard-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-logo">
            <img src={logo} alt="Savitri Balika Inter College logo" />
          </div>
          <div>
            <p className="eyebrow">School Admin Dashboard</p>
            <h1>Savitri Balika Inter College</h1>
            <p className="subline">Jamunahiya, Mirzapur</p>
          </div>
        </div>

        <div className="live-clock-card">
          <span className="live-pill">Live</span>
          <strong>{formatTime(now)}</strong>
          <span>{formatDate(now)}</span>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="section-kicker">Welcome Note</p>
            <h2 className="hero-title">
              <span className="hero-title-top">Welcome to</span>
              <span className="hero-title-bottom">Dashboard of Savitri School</span>
            </h2>
            <p className="hero-text">
              This dashboard brings together the live admission URLs, uploaded class book lists,
              school brochure, voice message template, and campaign resources in one modern admin
              front page.
            </p>

            <div className="stat-grid">
              {statCards.map((stat) => (
                <article key={stat.label} className={`stat-card tone-${stat.tone}`}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>

            <div className="hero-links">
              <a className="button-link primary" href="#books-panel">
                Open book filters
              </a>
              <a
                className="button-link secondary"
                href="https://savitribalikaintercollege.in/"
                target="_blank"
                rel="noreferrer"
              >
                View brochure
              </a>
            </div>
          </div>

          <div className="hero-visuals">
            <article className="image-card image-front">
              <img src={frontBuilding} alt="Front building of the school" />
              <div className="image-label">
                <span>Front Building</span>
              </div>
            </article>

            <article className="image-card image-back">
              <img src={backBuilding} alt="Back building and campus of the school" />
              <div className="image-label">
                <span>Back Building & Campus</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <div>
              <p className="section-kicker">Admission URLs</p>
              <h2>Website and class-wise admission portals</h2>
            </div>
          </div>

          <div className="resource-grid three-col">
            {schoolLinks.map((link) => (
              <ResourceCard key={link.title} {...link} />
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <div>
              <p className="section-kicker">Admin Resources</p>
              <h2>Admission, brochure, poster, and voice sections</h2>
            </div>
          </div>

          <div className="resource-grid">
            {actionCards.map((card) => (
              <ResourceCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section id="books-panel" className="section-block books-section">
          <div className="section-header">
            <div>
              <p className="section-kicker">Book List</p>
              <h2>Filter class book list by class and session</h2>
            </div>
            <div className="filter-row">
              <label>
                <span>Book for class:</span>
                <select value={selectedClass} onChange={(event) => setSelectedClass(event.target.value)}>
                  {classes.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Session:</span>
                <select
                  value={selectedSession}
                  onChange={(event) => setSelectedSession(event.target.value)}
                >
                  {sessions.map((session) => (
                    <option key={session} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="books-layout">
            <div className="book-results">
              {filteredBooks.map((entry) => (
                <article key={`${entry.className}-${entry.session}`} className="book-card">
                  <div>
                    <span className="book-session">{entry.session}</span>
                    <h3>{entry.className}</h3>
                  </div>
                  <a href={entry.href} target="_blank" rel="noreferrer" className="button-link">
                    Open book list
                  </a>
                </article>
              ))}
            </div>

            <article className="preview-panel">
              <div className="preview-header">
                <div>
                  <p className="preview-kicker">Preview</p>
                  <h3>{featuredBook.className}</h3>
                </div>
                <a href={featuredBook.href} target="_blank" rel="noreferrer" className="button-link secondary">
                  Open full page
                </a>
              </div>

              <iframe
                title={`${featuredBook.className} book list preview`}
                src={featuredBook.href}
                className="book-preview"
              />
            </article>
          </div>
        </section>

        <section className="dual-grid">
          <article className="info-panel">
            <div className="section-header compact">
              <div>
                <p className="section-kicker">Certificates Issued</p>
                <h2>Office-ready issue sections</h2>
              </div>
            </div>

            <div className="stack-list">
              {certificateModules.map((item) => (
                <div key={item.title} className="stack-item">
                  {item.previewSrc ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="certificate-preview-link">
                      <img
                        src={item.previewSrc}
                        alt={item.title}
                        className="certificate-preview-image"
                      />
                    </a>
                  ) : null}
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="button-link secondary stack-link">
                      {item.label || 'Open'}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </article>

          <article className="info-panel">
            <div className="section-header compact">
              <div>
                <p className="section-kicker">All Design</p>
                <h2>Creative kit inside dashboard</h2>
              </div>
            </div>

            <div className="design-list">
              {designModules.map((item) => (
                <div key={item} className="design-chip">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className="dashboard-footer">
          <div className="footer-brand">
            <img src={bizedifyLogo} alt="BizEdify Technologies logo" className="footer-logo" />
            <p className="footer-kicker">Powered By</p>
            <h2>BizEdify</h2>
            <p className="footer-copy">
              Digital-first school growth support for branding, admissions, campaign creatives,
              and modern education dashboards.
            </p>
          </div>

          <div className="footer-details">
            <div className="footer-card">
              <span className="footer-label">Founder</span>
              <strong>Akash Yadav</strong>
            </div>
            <div className="footer-card">
              <span className="footer-label">Contact</span>
              <a href="tel:8299388507">8299388507</a>
            </div>
            <div className="footer-card">
              <span className="footer-label">Focus</span>
              <strong>School Web, Branding & Digital Marketing</strong>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
