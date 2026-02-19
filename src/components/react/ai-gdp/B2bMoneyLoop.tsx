import { aigdpStyles } from "./styles";

export default function B2bMoneyLoop() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aigdpStyles }} />
      <div className="aigdp-layers-container">
        {/* B2B Loop */}
        <div className="aigdp-b2b-loop">
          <div className="aigdp-b2b-loop-label">The AI Money Loop (B2B)</div>
          <div className="aigdp-b2b-loop-inner">
            <div className="aigdp-b2b-node" style={{ background: "rgba(245,158,11,0.06)" }}>
              <div className="aigdp-b2b-node-title" style={{ color: "#f59e0b" }}>Companies Buy AI</div>
              <div className="aigdp-b2b-node-desc">Businesses spend on chips, data centers, AI tools</div>
            </div>
            <div className="aigdp-b2b-arrow">→</div>
            <div className="aigdp-b2b-node" style={{ background: "rgba(168,85,247,0.06)" }}>
              <div className="aigdp-b2b-node-title" style={{ color: "#a855f7" }}>AI Gets Sold Back</div>
              <div className="aigdp-b2b-node-desc">AI services sold to the same companies and their customers</div>
            </div>
            <div className="aigdp-b2b-arrow">→</div>
            <div className="aigdp-b2b-node" style={{ background: "rgba(232,84,62,0.06)" }}>
              <div className="aigdp-b2b-node-title" style={{ color: "#e8543e" }}>Savings Fund More AI</div>
              <div className="aigdp-b2b-node-desc">Companies cut workers, spend the savings on more AI</div>
            </div>
            <div className="aigdp-b2b-arrow" style={{ fontSize: 18, color: "rgba(168,85,247,0.3)" }}>⟳</div>
          </div>
        </div>

        {/* Disconnect divider */}
        <div className="aigdp-disconnect">
          <div className="aigdp-disconnect-line" />
          <div className="aigdp-disconnect-label">Disconnected ↕</div>
          <div className="aigdp-disconnect-line" />
        </div>

        {/* Consumer layer */}
        <div className="aigdp-consumer-layer">
          <div className="aigdp-consumer-layer-label">The Real Economy (Consumers)</div>
          <div className="aigdp-consumer-icon">👤📉</div>
          <div>
            <div className="aigdp-consumer-text">
              The people who power <strong>68% of GDP</strong> are losing jobs, spending
              less, and getting cut out of the loop above. The AI boom doesn't need them,
              but the economy does.
            </div>
            <div className="aigdp-consumer-stat">
              In early 2025, consumer spending's contribution to GDP growth fell by more
              than half. A temporary AI construction boom masked the decline. But you can
              only build the data centers once.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
