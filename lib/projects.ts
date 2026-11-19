import type { DomainId } from "./domains";

// Every project on the site comes from the CV. Nothing here should claim
// more than the CV does: when a detail (a date, a metric, a link) isn't in
// the CV, it is left out rather than guessed.

export type Project = {
  slug: string;
  title: string;
  short: string; // label in the hero graph
  client: string | null;
  kind: "Client project" | "Proof of concept";
  period: string | null;
  domains: DomainId[]; // first one is the primary domain
  summary: string;
  overview: string;
  problem: string;
  contribution: string[];
  highlights: string[];
  outcomes: string[];
  stack: string[];
  // A headline number for the Work tile, only where the CV gives one.
  metric?: { value: string; label: string };
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "player-360",
    title: "Early VIP & High-Potential VIP Player 360",
    short: "Player 360",
    client: "Entain",
    kind: "Client project",
    period: "Mar – Aug 2025",
    domains: ["graph", "forecast", "agents"],
    summary:
      "An ML and graph analytics platform that spots future VIP players within their first 3 to 21 days, with a plain-language reason for every prediction.",
    overview:
      "An end-to-end Player 360 platform for Entain that detects Early VIP and High-Potential VIP players across 3, 7, 14 and 21-day behavioural windows. It joins transactional, behavioural, product-mix and graph data in BigQuery, scores players with XGBoost and graph neural networks, and explains each classification in plain language.",
    problem:
      "CRM teams want to reach players who are likely to become high-value early, while there is still time to act. That means predicting VIP potential from only a few days of behaviour, with heavy class imbalance, many related entities per player (devices, IP addresses, affiliates, deals), and a need to explain every prediction to the people who act on it.",
    contribution: [
      "Built the platform end to end, from BigQuery pipelines and feature engineering to model training, inference and the explanation layer.",
      "Designed the Player 360 pipelines linking players to IP Address, Device, Session, Affiliate, Tracker, Country and Deal entities.",
      "Developed and optimised the XGBoost, homogeneous GNN and heterogeneous GNN models.",
    ],
    highlights: [
      "Behavioural, monetary, temporal, engagement and cross-product features covering deposits, stakes, active days, sessions, NGR and product mix.",
      "Graph features for connectivity, neighbourhood statistics, propagation signals, behavioural clustering and shared-entity patterns, with relationship filtering to cut graph noise.",
      "Feature selection, class-imbalance handling, threshold optimisation and PR-AUC-focused evaluation for early VIP prediction.",
      "SHAP-driven feature selection to keep high-value predictors and drop redundant, low-value ones.",
      "Leakage-safe, time-aware training and inference with frozen feature schemas, reproducible preprocessing artifacts, model checkpoints and training/inference consistency checks.",
      "A Gemini layer that turns the top SHAP features from each inference into a readable explanation of why a player was flagged.",
    ],
    outcomes: [
      "Early VIP and High-Potential VIP predictions across four behavioural windows, supporting proactive CRM targeting.",
      "A human-readable explanation alongside every classification, generated from SHAP values by Gemini.",
    ],
    stack: [
      "Python",
      "Google BigQuery",
      "SQL",
      "Pandas",
      "NumPy",
      "XGBoost",
      "Scikit-learn",
      "PyTorch",
      "PyTorch Geometric",
      "GAT",
      "Heterogeneous GNNs",
      "SHAP",
      "Gemini",
      "GPU computing",
    ],
    metric: { value: "3–21 days", label: "behavioural windows for early VIP detection" },
  },
  {
    slug: "demand-forecasting",
    title: "Demand Forecasting System",
    short: "Demand forecasting",
    client: "Sanmina",
    kind: "Client project",
    period: null,
    domains: ["forecast"],
    summary:
      "An API-driven forecasting service that produces item-level weekly forecasts from BigQuery or uploaded data and turns them into client-ready Excel reports.",
    overview:
      "An end-to-end, API-driven pipeline for Sanmina that forecasts demand item by item, either from BigQuery enterprise data or from datasets a client uploads. Forecasts are reconciled with quarterly plans and delivered as structured Excel reports with capacity, inventory and supply context.",
    problem:
      "Planning needed item-level forecasts that still agree with quarterly business demand plans, drawn from many sources (demand, MDS, capacity, WIP, inventory, CTB and calendar data), without anyone moving data around by hand.",
    contribution: [
      "Built the pipeline end to end and designed its architecture, with ingestion, preprocessing, forecasting, reconciliation and reporting as separate modules.",
      "Developed the modular FastAPI service supporting both automated cloud inference and file-based forecasting.",
      "Built the automated report generation engine.",
    ],
    highlights: [
      "Preprocessing that turns demand, MDS, capacity, WIP, inventory, CTB and calendar data into clean, continuous ITEM × WEEK time series.",
      "MLForecast (XGBoost) models for large-scale item-level forecasting, with configurable start dates and dynamic horizons.",
      "Hierarchical reconciliation aligning weekly item forecasts with quarterly demand plans.",
      "Secure BigQuery integration for fully automated enterprise inference.",
      "Excel reports that combine forecasts with capacity, inventory and supply-pipeline insights.",
    ],
    outcomes: [
      "Fully automated inference from BigQuery, removing the need for manual data handling.",
      "Client-ready reports produced directly by the pipeline.",
    ],
    stack: ["Python", "FastAPI", "Pandas", "BigQuery", "XGBoost", "MLForecast", "Time-series forecasting", "Hierarchical forecasting"],
  },
  {
    slug: "soccer-analytics",
    title: "Soccer Detection & Tracking",
    short: "Soccer tracking",
    client: "Darkhorse Soccer Analytics",
    kind: "Client project",
    period: null,
    domains: ["vision"],
    summary:
      "Detects and tracks the ball, players and jersey numbers in match video at 30 FPS, backed by an annotation team I led.",
    overview:
      "A computer vision system for Darkhorse Soccer Analytics that detects and tracks the soccer ball, the players and their jersey numbers in short and long match clips. Models were trained on real photos and frames from actual game video.",
    problem:
      "A soccer ball is a tiny, fast object in high-resolution footage, often blurred or hidden behind players. Tracking it reliably, alongside players and their numbers, needs well-labelled data and detection tuned for small objects, while still running in real time.",
    contribution: [
      "Worked with the team to build the system that detects and tracks balls, players and jersey numbers.",
      "Led an 8-member annotation team, keeping labelled datasets high quality with Roboflow and CVAT.",
      "Designed and implemented the ball detection system using SAHI.",
    ],
    highlights: [
      "SAHI (Slicing Aided Hyper Inference) with 6-slice and 8-slice configurations for small-object detection in high-resolution frames.",
      "RT-DETR, YOLOv8 and YOLOX for detecting and tracking the ball.",
      "Kalman filters to follow the ball's movement between frames.",
      "Post-processing tuned for small-object tracking, improving reliability and efficiency.",
    ],
    outcomes: ["Real-time performance at 30 FPS, balancing accuracy and scalability for sports analytics."],
    stack: ["Python", "RT-DETR", "YOLOv8", "YOLOX", "SAHI", "Kalman filters", "OpenCV", "Roboflow", "CVAT", "AWS", "Microsoft Azure", "Git"],
    metric: { value: "30 FPS", label: "real-time detection and tracking" },
  },
  {
    slug: "patient-monitoring",
    title: "Patient Monitoring & Pose Estimation",
    short: "Patient monitoring",
    client: "Tampa General Hospital",
    kind: "Proof of concept",
    period: null,
    domains: ["vision"],
    summary:
      "Tracks patient movement and posture in real time with YOLOX, RTMO and ViTPose, and uses Florence to drive automated reports and alerts.",
    overview:
      "An AI-powered monitoring proof of concept for Tampa General Hospital that tracks patients' movements and postures in real time, so staff can receive alerts and reports are generated automatically.",
    problem:
      "Keeping track of patient positioning and mobility across different hospital environments is demanding for staff. The system had to detect patients reliably, estimate pose accurately, keep false detections low and fit into existing hospital workflows.",
    contribution: [
      "Developed the monitoring system and designed its tracking pipeline.",
      "Optimised post-processing to improve efficiency and minimise false detections.",
      "Led the annotation process, using Florence for prompt generation to streamline dataset creation.",
    ],
    highlights: [
      "YOLOX for patient detection and RTMO for real-time multi-person pose estimation.",
      "ViTPose, a vision-transformer pose model, to improve tracking accuracy.",
      "Florence, a foundation model, generating context-aware prompts for automated reporting and alerts.",
      "Tracking designed to work across different hospital environments.",
    ],
    outcomes: ["Real-time tracking of patient movement and posture, with automated reporting and alerts for healthcare staff."],
    stack: ["Python", "YOLOX", "RTMO", "ViTPose", "Florence", "OpenCV", "PyTorch"],
  },
  {
    slug: "agent-memory",
    title: "Persistent Cross-Session Memory for AI Agents",
    short: "Agent memory",
    client: null,
    kind: "Proof of concept",
    period: null,
    domains: ["agents", "graph"],
    summary: "Gives Google ADK agents a PostgreSQL-backed memory, so they recall past sessions, preferences and instructions.",
    overview:
      "A proof of concept that connects PostgreSQL to Google ADK's session framework, turning stateless chatbots into assistants that remember past interactions, user preferences and instructions across sessions.",
    problem:
      "Most agents forget everything when a session ends, so users repeat themselves and answers lose context. The goal was persistent, queryable memory that stays isolated per user and project, and a way to show that it actually works.",
    contribution: [
      "Integrated PostgreSQL with Google ADK's session framework for persistent, queryable memory.",
      "Built evaluation datasets and sample conversations to test reasoning and memory retention.",
      "Built a mock Demand Forecasting Agent to simulate realistic multi-session use.",
      "Tested the memory system for robustness and long-term consistency.",
    ],
    highlights: [
      "Evaluation questions covering temporal reasoning, open-domain knowledge, adversarial cases, and multi-hop and single-hop QA.",
      "Session isolation by UserID, Engine Name and Project Name.",
      "Knowledge graph creation in Neo4j, tested with and without an ontology.",
      "Retrieval of past interactions demonstrated in realistic forecasting-agent sessions.",
    ],
    outcomes: ["Agents that give personalised, consistent, context-aware answers across sessions."],
    stack: ["Python", "Google ADK", "PostgreSQL", "LLMs", "Neo4j", "Knowledge graphs", "Prompt engineering"],
    github: "https://github.com/roshil04/agentic_memory_service",
  },
  {
    slug: "sales-copilot",
    title: "Sales Copilot",
    short: "Sales copilot",
    client: null,
    kind: "Proof of concept",
    period: null,
    domains: ["agents", "graph"],
    summary:
      "Agents that create and look up HubSpot deals, a Neo4j graph of the CRM, and natural-language answers with next-step recommendations.",
    overview:
      "A proof-of-concept sales copilot built on HubSpot's APIs. Autonomous agents handle deal creation and lookups in real time, a Neo4j knowledge graph links the CRM's entities, and an LLM answers questions and recommends next steps from past deals, notes and emails.",
    problem:
      "Sales context is scattered across deals, companies, contacts, notes and emails in the CRM. Getting an answer or deciding the next step means clicking through records by hand.",
    contribution: [
      "Developed the copilot and explored HubSpot's endpoints for deals, companies, CRM data, pipelines and deal stages.",
      "Built agents with CrewAI flows for real-time deal creation and information retrieval.",
      "Constructed the Neo4j knowledge graph and the question-answering and recommendation layers.",
    ],
    highlights: [
      "A knowledge graph of deal stages, deals, companies, notes, contacts and emails for contextual querying.",
      "Natural-language questions over CRM data, answered with ChatGoogleGenerativeAI.",
      "A recommendation engine that uses historical deals, notes and emails to summarise deals and suggest next steps.",
      "Prompt engineering to improve answers and graph-based query resolution.",
    ],
    outcomes: ["Natural-language access to CRM data, with deal summaries and next-step suggestions based on previous sales activity."],
    stack: ["Python", "HubSpot API", "Neo4j", "Graphiti", "LangChain", "ChatGoogleGenerativeAI", "Google ADK", "CrewAI"],
  },
  {
    slug: "fashion-moodboards",
    title: "Fashion Mood Boards with Gemini",
    short: "Fashion mood boards",
    client: null,
    kind: "Proof of concept",
    period: "Sep – Oct 2025",
    domains: ["agents", "vision"],
    summary:
      "Generates editorial fashion visuals and mood boards from prompts and reference images, so designers can try a concept without a photoshoot.",
    overview:
      "A proof-of-concept image generation pipeline using Google Gemini (Nano Banana) that creates editorial-style fashion visuals and mood boards from text prompts and reference images, or from reference images alone.",
    problem:
      "Exploring a fashion concept usually means a photoshoot or slow manual design work, which makes every iteration costly. Designers and marketing teams needed a faster way to visualise ideas while keeping the core design consistent.",
    contribution: [
      "Designed and implemented the fashion image generation pipeline.",
      "Built automated workflows that produce mood boards and editorial compositions.",
    ],
    highlights: [
      "Multiple reference images combined with prompts to produce collages and mood boards.",
      "Controlled variation of pose, expression, camera angle, environment, lighting and accessories while preserving the design.",
      "Prompt-free generation from reference images alone, for fully automated workflows.",
    ],
    outcomes: ["Fast concept prototyping without physical photoshoots, shortening design iteration for designers and marketing teams."],
    stack: ["Python", "Google Gemini (Nano Banana)", "Multimodal LLMs", "Image generation", "Prompt engineering"],
  },
  {
    slug: "project-management-agent",
    title: "Project Management System Agent",
    short: "PM agent",
    client: null,
    kind: "Proof of concept",
    period: null,
    domains: ["agents"],
    summary: "Merges data from multiple Monday.com boards into cross-board summaries, recommendations and email drafts.",
    overview:
      "A proof-of-concept recommendation system that pulls data from multiple Monday.com boards, merges it accurately and produces holistic project summaries, insights and standard email templates.",
    problem:
      "Project data spread across many boards makes it hard to see the whole picture. Combining tables from different boards correctly is the hard part: the metrics have to line up before any insight can be trusted.",
    contribution: [
      "Focused on the logic for combining multiple Monday.com boards, so tables, metrics and insights merge accurately.",
      "Created dynamic email templates for project communication.",
      "Tested and validated the video feature module that processes project-related clips.",
      "Reviewed and set up CopilotKit and CoAgents Starter CrewAI Flows locally to assess them for future expansion.",
    ],
    highlights: [
      "Cross-board analysis for holistic project summaries and recommendations.",
      "Retrieval-augmented generation over project data with OpenAI models.",
      "Prompt tuning to improve generated plots.",
      "Graphiti for scaling and visualising knowledge graphs.",
    ],
    outcomes: ["Cross-board project summaries and standardised team communication."],
    stack: ["Python", "OpenAI", "RAG", "Graphiti", "CopilotKit", "CrewAI Flows", "REST APIs", "Git"],
  },
  {
    slug: "document-verification",
    title: "Document Verification & Classification",
    short: "Document verification",
    client: null,
    kind: "Proof of concept",
    period: null,
    domains: ["nlp"],
    summary: "A Streamlit app that classifies uploaded documents, predicts dispute codes from comments and extracts entities.",
    overview:
      "A proof-of-concept Streamlit application for verifying and classifying documents. Users upload PDFs and enter queries; NLP models predict dispute codes, classify the document type and extract the relevant entities.",
    problem:
      "Checking a dispute means reading documents of many different types and matching them to the right dispute code by hand. The app needed to handle varied inputs without a dedicated model for every document type.",
    contribution: [
      "Developed the Streamlit application and its NLP pipeline.",
      "Fine-tuned RoBERTa for dispute code prediction.",
    ],
    highlights: [
      "Fine-tuned RoBERTa sequence classification that predicts dispute codes from user comments.",
      "Zero-shot BART classification of document types, without training a model per type.",
      "GLiNER for named entity recognition.",
      "PDF text extraction with PyMuPDF.",
    ],
    outcomes: ["One interface to upload a PDF, ask a question, and get the dispute code, document type and entities back."],
    stack: ["Python", "Hugging Face Transformers", "RoBERTa", "BART", "GLiNER", "PyMuPDF", "PyTorch", "Streamlit"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
