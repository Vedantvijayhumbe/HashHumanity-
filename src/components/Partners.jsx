import "./Partners.css"

function Partners() {
  const partners = [
    { name: "UNHCR", type: "organization" },
    { name: "Chainlink", type: "tech" },
    { name: "Polygon ID", type: "tech" },
    { name: "Aave", type: "tech" },
    { name: "Worldcoin", type: "tech" },
    { name: "Doctors Without Borders", type: "organization" },
  ]

  const technologies = ["Ethereum", "IPFS", "ZK-SNARKs", "USDC", "Soulbound NFTs"]

  return (
    <section id="partners" className="partners-section">
      <div className="partners-container">
        <h2 className="partners-heading">Partners & Tech Stack</h2>

        <div className="partners-grid-section">
          <h3 className="section-title">Our Partners</h3>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="partner-item">
                <div className="logo-container">
                  <div className="logo-placeholder">
                    <span className="logo-text">{partner.name}</span>
                  </div>
                </div>
                <span className="partner-type">
                  {partner.type === "organization" ? "Organization" : "Technology Partner"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="tech-section">
          <h3 className="section-title">Technology Stack</h3>
          <div className="tech-container">
            {technologies.map((tech, index) => (
              <div key={index} className="tech-badge">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners

