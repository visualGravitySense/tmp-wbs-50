const BASE_URL = 'http://localhost:3000';

async function testEndpoint(path, payload) {
  console.log(`\nTesting POST ${path}...`);
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.error(`Error testing ${path}:`, err.message);
    return { ok: false, error: err.message };
  }
}

async function run() {
  console.log('Starting Smaily integration testing...');

  // 1. Hero Form test
  await testEndpoint('/api/telegram-lead', {
    email: 'test-hero-smaily@example.com',
    source: 'hero-vaata-programmi',
    company: ''
  });

  // 2. Program Tabs Form test
  await testEndpoint('/api/telegram-lead', {
    email: 'test-tabs-smaily@example.com',
    source: 'opstar_profit_program',
    company: ''
  });

  // 3. Quiz submit test
  await testEndpoint('/api/quiz-submit', {
    name: 'Test Quiz Smaily',
    email: 'test-quiz-smaily@example.com',
    answers: [
      { question: 'Mis on teie tootmise peamine kitsaskoht täna?', selectedOption: 'Tarnekindlus (lubatud tähtaegadest mittekinnipidamine)' },
      { question: 'Kuidas teostate tootmise planeerimist ja graafikute koostamist?', selectedOption: 'Exceli tabelites (mis nõuavad pidevat igapäevast käsitööd)' }
    ]
  });

  // 4. Grant inquiry test
  await testEndpoint('/api/grant-inquiry', {
    name: 'Test Grant Smaily',
    email: 'test-grant-smaily@example.com',
    isikukood: '39001010000',
    company: ''
  });

  // 5. Course registration test
  await testEndpoint('/api/course-registration', {
    name: 'Test Register Smaily',
    email: 'test-register-smaily@example.com',
    phone: '+3725555555',
    note: 'Test Smaily integration note',
    cohort: '2026-spring-cohort',
    marketingConsent: true,
    company: ''
  });

  console.log('\nTesting complete.');
}

run();
