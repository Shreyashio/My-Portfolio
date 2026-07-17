export interface TechItem {
  label: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Blockchain' | 'AI/ML & Data';
  since?: string;
}

export const techStack: TechItem[] = [
  // Frontend
  { label: 'React', icon: '⚛️', category: 'Frontend', since: '2022' },
  { label: 'Next.js', icon: '▲', category: 'Frontend', since: '2023' },
  { label: 'TypeScript', icon: '🔷', category: 'Frontend', since: '2022' },
  { label: 'JavaScript', icon: '🟡', category: 'Frontend', since: '2021' },
  { label: 'HTML', icon: '🌐', category: 'Frontend', since: '2020' },
  { label: 'CSS', icon: '🎨', category: 'Frontend', since: '2020' },
  { label: 'Flutter', icon: '💙', category: 'Frontend', since: '2023' },

  // Backend
  { label: 'Node.js', icon: '🟢', category: 'Backend', since: '2022' },
  { label: 'Express.js', icon: '🚂', category: 'Backend', since: '2022' },
  { label: 'Python', icon: '🐍', category: 'Backend', since: '2021' },
  { label: 'Java', icon: '☕', category: 'Backend', since: '2021' },
  { label: 'Rust', icon: '🦀', category: 'Backend', since: '2024' },
  { label: 'MongoDB', icon: '🍃', category: 'Backend', since: '2022' },
  { label: 'SQL', icon: '🗄️', category: 'Backend', since: '2021' },
  { label: 'Docker', icon: '🐳', category: 'Backend', since: '2023' },

  // Blockchain
  { label: 'Solidity', icon: '💎', category: 'Blockchain', since: '2023' },
  { label: 'Stellar', icon: '⭐', category: 'Blockchain', since: '2023' },
  { label: 'Soroban', icon: '🔮', category: 'Blockchain', since: '2024' },
  { label: 'Smart Contracts', icon: '📜', category: 'Blockchain', since: '2023' },

  // AI/ML
  { label: 'PyTorch', icon: '🔥', category: 'AI/ML & Data', since: '2023' },
  { label: 'TensorFlow', icon: '🧩', category: 'AI/ML & Data', since: '2023' },
  { label: 'Hugging Face', icon: '🤗', category: 'AI/ML & Data', since: '2023' },
  { label: 'Pandas', icon: '🐼', category: 'AI/ML & Data', since: '2022' },
  { label: 'NumPy', icon: '🔢', category: 'AI/ML & Data', since: '2022' },
];
