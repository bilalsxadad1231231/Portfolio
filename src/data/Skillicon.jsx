/**
 * Skills data and icon mapping for the portfolio
 * Uses Vite's glob import to automatically import all SVG icons
 */

// Import all SVG icons from the skill folder
const skillIcons = import.meta.glob('../assetes/skill/*.svg', { eager: true });

// Provided skills data with their corresponding icon filenames
const skillsData = [
  // Core Programming Languages
  { name: 'Python', icon: 'python.svg' },
  { name: 'JavaScript', icon: 'javascript.svg' },
  { name: 'Java', icon: 'java.svg' },
  { name: 'C++', icon: 'cpp.svg' },
  { name: 'C', icon: 'c.svg' },

  // AI & ML Core
  { name: 'Machine Learning', icon: 'machineLearning.svg' },
  { name: 'Deep Learning', icon: 'deeplearning.svg' },
  { name: 'Computer Vision', icon: 'computerVisionn.svg' },
  { name: 'NLP', icon: 'nlp-1.svg' },
  { name: 'TensorFlow', icon: 'tensorflow.svg' },
  { name: 'PyTorch', icon: 'pytorch.svg' },
  { name: 'Scikit-learn', icon: 'scikitlearn.svg' },
  { name: 'OpenCV', icon: 'opencv-svgrepo-com.svg' },
  { name: 'Image Segmentation', icon: 'imagesegmentation.svg' },
  { name: 'Object Detection', icon: 'objectdetection.svg' },
  { name: 'Diffusion Models', icon: 'diffusionModels.svg' },
  { name: 'Generative AI', icon: 'genrativeAI.svg' },

  // Modern AI Tools
  { name: 'LangChain', icon: 'langchain.svg' },
  { name: 'LangGraph', icon: 'langgraph.svg' },
  { name: 'LlamaIndex', icon: 'llamaindex.svg' },
  { name: 'CrewAI', icon: 'crewai.svg' },
  { name: 'RAG', icon: 'rag.svg' },
  { name: 'LLMOps', icon: 'llmops.svg' },
  { name: 'Prompt Engineering', icon: 'promptengineering.svg' },
  { name: 'AI Agents', icon: 'aiagent.svg' },
  { name: 'Chatbot Development', icon: 'chatbot.svg' },
  { name: 'Hugging Face', icon: 'hugging-face.svg' },
  { name: 'Ollama', icon: 'ollama.svg' },

  // Data Science Stack
  { name: 'Pandas', icon: 'pandas.svg' },
  { name: 'NumPy', icon: 'numpy.svg' },
  { name: 'Matplotlib', icon: 'matplotlib.svg' },
  { name: 'Seaborn', icon: 'seaborn.svg' },
  { name: 'Kaggle', icon: 'kaggle.svg' },
  { name: 'Google Colab', icon: 'googelcolab.svg' },

  // Web Development
  { name: 'React', icon: 'react.svg' },
  { name: 'React Native', icon: 'react.svg' },
  { name: 'Tailwind', icon: 'tailwind.svg' },
  { name: 'MaterialUI', icon: 'materialui.svg' },

  // Backend & APIs
  { name: 'FastAPI', icon: 'fastapi.svg' },
  { name: 'Flask', icon: 'flask.svg' },
  { name: 'Postman', icon: 'postman.svg' },

  // Databases
  { name: 'MongoDB', icon: 'mongoDB.svg' },
  { name: 'MySQL', icon: 'mysql.svg' },
  { name: 'PostgreSQL', icon: 'postgresql.svg' },
  { name: 'Weaviate', icon: 'Weaviate.svg' },
  { name: 'Chroma', icon: 'chroma.svg' },
  { name: 'Pinecone', icon: 'Pinecone Database.svg' },

  // Cloud & DevOps
  { name: 'AWS', icon: 'aws.svg' },
  { name: 'Azure', icon: 'azure.svg' },
  { name: 'Docker', icon: 'docker.svg' },
  { name: 'Kubernetes', icon: 'kubernetes.svg' },
  { name: 'DevOps', icon: 'Devops.svg' },
  { name: 'CI/CD', icon: 'cicdPipeline.svg' },

  // Development Tools
  { name: 'Git', icon: 'git.svg' },
  { name: 'GitHub', icon: 'github.svg' },
  { name: 'VS Code', icon: 'visual-studio-code.svg' },
  { name: 'Firebase', icon: 'firebase.svg' },

  // IoT & Hardware
  { name: 'IoT', icon: 'iot.svg' },
  { name: 'Arduino', icon: 'arduino.svg' },
];

// Map skills data to their corresponding icons
const mappedSkills = skillsData.map((skill) => {
  const iconPath = `../assetes/skill/${skill.icon}`;
  return {
    name: skill.name,
    skillicon: skillIcons[iconPath]?.default || ''
  };
});

export default mappedSkills;