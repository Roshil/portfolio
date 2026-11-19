import type { DomainId } from "./domains";

// The rest of the CV: roles, education, skills and credentials.

export const about = [
  "I'm a machine learning engineer at Fusemachines with a Bachelor's in Computer Science and Information Technology. Since joining in 2023 I've delivered ML systems for clients in gaming, manufacturing, healthcare and sports, from object detection and text recognition to graph neural networks and LLM agents.",
  "Most of my work starts with messy business data and a question someone needs answered. I like the whole path from there: designing the pipeline, engineering features, choosing and tuning the model, explaining what it learned, and getting it into production.",
  "I care about model performance, explainability and measurable impact, and I work best in cross-functional teams where engineers, analysts and domain experts shape the solution together.",
];

export type Role = {
  title: string;
  org: string;
  start: string;
  end: string;
  points: { text: string; project?: string }[];
};

export const roles: Role[] = [
  {
    title: "ML Engineer Associate",
    org: "Fusemachines",
    start: "Nov 2023",
    end: "Present",
    points: [
      {
        text: "Built a Player 360 platform for Entain that flags Early and High-Potential VIP players using BigQuery, XGBoost, homogeneous and heterogeneous GNNs, SHAP and Gemini-generated explanations.",
        project: "player-360",
      },
      {
        text: "Built an API forecasting pipeline for Sanmina with hierarchical MLForecast (XGBoost) models and automated Excel reporting on supply, inventory and capacity.",
        project: "demand-forecasting",
      },
      {
        text: "Developed computer vision pipelines to detect and track players, balls and jersey numbers for Darkhorse Soccer Analytics, and led an 8-member annotation team.",
        project: "soccer-analytics",
      },
      {
        text: "Developed a real-time patient monitoring and pose estimation system for Tampa General Hospital with YOLOX, RTMO, ViTPose and Florence.",
        project: "patient-monitoring",
      },
      {
        text: "Built LLM agent proofs of concept: a HubSpot sales copilot on Neo4j knowledge graphs, a Monday.com project management agent, and persistent memory for Google ADK agents.",
        project: "sales-copilot",
      },
      {
        text: "Built a document verification and classification app with fine-tuned RoBERTa, zero-shot BART and GLiNER.",
        project: "document-verification",
      },
    ],
  },
  {
    title: "ML Engineer Associate Trainee",
    org: "Fusemachines",
    start: "Aug 2023",
    end: "Nov 2023",
    points: [
      { text: "Joined the Computer Vision Upskilling programme and built a foundation in computer vision techniques with Python, OpenCV and Matplotlib." },
      { text: "Learned AWS services including S3, EC2 and Lambda." },
      { text: "Applied Python naming and code standards, contributed to code cleaning and optimisation, and studied error analysis techniques." },
      { text: "Annotated data for Fuse Extract and Darkhorse." },
    ],
  },
];

export const education = [
  {
    degree: "BSc in Computer Science and Information Technology (BSc CSIT)",
    school: "Alliance for Innovative Management and Social Studies (AIMS) College, Biratnagar",
    board: "Tribhuvan University",
    year: "2023",
  },
  {
    degree: "Higher Secondary (+2) in Science",
    school: "Shikshadeep Higher Secondary School of Science",
    board: "HSEB",
    year: "2018",
  },
];

export const skills: { group: string; items: string[]; wide?: boolean }[] = [
  { group: "Languages", items: ["Python", "C/C++", "SQL"] },
  {
    group: "Machine learning",
    wide: true,
    items: ["scikit-learn", "XGBoost", "TensorFlow", "Keras", "PyTorch", "SHAP", "Transfer learning", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
  },
  { group: "Graph ML", items: ["PyTorch Geometric", "Homogeneous & heterogeneous GNNs", "GAT", "Neo4j", "Graphiti"] },
  {
    group: "Computer vision",
    items: ["YOLOv8", "YOLOX", "RT-DETR", "SAHI", "RTMO", "ViTPose", "Florence", "OpenCV", "Pillow", "Kalman filters", "Roboflow", "CVAT"],
  },
  {
    group: "NLP",
    items: ["Hugging Face Transformers", "BERT", "RoBERTa", "BART", "GLiNER", "spaCy", "NLTK", "Named entity recognition", "Text classification", "Summarisation", "Sentiment analysis"],
  },
  {
    group: "LLMs & agents",
    items: ["Google ADK", "LangChain", "CrewAI", "Gemini", "OpenAI", "RAG", "CopilotKit", "Prompt engineering", "Multimodal image generation"],
  },
  { group: "Forecasting", items: ["MLForecast", "Hierarchical forecasting", "Time-series feature engineering"] },
  { group: "Data", items: ["Google BigQuery", "PostgreSQL", "MySQL", "MongoDB"] },
  { group: "Cloud & MLOps", items: ["Google Cloud", "AWS (EC2, S3, Lambda)", "Microsoft Azure", "Docker", "API model serving", "GPU computing"] },
  { group: "APIs & apps", items: ["FastAPI", "Flask", "Streamlit", "REST APIs", "HubSpot API"] },
  { group: "Tools", items: ["Git", "Jupyter", "VS Code", "Google Colab"] },
];

export type Credential = { title: string; href: string };

export const certifications: Credential[] = [
  { title: "Machine Learning", href: "https://drive.google.com/file/d/1c6J3yYda1_uvLFYlFpqeOvNZEjgkB9T_/view" },
  { title: "Deep Learning", href: "https://drive.google.com/file/d/13K9W57r7vW_jZ2xejQotfJMgBAVa2-PO/view" },
  { title: "Microdegree in Artificial Intelligence", href: "https://drive.google.com/file/d/1lMOc6ZQNPTIbYYFUFTBg0hGIRg1Ew-pZ/view" },
  { title: "Microdegree in Computer Vision", href: "https://drive.google.com/file/d/1VIEgH2Jx1aPGSXvrhpwo_T33OuahEpAb/view" },
  { title: "Advanced Computer Vision with TensorFlow", href: "https://coursera.org/share/6d3b2f1fbcf0f49a372a13bc19768d32" },
  { title: "Object Tracking and Motion Detection with Computer Vision", href: "https://coursera.org/share/3e62ed3cdb31d704a2957a847f4e513b" },
  { title: "Introduction to Computer Vision and Image Processing", href: "https://www.coursera.org/account/accomplishments/certificate/3PX7JNE9NHVK" },
  { title: "Features and Boundaries", href: "https://coursera.org/share/0a594ce59fc79e1dfa26c468617d6962" },
  { title: "Information Security Awareness Training", href: "https://drive.google.com/file/d/1f-E5_j7BXgxvOmoaaFHU3k8KROnO7Rr8/view" },
];

export const trainings: Credential[] = [
  { title: "Machine Learning Specialization by Andrew Ng", href: "https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI" },
  { title: "AI Agents in LangGraph", href: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/" },
  { title: "Understanding NLP and LLMs", href: "https://huggingface.co/learn/llm-course/en/chapter1/1" },
  { title: "Generative AI", href: "https://www.youtube.com/watch?v=_Ahl73azv7U" },
  { title: "Dive into Deep Learning", href: "https://d2l.ai/" },
  { title: "Introduction to Deep Learning", href: "https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn" },
  { title: "Introduction to Computer Vision and Image Processing", href: "https://www.coursera.org/learn/introduction-computer-vision-watson-opencv" },
  { title: "Kalman Filters", href: "https://www.youtube.com/watch?v=CaCcOwJPytQ&list=PLX2gX-ftPVXU3oUFNATxGXY90AULiqnWT" },
  { title: "AI For Everyone", href: "https://www.coursera.org/learn/ai-for-everyone" },
  { title: "Structured Query Language", href: "https://www.youtube.com/watch?v=BPHAr4QGGVE" },
  { title: "Python Course (Edureka)", href: "https://www.youtube.com/watch?v=WGJJIrtnfpk" },
];

// "Why hire me": one line each, with the case study that backs it up.
export const strengths: { title: string; line: string; project: string }[] = [
  {
    title: "Graph ML that explains itself",
    line: "GNNs and XGBoost on connected player data, with SHAP and Gemini turning every prediction into a plain reason.",
    project: "player-360",
  },
  {
    title: "Vision that runs in real time",
    line: "Detection and tracking tuned for small, fast objects in high-resolution video, at 30 FPS.",
    project: "soccer-analytics",
  },
  {
    title: "Forecasts the business can use",
    line: "Item-level forecasts reconciled with quarterly plans and delivered as reports, straight from BigQuery.",
    project: "demand-forecasting",
  },
  {
    title: "Agents that remember",
    line: "LLM agents with persistent memory, knowledge graphs and tools, tested across sessions.",
    project: "agent-memory",
  },
  {
    title: "NLP on real documents",
    line: "Fine-tuned and zero-shot transformers that classify documents and pull out the entities that matter.",
    project: "document-verification",
  },
];

// The Projects section lists the repos in lib/github-repos.json (refresh it
// with npm run fetch-repos). These optional notes, keyed by full repo name,
// add a drawing, a caption, a category and a better description. Repos
// without notes still appear, with GitHub's description and a generic drawing.
export type RepoNote = {
  rank?: number; // lower comes first; repos without one follow, newest first
  figure?: "memory" | "movie" | "book";
  color?: DomainId | "accent";
  caption?: { title: string; sub: string };
  category?: string;
  description?: string;
  stack?: string[];
  project?: string; // slug of a related case study
};

export const repoNotes: Record<string, RepoNote> = {
  "roshil04/agentic_memory_service": {
    rank: 1,
    figure: "memory",
    color: "agents",
    caption: { title: "Cross-session memory", sub: "Agents recall past sessions" },
    category: "LLM agents",
    description: "Persistent, queryable session memory for Google ADK agents, backed by PostgreSQL.",
    stack: ["Python", "Google ADK", "PostgreSQL"],
    project: "agent-memory",
  },
  "Roshil/movie-recommender-system": {
    rank: 2,
    figure: "movie",
    color: "nlp",
    caption: { title: "Content-based similarity", sub: "Plus review sentiment" },
    category: "Recommender systems",
    description: "Suggests films similar to one you like and analyses the sentiment of your reviews, in Streamlit.",
    stack: ["Python", "Streamlit", "Sentiment analysis"],
  },
  "Roshil/book-recommender-system": {
    rank: 3,
    figure: "book",
    color: "vision",
    caption: { title: "Hybrid filtering", sub: "Content-based and collaborative" },
    category: "Recommender systems",
    description: "Book recommendations from a hybrid of content-based and collaborative filtering, served as a Flask web app.",
    stack: ["Python", "Flask", "Collaborative filtering"],
  },
};
