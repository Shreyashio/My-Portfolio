export type ProjectCategory = 'full-stack' | 'blockchain' | 'ai-ml';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  icon: string;
  hackathon?: string;
}

export const projects: Project[] = [
  // Full Stack
  {
    id: 'paywallet',
    name: 'PayWallet',
    description:
      'Cross-border payroll platform with instant payments, escrow, and FX conversion. Built with React + Flutter + Node.js + MongoDB + Stellar Soroban. Won 3rd prize at a hackathon.',
    category: 'full-stack',
    tags: ['React', 'Flutter', 'Node.js', 'MongoDB', 'Stellar', 'Soroban'],
    liveUrl: '#', // TODO: Add live link
    githubUrl: '#', // TODO: Add GitHub link
    icon: '💳',
    hackathon: '🏆 3rd Prize',
  },

  // Blockchain
  {
    id: 'ipx-market',
    name: 'IPX-Market',
    description:
      'Decentralized marketplace for trading datasets and ML models as digital assets. On-chain transaction handling with a clean listing & trading UI. Won 3rd prize at a hackathon.',
    category: 'blockchain',
    tags: ['Solidity', 'Smart Contracts', 'IPFS', 'React', 'Ethers.js'],
    liveUrl: '#', // TODO: Add live link
    githubUrl: '#', // TODO: Add GitHub link
    icon: '🔗',
    hackathon: '🏆 3rd Prize',
  },

  // AI/ML
  {
    id: 'mini-llm',
    name: 'Mini LLM',
    description:
      'Fine-tuned GPT-2 on a custom dataset to learn domain adaptation, model save/load with Hugging Face Transformers, and local inference (~7m45s on GTX 1650).',
    category: 'ai-ml',
    tags: ['Python', 'Hugging Face', 'GPT-2', 'PyTorch', 'Transformers'],
    liveUrl: '#',
    githubUrl: '#', // TODO: Add GitHub link
    icon: '🧠',
  },
  {
    id: 'career-ai',
    name: 'Career-AI',
    description:
      'AI-powered career guidance platform that analyzes user profiles, evaluates resumes, and generates personalized career-path and skill-gap recommendations.',
    category: 'ai-ml',
    tags: ['Python', 'NLP', 'Recommendation System', 'FastAPI'],
    liveUrl: '#',
    githubUrl: '#', // TODO: Add GitHub link
    icon: '🎯',
  },
  {
    id: 'geo-vision-gpt',
    name: 'Geo Vision GPT',
    description:
      'SIH Project — Extended GPT-OSS with multimodal vision for ISRO Earth Observation data. First multimodal GPT-OSS concept, scaling into defence, agriculture, climate, and smart cities.',
    category: 'ai-ml',
    tags: ['AI/ML', 'Multimodal', 'Computer Vision', 'Python', 'GPT'],
    liveUrl: '#',
    githubUrl: '#', // TODO: Add GitHub link
    icon: '🛰️',
  },
];
