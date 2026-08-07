/**
 * Skills data and icon mapping.
 * Icons are rasterised WebP: the original SVGs carried embedded bitmaps and
 * totalled ~7MB, which is far too heavy to load into a 3D scene at once.
 */
const iconModules = import.meta.glob('../assetes/skillicons/*.webp', { eager: true });

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'Everything' },
  { id: 'core', label: 'Languages' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'llm', label: 'LLMs & agents' },
  { id: 'data', label: 'Data & stores' },
  { id: 'web', label: 'Web & APIs' },
  { id: 'infra', label: 'Cloud & tooling' },
];

const skillsData = [
  // core
  { name: 'Python',                  icon: 'python.webp',                   category: 'core' },
  { name: 'JavaScript',              icon: 'javascript.webp',               category: 'core' },
  { name: 'Java',                    icon: 'java.webp',                     category: 'core' },
  { name: 'C++',                     icon: 'cpp.webp',                      category: 'core' },
  { name: 'C',                       icon: 'c.webp',                        category: 'core' },

  // ai
  { name: 'Machine Learning',        icon: 'machineLearning.webp',          category: 'ai' },
  { name: 'Deep Learning',           icon: 'deeplearning.webp',             category: 'ai' },
  { name: 'Computer Vision',         icon: 'computerVisionn.webp',          category: 'ai' },
  { name: 'NLP',                     icon: 'nlp-1.webp',                    category: 'ai' },
  { name: 'TensorFlow',              icon: 'tensorflow.webp',               category: 'ai' },
  { name: 'PyTorch',                 icon: 'pytorch.webp',                  category: 'ai' },
  { name: 'Scikit-learn',            icon: 'scikitlearn.webp',              category: 'ai' },
  { name: 'OpenCV',                  icon: 'opencv-svgrepo-com.webp',       category: 'ai' },
  { name: 'Image Segmentation',      icon: 'imagesegmentation.webp',        category: 'ai' },
  { name: 'Object Detection',        icon: 'objectdetection.webp',          category: 'ai' },
  { name: 'Diffusion Models',        icon: 'diffusionModels.webp',          category: 'ai' },
  { name: 'Generative AI',           icon: 'genrativeAI.webp',              category: 'ai' },

  // llm
  { name: 'LangChain',               icon: 'langchain.webp',                category: 'llm' },
  { name: 'LangGraph',               icon: 'langgraph.webp',                category: 'llm' },
  { name: 'LlamaIndex',              icon: 'llamaindex.webp',               category: 'llm' },
  { name: 'CrewAI',                  icon: 'crewai.webp',                   category: 'llm' },
  { name: 'RAG',                     icon: 'rag.webp',                      category: 'llm' },
  { name: 'LLMOps',                  icon: 'llmops.webp',                   category: 'llm' },
  { name: 'Prompt Engineering',      icon: 'promptengineering.webp',        category: 'llm' },
  { name: 'AI Agents',               icon: 'aiagent.webp',                  category: 'llm' },
  { name: 'Chatbot Development',     icon: 'chatbot.webp',                  category: 'llm' },
  { name: 'Hugging Face',            icon: 'hugging-face.webp',             category: 'llm' },
  { name: 'Ollama',                  icon: 'ollama.webp',                   category: 'llm' },

  // data
  { name: 'Pandas',                  icon: 'pandas.webp',                   category: 'data' },
  { name: 'NumPy',                   icon: 'numpy.webp',                    category: 'data' },
  { name: 'Matplotlib',              icon: 'matplotlib.webp',               category: 'data' },
  { name: 'Seaborn',                 icon: 'seaborn.webp',                  category: 'data' },
  { name: 'Kaggle',                  icon: 'kaggle.webp',                   category: 'data' },
  { name: 'Google Colab',            icon: 'googelcolab.webp',              category: 'data' },
  { name: 'MongoDB',                 icon: 'mongoDB.webp',                  category: 'data' },
  { name: 'MySQL',                   icon: 'mysql.webp',                    category: 'data' },
  { name: 'PostgreSQL',              icon: 'postgresql.webp',               category: 'data' },
  { name: 'Weaviate',                icon: 'Weaviate.webp',                 category: 'data' },
  { name: 'Chroma',                  icon: 'chroma.webp',                   category: 'data' },
  { name: 'Pinecone',                icon: 'Pinecone Database.webp',        category: 'data' },

  // web
  { name: 'React',                   icon: 'react.webp',                    category: 'web' },
  { name: 'React Native',            icon: 'react.webp',                    category: 'web' },
  { name: 'Tailwind',                icon: 'tailwind.webp',                 category: 'web' },
  { name: 'MaterialUI',              icon: 'materialui.webp',               category: 'web' },
  { name: 'FastAPI',                 icon: 'fastapi.webp',                  category: 'web' },
  { name: 'Flask',                   icon: 'flask.webp',                    category: 'web' },
  { name: 'Postman',                 icon: 'postman.webp',                  category: 'web' },

  // infra
  { name: 'AWS',                     icon: 'aws.webp',                      category: 'infra' },
  { name: 'Azure',                   icon: 'azure.webp',                    category: 'infra' },
  { name: 'Docker',                  icon: 'docker.webp',                   category: 'infra' },
  { name: 'Kubernetes',              icon: 'kubernetes.webp',               category: 'infra' },
  { name: 'DevOps',                  icon: 'Devops.webp',                   category: 'infra' },
  { name: 'CI/CD',                   icon: 'cicdPipeline.webp',             category: 'infra' },
  { name: 'Git',                     icon: 'git.webp',                      category: 'infra' },
  { name: 'GitHub',                  icon: 'github.webp',                   category: 'infra' },
  { name: 'VS Code',                 icon: 'visual-studio-code.webp',       category: 'infra' },
  { name: 'Firebase',                icon: 'firebase.webp',                 category: 'infra' },
  { name: 'IoT',                     icon: 'iot.webp',                      category: 'infra' },
  { name: 'Arduino',                 icon: 'arduino.webp',                  category: 'infra' },
];

const mappedSkills = skillsData.map((skill) => ({
  name: skill.name,
  category: skill.category,
  skillicon: iconModules[`../assetes/skillicons/${skill.icon}`]?.default || '',
}));

export default mappedSkills;
