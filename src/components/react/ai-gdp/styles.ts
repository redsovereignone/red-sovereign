export const aigdpStyles = `
/* ── Base ── */
.aigdp-accent { color: #e8543e; }
.aigdp-red-text { color: #e8543e; }
.aigdp-white { color: #ffffff; }

/* ── Waterfall ── */
.aigdp-waterfall {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  font-family: 'DM Sans', sans-serif;
}
.aigdp-waterfall::before {
  content: '';
  position: absolute;
  left: 36px;
  top: 44px;
  bottom: 44px;
  width: 2px;
  background: linear-gradient(to bottom, #3b82f6 0%, #3b82f6 25%, #f59e0b 45%, #e8543e 70%, #e8543e 100%);
  opacity: 0.3;
}
.aigdp-step {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 14px 0;
  position: relative;
}
.aigdp-step-marker {
  width: 72px;
  min-width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}
.aigdp-step-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2.5px solid;
  background: var(--color-black, #08080A);
  margin-bottom: 4px;
}
.aigdp-step-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  color: rgba(255,255,255,0.2);
  letter-spacing: 1px;
}
.aigdp-step-content {
  flex: 1;
  padding: 2px 0;
}
.aigdp-step-label {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.35);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.aigdp-step-value {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.15;
  margin-bottom: 4px;
}
.aigdp-step-detail {
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  line-height: 1.5;
}
.aigdp-step-detail strong {
  color: rgba(255,255,255,0.55);
  font-weight: 600;
}
.aigdp-step-source {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: rgba(255,255,255,0.15);
  margin-top: 3px;
}

/* Step color variants */
.aigdp-step-blue .aigdp-step-dot { border-color: #3b82f6; }
.aigdp-step-blue .aigdp-step-value { color: #3b82f6; }
.aigdp-step-sky .aigdp-step-dot { border-color: #60a5fa; }
.aigdp-step-sky .aigdp-step-value { color: #60a5fa; }
.aigdp-step-amber .aigdp-step-dot { border-color: #f59e0b; }
.aigdp-step-amber .aigdp-step-value { color: #f59e0b; }
.aigdp-step-orange .aigdp-step-dot { border-color: #f97316; }
.aigdp-step-orange .aigdp-step-value { color: #f97316; }
.aigdp-step-red .aigdp-step-dot { border-color: #e8543e; }
.aigdp-step-red .aigdp-step-value { color: #e8543e; }
.aigdp-step-crimson .aigdp-step-dot { border-color: #dc2626; }
.aigdp-step-crimson .aigdp-step-value { color: #dc2626; }

/* Divider */
.aigdp-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0 10px 84px;
}
.aigdp-divider-line {
  flex: 1;
  height: 1px;
  background: rgba(232,84,62,0.2);
}
.aigdp-divider-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #e8543e;
  white-space: nowrap;
}

/* ── GDP Composition Bar ── */
.aigdp-gdp-bar-container {
  font-family: 'DM Sans', sans-serif;
}
.aigdp-gdp-bar {
  display: flex;
  height: 52px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}
.aigdp-gdp-seg {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}
.aigdp-gdp-seg-consumer { width: 68%; background: linear-gradient(135deg, #3b82f6, #2563eb); }
.aigdp-gdp-seg-govt { width: 18%; background: linear-gradient(135deg, #6b7280, #4b5563); }
.aigdp-gdp-seg-investment { width: 17%; background: linear-gradient(135deg, #f59e0b, #d97706); }
.aigdp-gdp-legend {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.aigdp-gdp-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
}
.aigdp-gdp-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  flex-shrink: 0;
}
.aigdp-gdp-legend-item strong {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 12px;
}

/* ── Math Block ── */
.aigdp-math-block {
  font-family: 'DM Sans', sans-serif;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 24px;
}
.aigdp-math-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.aigdp-math-row:last-child { border-bottom: none; }
.aigdp-math-label {
  font-size: 14px;
  color: rgba(255,255,255,0.4);
  flex: 1;
}
.aigdp-math-value {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 20px;
  text-align: right;
}
.aigdp-math-note {
  font-size: 12px;
  color: rgba(255,255,255,0.2);
  margin-top: 2px;
  text-align: right;
}
.aigdp-math-row-hl {
  background: rgba(232,84,62,0.06);
  border-radius: 8px;
  padding: 12px 16px !important;
  margin: 4px -16px;
  border-bottom: none !important;
}

/* ── Gap Bars ── */
.aigdp-gap-visual {
  font-family: 'DM Sans', sans-serif;
  display: flex;
  gap: 16px;
  align-items: flex-end;
}
.aigdp-gap-bar-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.aigdp-gap-bar-label {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.4;
}
.aigdp-gap-bar {
  width: 100%;
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 10px 6px;
}
.aigdp-gap-bar-value {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  text-align: center;
}
.aigdp-sub {
  font-size: 10px;
  font-weight: 400;
  color: rgba(255,255,255,0.6);
  display: block;
  margin-top: 2px;
}
.aigdp-gap-vs {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: rgba(255,255,255,0.15);
  font-weight: 600;
  margin-bottom: 24px;
  flex-shrink: 0;
}

/* ── B2B Money Loop ── */
.aigdp-layers-container {
  font-family: 'DM Sans', sans-serif;
  position: relative;
}
.aigdp-b2b-loop {
  border: 1px solid rgba(168,85,247,0.2);
  background: rgba(168,85,247,0.03);
  border-radius: 14px;
  padding: 24px 28px 20px;
  margin-bottom: 6px;
  position: relative;
}
.aigdp-b2b-loop-label {
  position: absolute;
  top: -10px;
  right: 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #a855f7;
  background: var(--color-black, #08080A);
  padding: 0 10px;
}
.aigdp-b2b-loop-inner {
  display: flex;
  align-items: center;
  gap: 0;
}
.aigdp-b2b-node {
  flex: 1;
  text-align: center;
  padding: 14px 10px;
  border-radius: 8px;
}
.aigdp-b2b-node-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.aigdp-b2b-node-desc {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  line-height: 1.4;
}
.aigdp-b2b-arrow {
  font-size: 24px;
  color: rgba(168,85,247,0.35);
  flex-shrink: 0;
  width: 36px;
  text-align: center;
}

/* Disconnect */
.aigdp-disconnect {
  text-align: center;
  padding: 8px 0;
  position: relative;
}
.aigdp-disconnect-line {
  width: 2px;
  height: 28px;
  margin: 0 auto;
  background: repeating-linear-gradient(
    to bottom,
    rgba(232,84,62,0.4) 0px,
    rgba(232,84,62,0.4) 4px,
    transparent 4px,
    transparent 8px
  );
}
.aigdp-disconnect-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #e8543e;
  margin-top: 4px;
}

/* Consumer layer */
.aigdp-consumer-layer {
  border: 1px solid rgba(59,130,246,0.2);
  background: rgba(59,130,246,0.03);
  border-radius: 14px;
  padding: 20px 28px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
}
.aigdp-consumer-layer-label {
  position: absolute;
  top: -10px;
  right: 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #3b82f6;
  background: var(--color-black, #08080A);
  padding: 0 10px;
}
.aigdp-consumer-icon {
  font-size: 36px;
  flex-shrink: 0;
  opacity: 0.6;
  filter: grayscale(40%);
}
.aigdp-consumer-text {
  font-size: 15px;
  color: rgba(255,255,255,0.5);
  line-height: 1.5;
}
.aigdp-consumer-text strong {
  color: rgba(255,255,255,0.8);
  font-weight: 600;
}
.aigdp-consumer-stat {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #e8543e;
  font-weight: 600;
  margin-top: 6px;
}

/* ── Bottom Line Callout ── */
.aigdp-punchline {
  font-family: 'DM Sans', sans-serif;
  background: linear-gradient(135deg, rgba(232,84,62,0.08) 0%, rgba(220,38,38,0.04) 100%);
  border: 1px solid rgba(232,84,62,0.15);
  border-radius: 16px;
  padding: 32px 36px;
  position: relative;
}
.aigdp-punchline-glow {
  position: absolute;
  top: -1px;
  left: 40px;
  right: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e8543e, transparent);
  opacity: 0.4;
}
.aigdp-punch-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #e8543e;
  margin-bottom: 12px;
}
.aigdp-punch-text {
  font-family: 'Source Serif 4', serif;
  font-size: 24px;
  color: #ffffff;
  line-height: 1.4;
}
.aigdp-punch-text + .aigdp-punch-text { margin-top: 14px; }
.aigdp-num {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  color: #e8543e;
}
.aigdp-punch-text em {
  font-style: italic;
  color: rgba(255,255,255,0.6);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .aigdp-step-marker { width: 48px; min-width: 48px; }
  .aigdp-step { gap: 16px; }
  .aigdp-waterfall::before { left: 24px; }
  .aigdp-step-value { font-size: 20px; }
  .aigdp-divider { padding-left: 56px; }
  .aigdp-divider-text { font-size: 9px; letter-spacing: 1px; }
  .aigdp-gap-bar-value { font-size: 13px; }
  .aigdp-gap-bar-label { font-size: 10px; }
  .aigdp-gap-bar { padding: 8px 4px; }
  .aigdp-math-row { flex-direction: column; gap: 4px; }
  .aigdp-math-value { text-align: left; }
  .aigdp-math-note { text-align: left; }
  .aigdp-b2b-loop { padding: 20px 16px 16px; }
  .aigdp-b2b-loop-inner { flex-direction: column; gap: 8px; }
  .aigdp-b2b-arrow { transform: rotate(90deg); width: auto; padding: 4px 0; }
  .aigdp-consumer-layer { flex-direction: column; text-align: center; }
  .aigdp-punch-text { font-size: 20px; }
  .aigdp-punchline { padding: 24px 20px; }
  .aigdp-gdp-seg { font-size: 10px; }
  .aigdp-gdp-legend { gap: 12px; }
  .aigdp-gdp-legend-item { font-size: 12px; }
}
`;
