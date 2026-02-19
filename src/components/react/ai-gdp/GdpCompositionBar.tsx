import { aigdpStyles } from "./styles";

export default function GdpCompositionBar() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aigdpStyles }} />
      <div className="aigdp-gdp-bar-container">
        <div className="aigdp-gdp-bar">
          <div className="aigdp-gdp-seg aigdp-gdp-seg-consumer">People 68%</div>
          <div className="aigdp-gdp-seg aigdp-gdp-seg-govt">Govt 18%</div>
          <div className="aigdp-gdp-seg aigdp-gdp-seg-investment">Business 17%</div>
        </div>
        <div className="aigdp-gdp-legend">
          <div className="aigdp-gdp-legend-item">
            <div className="aigdp-gdp-legend-dot" style={{ background: "#3b82f6" }} />
            Consumer Spending <strong>$20.8T</strong>
          </div>
          <div className="aigdp-gdp-legend-item">
            <div className="aigdp-gdp-legend-dot" style={{ background: "#6b7280" }} />
            Government <strong>$5.5T</strong>
          </div>
          <div className="aigdp-gdp-legend-item">
            <div className="aigdp-gdp-legend-dot" style={{ background: "#f59e0b" }} />
            Business Investment <strong>~$5.3T</strong>
          </div>
          <div className="aigdp-gdp-legend-item">
            <div className="aigdp-gdp-legend-dot" style={{ background: "#374151" }} />
            Trade Balance <strong>−$0.4T</strong>
          </div>
        </div>
      </div>
    </>
  );
}
