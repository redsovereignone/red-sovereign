import { aigdpStyles } from "./styles";

export default function InvestmentGapChart() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aigdpStyles }} />

      {/* Math block */}
      <div className="aigdp-math-block">
        <div className="aigdp-math-row">
          <div className="aigdp-math-label">10% growth means the economy adds</div>
          <div>
            <div className="aigdp-math-value aigdp-white">+$3.1T / year</div>
            <div className="aigdp-math-note">15% growth = +$4.6T / year</div>
          </div>
        </div>
        <div className="aigdp-math-row">
          <div className="aigdp-math-label">But first, fill the consumer spending hole</div>
          <div>
            <div className="aigdp-math-value aigdp-red-text">−$1.1 to $1.5T</div>
          </div>
        </div>
        <div className="aigdp-math-row aigdp-math-row-hl">
          <div className="aigdp-math-label">
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>
              So business investment has to grow by
            </strong>
          </div>
          <div>
            <div className="aigdp-math-value aigdp-red-text">$4.2 – $6.1T</div>
            <div className="aigdp-math-note">Fill the hole + deliver the growth</div>
          </div>
        </div>
      </div>

      {/* Gap bars — heights scaled to ~60% of original */}
      <div className="aigdp-gap-visual">
        <div className="aigdp-gap-bar-wrap">
          <div className="aigdp-gap-bar-label">All Business<br />Investment Today</div>
          <div
            className="aigdp-gap-bar"
            style={{ height: 102, background: "linear-gradient(to top,#f59e0b,rgba(245,158,11,0.35))" }}
          >
            <div className="aigdp-gap-bar-value">~$5.3T<span className="aigdp-sub">entire economy</span></div>
          </div>
        </div>
        <div className="aigdp-gap-bar-wrap">
          <div className="aigdp-gap-bar-label">AI Spending<br />in 2025</div>
          <div
            className="aigdp-gap-bar"
            style={{ height: 30, background: "linear-gradient(to top,#f97316,rgba(249,115,22,0.35))" }}
          >
            <div className="aigdp-gap-bar-value">~$400B<span className="aigdp-sub">AI capex</span></div>
          </div>
        </div>
        <div className="aigdp-gap-vs">vs.</div>
        <div className="aigdp-gap-bar-wrap">
          <div className="aigdp-gap-bar-label">Needed for<br />10% Growth</div>
          <div
            className="aigdp-gap-bar"
            style={{ height: 180, background: "linear-gradient(to top,#e8543e,rgba(232,84,62,0.25))" }}
          >
            <div className="aigdp-gap-bar-value">~$9.5T<span className="aigdp-sub">nearly 2× today</span></div>
          </div>
        </div>
        <div className="aigdp-gap-bar-wrap">
          <div className="aigdp-gap-bar-label">Needed for<br />15% Growth</div>
          <div
            className="aigdp-gap-bar"
            style={{ height: 222, background: "linear-gradient(to top,#dc2626,rgba(220,38,38,0.25))" }}
          >
            <div className="aigdp-gap-bar-value">~$11.4T<span className="aigdp-sub">over 2× today</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
