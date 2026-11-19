// The five areas the work falls into. Each has its own colour, used by the
// hero graph, the project filters and the tags, so a colour always means
// the same thing on every page.

export type DomainId = "graph" | "vision" | "agents" | "nlp" | "forecast";

export type Domain = {
  id: DomainId;
  label: string; // full name
  short: string; // graph node label
  summary: string; // one line, used in About
};

export const domains: Domain[] = [
  {
    id: "graph",
    label: "Graph ML & knowledge graphs",
    short: "Graph ML",
    summary:
      "Homogeneous and heterogeneous GNNs in PyTorch Geometric, graph features for player analytics, and Neo4j knowledge graphs that LLMs can query.",
  },
  {
    id: "vision",
    label: "Computer vision",
    short: "Vision",
    summary:
      "Detection, tracking and pose estimation with YOLOv8, YOLOX, RT-DETR, SAHI, RTMO and ViTPose, tuned for real-time video.",
  },
  {
    id: "agents",
    label: "LLMs & agents",
    short: "LLM agents",
    summary:
      "Agents with Google ADK, CrewAI and LangChain, persistent memory, RAG over business data, and Gemini for explanations and image generation.",
  },
  {
    id: "nlp",
    label: "NLP",
    short: "NLP",
    summary:
      "Fine-tuned RoBERTa classification, zero-shot BART, GLiNER entity extraction and document pipelines built on Hugging Face Transformers.",
  },
  {
    id: "forecast",
    label: "Forecasting & tabular ML",
    short: "Forecasting",
    summary:
      "XGBoost and MLForecast models on BigQuery data, hierarchical reconciliation, time-aware pipelines and SHAP-based feature selection.",
  },
];

export const domainById = Object.fromEntries(domains.map((d) => [d.id, d])) as Record<DomainId, Domain>;

// CSS variable for each domain's colour (defined in globals.css for both themes).
export const domainColor = (id: DomainId) => `var(--d-${id})`;
