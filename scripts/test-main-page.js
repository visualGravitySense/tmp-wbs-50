/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'buc8lir0',
  dataset: 'andres-prod',
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function testMainPage() {
  try {
    console.log('Testing main page query...');
    
    const query = `*[_type == "mainPage"][0]{
      title,
      eyebrow,
      headline,
      scriptHeadline,
      subtitle,
      primaryCta,
      secondaryCta,
      socialProof,
      stats,
      features,
      partnersTitle
    }`;
    
    const result = await client.fetch(query);
    
    if (result) {
      console.log('✅ Main page found!');
      console.log('Title:', result.title);
      console.log('Headline:', result.headline);
      console.log('Features count:', result.features?.length || 0);
      console.log('Stats count:', result.stats?.length || 0);
    } else {
      console.log('❌ No main page found. Please create one in Sanity Studio.');
    }
  } catch (error) {
    console.error('Error testing main page:', error.message);
  }
}

testMainPage();
