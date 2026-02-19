import { aigdpStyles } from "./styles";

interface StepProps {
  color: "blue" | "sky" | "amber" | "orange" | "red" | "crimson";
  num: string;
  label: string;
  value: string;
  detail?: React.ReactNode;
  source?: string;
}

function Step({ color, num, label, value, detail, source }: StepProps) {
  return (
    <div className={`aigdp-step aigdp-step-${color}`}>
      <div className="aigdp-step-marker">
        <div className="aigdp-step-dot" />
        <div className="aigdp-step-num">{num}</div>
      </div>
      <div className="aigdp-step-content">
        <div className="aigdp-step-label">{label}</div>
        <div className="aigdp-step-value">{value}</div>
        {detail && <div className="aigdp-step-detail">{detail}</div>}
        {source && <div className="aigdp-step-source">{source}</div>}
      </div>
    </div>
  );
}

export default function WaterfallChart() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aigdpStyles }} />
      <div className="aigdp-waterfall">
        <Step color="blue" num="01" label="The US Economy" value="$30.5 Trillion" source="BEA, Q3 2025" />
        <Step
          color="sky"
          num="02"
          label="How Much Comes from People Buying Things"
          value="68% → $20.8T"
          detail={<>This is the engine. <strong>Without consumers spending, the economy stalls.</strong></>}
          source="BEA, Q3 2025"
        />
        <Step
          color="amber"
          num="03"
          label="How Much of That Comes from Top Earners"
          value="57% → $11.9T"
          detail={<>The top 20% drive most spending. <strong>These are the white-collar workers AI replaces first.</strong></>}
          source="Federal Reserve Bank of Dallas, Nov 2025"
        />
        <div className="aigdp-divider">
          <div className="aigdp-divider-line" />
          <div className="aigdp-divider-text">↓ What Happens When AI Replaces Them ↓</div>
          <div className="aigdp-divider-line" />
        </div>
        <Step
          color="orange"
          num="04"
          label="Jobs AI Is Expected to Eliminate (Next 5 Years)"
          value="10–12 Million"
          detail="Lawyers, accountants, software engineers, consultants, marketers, analysts, admin staff."
          source="Goldman Sachs; World Economic Forum; McKinsey"
        />
        <Step
          color="red"
          num="05"
          label="Paychecks That Vanish → Spending That Stops"
          value="$750B – $1T / Year"
          detail="10 million people earning ~$85K each stop buying cars, homes, dinners, and everything else."
        />
        <Step
          color="crimson"
          num="06"
          label="The Ripple Effect on the Whole Economy"
          value="$1.1 – $1.5T GDP Hit"
          detail={<>A <strong>3.6–5% shrink</strong>. When people stop spending, the businesses they buy from lay off more people, who stop spending too.</>}
        />
      </div>
    </>
  );
}
