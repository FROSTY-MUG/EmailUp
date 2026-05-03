export function simulateAIDelay(ms = 1500) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getTagColor(category) {
  const colors = {
    "Shipment Delay": { bg: "rgba(239,68,68,0.15)", text: "#ef4444", border: "rgba(239,68,68,0.3)" },
    "Refund Request": { bg: "rgba(245,158,11,0.15)", text: "#f59e0b", border: "rgba(245,158,11,0.3)" },
    "Tracking Inquiry": { bg: "rgba(59,130,246,0.15)", text: "#3b82f6", border: "rgba(59,130,246,0.3)" },
    "Billing Issue": { bg: "rgba(249,115,22,0.15)", text: "#f97316", border: "rgba(249,115,22,0.3)" },
    "General Inquiry": { bg: "rgba(16,185,129,0.15)", text: "#10b981", border: "rgba(16,185,129,0.3)" },
    "Schedule Change": { bg: "rgba(139,92,246,0.15)", text: "#8b5cf6", border: "rgba(139,92,246,0.3)" },
    "Delivery Confirmation": { bg: "rgba(20,184,166,0.15)", text: "#14b8a6", border: "rgba(20,184,166,0.3)" },
  };
  return colors[category] || { bg: "rgba(139,149,165,0.15)", text: "#8b95a5", border: "rgba(139,149,165,0.3)" };
}

export function getPriorityColor(priority) {
  const colors = {
    urgent: "#ef4444",
    high: "#f59e0b",
    medium: "#3b82f6",
    low: "#8b95a5",
  };
  return colors[priority] || "#8b95a5";
}

export function getSentimentIcon(sentiment) {
  const icons = {
    positive: "😊",
    neutral: "😐",
    negative: "😟",
    frustrated: "😤",
    concerned: "😰",
    angry: "😡",
  };
  return icons[sentiment] || "😐";
}
