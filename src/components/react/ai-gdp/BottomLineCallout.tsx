import { aigdpStyles } from "./styles";

export default function BottomLineCallout() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aigdpStyles }} />
      <div className="aigdp-punchline">
        <div className="aigdp-punchline-glow" />
        <div className="aigdp-punch-label">The Bottom Line</div>
        <div className="aigdp-punch-text">
          To deliver 10–15% growth, AI needs to create{" "}
          <span className="aigdp-num">$4.5–6 trillion</span> in new activity every year.
          Today the entire global AI industry makes about{" "}
          <span className="aigdp-num">$300 billion</span>. That's a{" "}
          <span className="aigdp-num">15–20×</span> gap.
        </div>
        <div className="aigdp-punch-text">
          The most careful estimate from MIT says AI will boost the economy by{" "}
          <span className="aigdp-num">less than 1%</span> total{" "}
          <em>over the next ten years</em>. Not 10% a year. Less than 1% total.
        </div>
        <div className="aigdp-punch-text">
          Unless governments redirect AI profits back to workers at a scale never seen in
          history, the economy shrinks where it matters most:{" "}
          <em>in the wallets of the people who keep it running.</em>
        </div>
      </div>
    </>
  );
}
