// Import all SVG icons from the skill folder
import awsIcon from '../assets/Skill/aws.svg';
import bootstrapIcon from '../assets/Skill/bootstrap.svg';
import cssIcon from '../assets/Skill/css.svg';
import dockerIcon from '../assets/Skill/docker.svg';
import firebaseIcon from '../assets/Skill/firebase.svg';
import gitIcon from '../assets/Skill/git.svg';
import htmlIcon from '../assets/Skill/html.svg';
import javascriptIcon from '../assets/Skill/javascript.svg';
import materialuiIcon from '../assets/Skill/materialui.svg';
import mongoDBIcon from '../assets/Skill/mongoDB.svg';
import mysqlIcon from '../assets/Skill/mysql.svg';
import nextJSIcon from '../assets/Skill/nextJS.svg';
import reactIcon from '../assets/Skill/react.svg';
import tailwindIcon from '../assets/Skill/tailwind.svg';

// Provided skills data
const skillsData = [
  'HTML',
  'CSS',
  'Javascript',
  'Typescript',
  'React',
  'Next JS',
  'Tailwind',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Git',
  'AWS',
  'Bootstrap',
  'Docker',
  'Go',
  'Figma',
  'Firebase',
  'MaterialUI',
  'Nginx',
  'Strapi'
];

// Map skillsData to their corresponding icons
const skillIcons = skillsData.map((skill) => {
  switch (skill.toLowerCase()) {
    case 'html':
      return { name: skill, skillicon: htmlIcon };
    case 'css':
      return { name: skill, skillicon: cssIcon };
    case 'javascript':
      return { name: skill, skillicon: javascriptIcon };
    case 'typescript':
      return { name: skill, skillicon: 'typescript.svg' }; // Add the icon if available
    case 'react':
      return { name: skill, skillicon: reactIcon };
    case 'next js':
      return { name: skill, skillicon: nextJSIcon };
    case 'tailwind':
      return { name: skill, skillicon: tailwindIcon };
    case 'mongodb':
      return { name: skill, skillicon: mongoDBIcon };
    case 'mysql':
      return { name: skill, skillicon: mysqlIcon };
    case 'postgresql':
      return { name: skill, skillicon: 'postgresql.svg' }; // Add the icon if available
    case 'git':
      return { name: skill, skillicon: gitIcon };
    case 'aws':
      return { name: skill, skillicon: awsIcon };
    case 'bootstrap':
      return { name: skill, skillicon: bootstrapIcon };
    case 'docker':
      return { name: skill, skillicon: dockerIcon };
    case 'go':
      return { name: skill, skillicon: 'go.svg' }; // Add the icon if available
    case 'figma':
      return { name: skill, skillicon: 'figma.svg' }; // Add the icon if available
    case 'firebase':
      return { name: skill, skillicon: firebaseIcon };
    case 'materialui':
      return { name: skill, skillicon: materialuiIcon };
    case 'nginx':
      return { name: skill, skillicon: 'nginx.svg' }; // Add the icon if available
    case 'strapi':
      return { name: skill, skillicon: 'strapi.svg' }; // Add the icon if available
    default:
      return { name: skill, skillicon: '' }; // Fallback for missing icons
  }
});

// Export the JSON object
export default skillIcons;