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
  liveStatus?: string;
}

export const projects: Project[] = [
  // Full Stack
  {
    id: 'paywallet',
    name: 'PayWallet',
    description:
      'Cross-border payroll platform with instant payments, escrow, and FX conversion. Built with React + Node.js + MongoDB + Stellar Soroban. Won 3rd prize at hackathon.',
    category: 'full-stack',
    tags: ['React', 'Node.js', 'MongoDB', 'Stellar', 'Soroban'],
    liveUrl: '#',
    liveStatus: 'Soon',
    githubUrl: 'https://github.com/Shreyashio/Stellar-Ragnarok',
    icon: '💳',
    hackathon: '🏆 3rd Prize',
  },
  {
    id: 'intellisec',
    name: 'Intellisec',
    description:
      'AI-driven security compliance and automated vulnerability scanner platform for enterprise repositories.',
    category: 'full-stack',
    tags: ['React', 'Node.js', 'Python', 'Security'],
    liveUrl: '#',
    liveStatus: 'Soon',
    githubUrl: 'https://github.com/Shreyashio/Shree-Guru-Tegbahadursingh_22',
    icon: '🛡️',
  },

  // Blockchain
  {
    id: 'ipx-market',
    name: 'IPX-Market',
    description:
      'Decentralized marketplace for trading datasets and ML models as digital assets with on-chain transaction handling.',
    category: 'blockchain',
    tags: ['Solidity', 'Smart Contracts', 'IPFS', 'React', 'Ethers.js'],
    liveUrl: 'https://v0-storypixmarket-an.vercel.app',
    githubUrl: 'https://github.com/Shreyashio/IPX-market',
    icon: '🔗',
    hackathon: '🏆 3rd Prize',
  },
  {
    id: 'matkanight',
    name: 'MatkaNight',
    description:
      'Web3 gaming and decentralized prediction market protocol built on smart contracts.',
    category: 'blockchain',
    tags: ['Solidity', 'Web3', 'React', 'Smart Contracts'],
    liveUrl: 'https://matkanight.vercel.app/',
    githubUrl: 'https://github.com/Shreyashio/MatkaNight_',
    icon: '🎲',
  },
  {
    id: 'rupeelink',
    name: 'RupeeLink',
    description:
      'Decentralized fiat-to-crypto gateway and high-throughput payment protocol built for the Monad ecosystem.',
    category: 'blockchain',
    tags: ['Monad', 'Solidity', 'React', 'DeFi'],
    liveUrl: 'https://rupeelink.vercel.app',
    githubUrl: 'https://github.com/Shreyashio/Rupee-Link-Monad',
    icon: '💱',
  },

  // AI/ML
  {
    id: 'mini-llm',
    name: 'Mini LLM',
    description:
      'Fine-tuned GPT-2 on custom domain datasets to explore adaptation, Hugging Face Transformers, and local PyTorch inference.',
    category: 'ai-ml',
    tags: ['Python', 'Hugging Face', 'GPT-2', 'PyTorch'],
    liveUrl: '#',
    liveStatus: 'Not Deployed',
    githubUrl: 'https://github.com/Shreyashio/mini-llm-gpt2',
    icon: '🧠',
  },
  {
    id: 'career-ai',
    name: 'Career AI',
    description:
      'AI-powered career guidance engine that evaluates profiles, analyzes resumes, and builds personalized skill-gap roadmaps.',
    category: 'ai-ml',
    tags: ['Python', 'NLP', 'Recommendation System', 'FastAPI'],
    liveUrl: '#',
    liveStatus: 'Soon',
    githubUrl: 'https://github.com/Shreyashio/Career-AI',
    icon: '🎯',
  },
  {
    id: 'geo-vision-gpt',
    name: 'Geo Vision GPT',
    description:
      'SIH Project — Multimodal vision GPT model customized for ISRO Earth Observation satellite data.',
    category: 'ai-ml',
    tags: ['AI/ML', 'Multimodal', 'Computer Vision', 'Python', 'GPT'],
    liveUrl: '#',
    liveStatus: 'Soon',
    githubUrl: 'https://github.com/Shreyashio/Geo-Vision-GPT',
    icon: '🛰️',
  },
];
