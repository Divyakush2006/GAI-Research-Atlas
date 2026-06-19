import type { AtlasData } from '../types/atlas';

const MOCK_ATLAS: Record<string, AtlasData> = {
  default: {
    topic: 'AI Governance',
    overview:
      'AI Governance encompasses the frameworks, policies, and practices designed to ensure that artificial intelligence systems are developed and deployed responsibly, ethically, and in alignment with societal values. This rapidly evolving field draws from computer science, law, ethics, and public policy to address challenges such as algorithmic bias, transparency, accountability, and the long-term safety of advanced AI systems. Key institutions including the IAPP, IEEE, and various national governments are actively developing standards and regulatory frameworks to guide the responsible adoption of AI across sectors.',
    papers: [
      {
        title: 'Towards Responsible AI: A Framework for Ethical Governance of Machine Learning Systems',
        authors: ['Sarah Chen', 'Marcus Williams', 'Priya Patel'],
        year: 2024,
        citation_count: 1240,
        score: 94.7,
        abstract:
          'We propose a comprehensive governance framework for machine learning systems that addresses accountability, transparency, and fairness at each stage of the ML lifecycle. Our framework introduces novel audit mechanisms and stakeholder engagement protocols validated across five enterprise deployments.',
        url: 'https://arxiv.org/abs/2401.example1',
      },
      {
        title: 'Algorithmic Accountability: Auditing AI Systems in High-Stakes Domains',
        authors: ['Elena Rodriguez', 'James Park'],
        year: 2024,
        citation_count: 876,
        score: 91.2,
        abstract:
          'This paper examines methodologies for auditing AI decision-making in healthcare, criminal justice, and financial services. We introduce the AUDIT protocol — a structured approach to identifying bias, documenting failure modes, and ensuring regulatory compliance.',
        url: 'https://arxiv.org/abs/2402.example2',
      },
      {
        title: 'Constitutional AI: Harmlessness from AI Feedback',
        authors: ['Anthropic Research Team'],
        year: 2023,
        citation_count: 3210,
        score: 89.5,
        abstract:
          'We introduce Constitutional AI, a method for training AI assistants to be helpful, harmless, and honest using a set of principles. Our approach reduces harmful outputs while maintaining capability across a wide range of tasks.',
        url: 'https://arxiv.org/abs/2212.example3',
      },
      {
        title: 'EU AI Act: Technical Implications for High-Risk AI Systems',
        authors: ['Lukas Müller', 'Sophie Dubois', 'Andrea Romano'],
        year: 2024,
        citation_count: 654,
        score: 87.3,
        abstract:
          "An analysis of the EU Artificial Intelligence Act's technical requirements for high-risk AI systems, including conformity assessments, logging obligations, and human oversight mandates. We provide a practical compliance roadmap for AI developers.",
        url: 'https://arxiv.org/abs/2403.example4',
      },
      {
        title: 'Explainability in Machine Learning: A Survey of Methods and Their Governance Implications',
        authors: ['Nina Okonkwo', 'David Zhang'],
        year: 2023,
        citation_count: 1890,
        score: 85.8,
        abstract:
          'A comprehensive survey of explainability methods in ML, covering LIME, SHAP, attention mechanisms, and counterfactual explanations. We evaluate each method against governance criteria including fidelity, comprehensibility, and regulatory acceptance.',
        url: 'https://arxiv.org/abs/2310.example5',
      },
      {
        title: 'Federated Learning and Data Privacy: Governance Challenges at Scale',
        authors: ['Yuki Tanaka', 'Amara Diallo'],
        year: 2024,
        citation_count: 432,
        score: 83.1,
        abstract:
          'We examine privacy-preserving machine learning techniques through a governance lens, analyzing how federated learning, differential privacy, and secure multi-party computation interact with emerging regulatory requirements.',
        url: 'https://arxiv.org/abs/2404.example6',
      },
      {
        title: 'Bias Mitigation in Large Language Models: Techniques and Trade-offs',
        authors: ['Rachel Kim', 'Omar Hassan', 'Felix Wagner'],
        year: 2023,
        citation_count: 2100,
        score: 81.6,
        abstract:
          'This paper surveys debiasing techniques for LLMs including instruction tuning, RLHF, and data curation strategies. We quantify the capability-safety trade-off and propose evaluation benchmarks aligned with governance objectives.',
        url: 'https://arxiv.org/abs/2311.example7',
      },
      {
        title: 'AI Incident Database: Lessons from 1000 Documented Failures',
        authors: ['Peter Bloomfield', 'Riya Sharma'],
        year: 2024,
        citation_count: 298,
        score: 78.9,
        abstract:
          'An empirical analysis of AI failures documented in the AI Incident Database. We identify recurring failure patterns, propose a taxonomy of AI harms, and derive governance recommendations for proactive risk mitigation.',
        url: 'https://arxiv.org/abs/2405.example8',
      },
    ],
    repositories: [
      {
        name: 'responsible-ai-toolbox',
        description: "Microsoft's suite of tools for understanding, debugging, and governing AI systems including fairness assessment and interpretability.",
        stars: 4800,
        url: 'https://github.com/microsoft/responsible-ai-toolbox',
        language: 'Python',
      },
      {
        name: 'ai-fairness-360',
        description: "IBM's comprehensive toolkit for detecting and mitigating bias in machine learning models and datasets.",
        stars: 2300,
        url: 'https://github.com/Trusted-AI/AIF360',
        language: 'Python',
      },
      {
        name: 'model-cards-and-datasheets',
        description: 'Templates and tools for creating model cards and datasheets — essential documentation for AI governance and transparency.',
        stars: 1100,
        url: 'https://github.com/tensorflow/model-card-toolkit',
        language: 'Python',
      },
      {
        name: 'shap',
        description: 'SHAP (SHapley Additive exPlanations) — a game-theoretic approach to explain ML model outputs for auditing and accountability.',
        stars: 22400,
        url: 'https://github.com/shap/shap',
        language: 'Python',
      },
      {
        name: 'ai-incident-database',
        description: 'Open database tracking AI incidents and failures in real-world deployments to inform governance policy.',
        stars: 890,
        url: 'https://github.com/responsible-ai-collaborative/aiid',
        language: 'JavaScript',
      },
      {
        name: 'guardrails-ai',
        description: 'Production-ready framework for adding safety guardrails, validation, and governance controls to LLM applications.',
        stars: 3600,
        url: 'https://github.com/guardrails-ai/guardrails',
        language: 'Python',
      },
    ],
    resources: [
      {
        title: 'IAPP AI Governance Center',
        url: 'https://iapp.org/resources/topics/artificial-intelligence/',
        organization: 'IAPP',
        category: 'Framework',
      },
      {
        title: 'NIST AI Risk Management Framework',
        url: 'https://www.nist.gov/artificial-intelligence/ai-risk-management-framework',
        organization: 'NIST',
        category: 'Framework',
      },
      {
        title: 'EU AI Act — Official Text and Technical Annexes',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
        organization: 'European Union',
        category: 'Legislation',
      },
      {
        title: 'OECD AI Policy Observatory',
        url: 'https://oecd.ai/',
        organization: 'OECD',
        category: 'Policy',
      },
      {
        title: 'Partnership on AI — Research and Resources',
        url: 'https://partnershiponai.org/research/',
        organization: 'Partnership on AI',
        category: 'Research',
      },
      {
        title: 'IEEE Ethically Aligned Design',
        url: 'https://standards.ieee.org/industry-connections/ec/autonomous-systems/',
        organization: 'IEEE',
        category: 'Standard',
      },
      {
        title: 'AI Governance: A Research Agenda',
        url: 'https://www.governance.ai/research-paper/ai-governance-research-agenda',
        organization: 'Centre for the Governance of AI',
        category: 'Research',
      },
      {
        title: "UN Secretary-General's Roadmap for Digital Cooperation",
        url: 'https://www.un.org/en/content/digital-cooperation-roadmap/',
        organization: 'United Nations',
        category: 'Policy',
      },
    ],
  },
};

function buildMockAtlas(topic: string): AtlasData {
  const base = MOCK_ATLAS['default'];
  return { ...base, topic };
}

export async function generateAtlas(topic: string): Promise<AtlasData> {
  // Replace this URL with the actual backend endpoint when ready:
  // const response = await fetch('/api/atlas', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ topic }),
  // });
  // if (!response.ok) throw new Error('Failed to generate atlas');
  // return response.json();

  await new Promise((resolve) => setTimeout(resolve, 5000));
  return buildMockAtlas(topic);
}
