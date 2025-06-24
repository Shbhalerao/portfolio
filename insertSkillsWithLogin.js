// Script to insert multiple skills with correct iconClass for homepage
// Run with: node insertSkillsWithLogin.js

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'sbshubham09';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TommyDon@8295';

const skills = [
  { name: 'Java', iconClass: 'FaJava' },
  { name: 'Spring Boot', iconClass: 'FaLeaf' },
  { name: 'React.js', iconClass: 'FaReact' },
  { name: 'JavaScript', iconClass: 'FaJsSquare' },
  { name: 'PostgreSQL', iconClass: 'FaDatabase' },
  { name: 'AWS', iconClass: 'FaAws' },
  // Add more skills as needed
  { name: 'TypeScript', iconClass: 'FaCode' },
  { name: 'Node.js', iconClass: 'FaNodeJs' },
  { name: 'MongoDB', iconClass: 'SiMongodb' },
  { name: 'Docker', iconClass: 'FaDocker' },
  { name: 'Git', iconClass: 'FaGitAlt' },
  { name: 'HTML5', iconClass: 'FaHtml5' },
  { name: 'CSS3', iconClass: 'FaCss3Alt' },
  { name: 'Linux', iconClass: 'FaLinux' },
  { name: 'Redis', iconClass: 'SiRedis' },
  { name: 'GraphQL', iconClass: 'SiGraphql' },
  { name: 'Jenkins', iconClass: 'FaJenkins' },
  { name: 'Kubernetes', iconClass: 'SiKubernetes' },
  { name: 'Nginx', iconClass: 'FaNginx' },
  { name: 'Python', iconClass: 'FaPython' },
];

async function main() {
  try {
    // Login as admin
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
    const token = loginRes.data.token;
    console.log('Admin login successful. Token:', token);

    // Insert each skill
    for (const skill of skills) {
      try {
        const res = await axios.post(
          `${API_URL}/skills`,
          skill,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Inserted skill:', res.data.name, '| iconClass:', res.data.iconClass);
      } catch (err) {
        if (err.response && err.response.status === 400 && err.response.data.message.includes('duplicate')) {
          console.log('Skill already exists:', skill.name);
        } else {
          console.error('Error inserting skill:', skill.name, err.response?.data || err.message);
        }
      }
    }
    console.log('Skill insertion complete.');
  } catch (err) {
    console.error('Admin login failed:', err.response?.data || err.message);
  }
}

main();
