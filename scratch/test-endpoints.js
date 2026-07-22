/**
 * Smaily & Telegram API Endpoints Integration Test Script
 * 
 * This script sends mock requests to all of our configured Next.js API routes 
 * to verify they process submissions and talk to Smaily correctly.
 * 
 * How to run:
 *   1. Make sure your local Next.js dev server is running (e.g. at http://localhost:3000)
 *   2. Run this script using Node.js:
 *      node scratch/test-endpoints.js
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const testCases = [
  {
    name: '1. Smaily Direct Subscription API (/api/smaily)',
    path: '/api/smaily',
    payload: {
      email: 'test-direct-subscriber@example.com',
      name: 'Test Direct Subscriber'
    }
  },
  {
    name: '2. General Email Lead Magnet (/api/telegram-lead)',
    path: '/api/telegram-lead',
    payload: {
      email: 'test-lead-magnet@example.com',
      source: 'nine-days-program',
      company: '' // honeypot
    }
  },
  {
    name: '3. Contact Form Submission (/api/telegram-lead)',
    path: '/api/telegram-lead',
    payload: {
      contact: 'test-contact@example.com',
      message: 'This is a test message from our automated integration suite.',
      source: 'contact-page',
      company: '' // honeypot
    }
  },
  {
    name: '4. Töötukassa Grant Inquiry (/api/grant-inquiry)',
    path: '/api/grant-inquiry',
    payload: {
      name: 'Test Grant User',
      email: 'test-grant@example.com',
      isikukood: '39001010000',
      company: '' // honeypot
    }
  },
  {
    name: '5. Course Registration Form (/api/course-registration)',
    path: '/api/course-registration',
    payload: {
      name: 'Test Student',
      email: 'test-student@example.com',
      phone: '+3725555555',
      note: 'Looking forward to the course starting.',
      cohort: 'autumn-2026',
      marketingConsent: true,
      company: '' // honeypot
    }
  },
  {
    name: '6. Tootmisaudit Quiz Submission (/api/quiz-submit)',
    path: '/api/quiz-submit',
    payload: {
      name: 'Test Quiz Taker',
      email: 'test-quiz@example.com',
      answers: [
        { question: 'Kas tootmine on digitaliseeritud?', selectedOption: 'Jah, osaliselt' },
        { question: 'Mis on peamine pudelikael?', selectedOption: 'Materjali planeerimine' }
      ]
    }
  }
];

function postJSON(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: body
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('================================================================');
  console.log(`🚀 Starting Smaily & Telegram API Endpoint Verification Suite`);
  console.log(`📡 Connecting to http://${HOST}:${PORT}`);
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    console.log(`👉 Testing: ${tc.name}`);
    console.log(`   Path: ${tc.path}`);
    console.log(`   Payload: ${JSON.stringify(tc.payload, null, 2).replace(/\n/g, '\n   ')}`);
    
    try {
      const response = await postJSON(tc.path, tc.payload);
      
      console.log(`   Status: [${response.statusCode}]`);
      console.log(`   Response: ${response.body}`);
      
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(`   ✅ PASS\n`);
        passed++;
      } else {
        console.log(`   ❌ FAIL\n`);
        failed++;
      }
    } catch (err) {
      console.log(`   ❌ ERROR: Cannot connect to server.`);
      console.log(`      Make sure "npm run dev" is running on port ${PORT}.\n`);
      failed++;
    }
  }

  console.log('================================================================');
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('================================================================');
}

runTests();
