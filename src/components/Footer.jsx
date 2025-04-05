import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>RefugeID</h3>
            <p>Empowering the stateless with identity, trust, and financial freedom through blockchain technology.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="social-link">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#" className="footer-link">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Developer API
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} RefugeID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

