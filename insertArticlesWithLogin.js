// Script to log in as admin and insert dummy Medium articles into the backend
// Usage: node insertArticlesWithLogin.js

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin' };

const articles = [
  {
    title: 'Database Design: Normalization vs Denormalization',
    mediumUrl: 'https://medium.com/@sbshubham09/database-design-normalization-vs-denormalization-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'Does your application need normalized database or a denormalized one, let’s find out.'
  },
  {
    title: 'API Design: How to Design Extensible APIs',
    mediumUrl: 'https://medium.com/@sbshubham09/api-design-how-to-design-extensible-apis-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'Design and build your APIs like a senior developer.'
  },
  {
    title: 'Spring Boot DevTools — Speed up your development',
    mediumUrl: 'https://medium.com/@sbshubham09/spring-boot-devtools-speed-up-your-development-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'DevTools is a dependency readily available in Spring boot. It’s main purpose is to make your life easier, unlike your manager.'
  },
  {
    title: 'Should We Disable CSRF in Spring Security? — Explained in 2 Minutes',
    mediumUrl: 'https://medium.com/@sbshubham09/should-we-disable-csrf-in-spring-security-explained-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'What is CSRF? And How to keep your application secure.'
  },
  {
    title: '@Component vs @Bean: How to use it?',
    mediumUrl: 'https://medium.com/@sbshubham09/component-vs-bean-how-to-use-it-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'How to use @Component or @Bean — Let’s understand in a simple way.'
  },
  {
    title: 'CAPTCHA: How Does a Machine Decide If You’re Human Or Not!',
    mediumUrl: 'https://medium.com/@sbshubham09/captcha-how-does-a-machine-decide-if-youre-human-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'How does captcha know that you are actually a human, let\'s understand!'
  },
  {
    title: 'Streams Vs Loops: Which One to Choose? — Explained in 1 Minute',
    mediumUrl: 'https://medium.com/@sbshubham09/streams-vs-loops-which-one-to-choose-explained-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'Streams or Loops — Let’s break down when to use what!'
  },
  {
    title: 'Deepfakes: How to Spot one and Protect Yourself from AI-Generated Media',
    mediumUrl: 'https://medium.com/@sbshubham09/deepfakes-how-to-spot-one-and-protect-yourself-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'It’s important to defend ourselves against Deepfakes, Let’s understand how.'
  },
  {
    title: 'What is CAP Theorem and Why Should You Care? — Explained in 1 Minute',
    mediumUrl: 'https://medium.com/@sbshubham09/what-is-cap-theorem-and-why-should-you-care-explained-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'You should know about CAP Theorem if you’re working with distributed databases. It gives you an idea about what is possible and what is…'
  },
  {
    title: 'The Future of Search: Will AI Replace Google?',
    mediumUrl: 'https://medium.com/@sbshubham09/the-future-of-search-will-ai-replace-google-123456',
    imageUrl: 'https://miro.medium.com/v2/resize:fill:96:96/1*EDjO1LhSuN_DUskOnZy2Lw.jpeg',
    excerpt: 'Is Google search still relevant? or should we move to AI alternatives?'
  }
];

async function main() {
  try {
    // 1. Log in as admin
    const loginRes = await axios.post(`${API_URL}/auth/login`, ADMIN_CREDENTIALS);
    const token = loginRes.data.token;
    if (!token) throw new Error('No token received from login');
    console.log('Admin login successful. Inserting articles...');

    // 2. Insert articles
    for (const article of articles) {
      try {
        await axios.post(`${API_URL}/articles`, article, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`Inserted: ${article.title}`);
      } catch (err) {
        console.error(`Failed to insert: ${article.title}`, err.response?.data || err.message);
      }
    }
  } catch (err) {
    console.error('Admin login failed:', err.response?.data || err.message);
  }
}

main();
