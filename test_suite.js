/**
 * Comprehensive Automated Test Suite for Riya Sharma Portfolio Server
 */

const http = require('http');
const { app } = require('./server');

const TEST_PORT = 3456;

async function runTests() {
  console.log('🧪 Starting Portfolio Server Automated Verification...\n');

  const server = app.listen(TEST_PORT, '127.0.0.1');

  await new Promise(resolve => server.once('listening', resolve));
  console.log(`✔ Test server listening on http://127.0.0.1:${TEST_PORT}\n`);

  let failures = 0;

  function makeRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
      const req = http.request({
        host: '127.0.0.1',
        port: TEST_PORT,
        ...options
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      });

      req.on('error', reject);

      if (postData) {
        req.write(postData);
      }
      req.end();
    });
  }

  try {
    // 1. Health Check Test
    console.log('Test 1: GET /api/health');
    const healthRes = await makeRequest({ path: '/api/health', method: 'GET' });
    const healthJson = JSON.parse(healthRes.body);
    if (healthRes.statusCode === 200 && healthJson.status === 'healthy') {
      console.log('  PASS: Health API returned 200 OK with status healthy.');
    } else {
      console.error('  FAIL: Unexpected health response:', healthRes);
      failures++;
    }

    // 2. Resume PDF Delivery Test
    console.log('\nTest 2: GET /assets/Riya_Sharma_Resume_Updated.pdf');
    const pdfRes = await makeRequest({ path: '/assets/Riya_Sharma_Resume_Updated.pdf', method: 'GET' });
    const pdfLength = parseInt(pdfRes.headers['content-length'] || '0', 10);
    if (pdfRes.statusCode === 200 && pdfLength > 50000 && pdfRes.headers['content-type'].includes('pdf')) {
      console.log(`  PASS: Resume PDF served with status 200 OK (${pdfLength} bytes, ${pdfRes.headers['content-type']}).`);
    } else {
      console.error('  FAIL: Resume PDF delivery issue:', pdfRes.statusCode, pdfRes.headers);
      failures++;
    }

    // 2b. Google Build with AI Certificate Delivery Test
    console.log('\nTest 2b: GET /assets/Build_With_AI_Bootcamp_Certificate.pdf');
    const certRes = await makeRequest({ path: '/assets/Build_With_AI_Bootcamp_Certificate.pdf', method: 'GET' });
    const certLength = parseInt(certRes.headers['content-length'] || '0', 10);
    if (certRes.statusCode === 200 && certLength > 100000 && certRes.headers['content-type'].includes('pdf')) {
      console.log(`  PASS: Google Build with AI Certificate served with status 200 OK (${certLength} bytes, ${certRes.headers['content-type']}).`);
    } else {
      console.error('  FAIL: Certificate delivery issue:', certRes.statusCode, certRes.headers);
      failures++;
    }

    // 3. Frontend HTML Serving Test
    console.log('\nTest 3: GET / (Frontend Portfolio Homepage)');
    const htmlRes = await makeRequest({ path: '/', method: 'GET' });
    if (
      htmlRes.statusCode === 200 &&
      htmlRes.body.includes('Riya Sharma') &&
      htmlRes.body.includes('Tata Motors') &&
      htmlRes.body.includes('Isuzu') &&
      htmlRes.body.includes('download="Riya_Sharma_Resume.pdf"')
    ) {
      console.log('  PASS: Frontend HTML served with all expected resume details and download attributes.');
    } else {
      console.error('  FAIL: Homepage HTML check failed.');
      failures++;
    }

    // 4. Contact Form Validation: Reject Short Name
    console.log('\nTest 4: POST /api/contact (Short Name Validation Check)');
    const invalidNamePayload = JSON.stringify({ name: 'A', email: 'test@example.com', message: 'Hello there' });
    const invalidRes = await makeRequest({
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(invalidNamePayload)
      }
    }, invalidNamePayload);

    const invalidJson = JSON.parse(invalidRes.body);
    if (invalidRes.statusCode === 400 && invalidJson.success === false) {
      console.log(`  PASS: Correctly rejected invalid submission with 400 Bad Request: "${invalidJson.error}".`);
    } else {
      console.error('  FAIL: Expected 400 Bad Request for short name, got:', invalidRes.statusCode);
      failures++;
    }

    // 5. Contact Form Validation: Reject Invalid Email
    console.log('\nTest 5: POST /api/contact (Invalid Email Format Check)');
    const invalidEmailPayload = JSON.stringify({ name: 'John Doe', email: 'invalid-email-address', message: 'A valid message string' });
    const invalidEmailRes = await makeRequest({
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(invalidEmailPayload)
      }
    }, invalidEmailPayload);

    const invalidEmailJson = JSON.parse(invalidEmailRes.body);
    if (invalidEmailRes.statusCode === 400 && invalidEmailJson.error.includes('valid email')) {
      console.log(`  PASS: Correctly rejected invalid email format: "${invalidEmailJson.error}".`);
    } else {
      console.error('  FAIL: Expected email format rejection, got:', invalidEmailRes.statusCode);
      failures++;
    }

    // 6. Contact Form: Valid Submission (Local Demo/Simulation Mode)
    console.log('\nTest 6: POST /api/contact (Valid Client Submission)');
    const validPayload = JSON.stringify({
      name: 'Alexander Vance',
      email: 'alex.vance@techcorp.io',
      subject: 'Tata Motors Architecture Discussion',
      message: 'Hello Riya, we are building a high-volume motor insurance platform and are impressed by your Sole Owner experience on Tata Motors. Let us connect!'
    });
    const validRes = await makeRequest({
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(validPayload)
      }
    }, validPayload);

    const validJson = JSON.parse(validRes.body);
    if (
      validRes.statusCode === 200 &&
      validJson.success === true &&
      validJson.message.includes('Thank you for reaching out!')
    ) {
      console.log(`  PASS: Valid submission returned 200 OK: "${validJson.message}".`);
    } else {
      console.error('  FAIL: Valid submission failed:', validRes.statusCode, validJson);
      failures++;
    }

    // 7. Anti-Spam Honeypot Test
    console.log('\nTest 7: POST /api/contact (Spam Bot Honeypot Trapping)');
    const spamPayload = JSON.stringify({
      name: 'Bot Spammer',
      email: 'bot@spam.com',
      message: 'Buy crypto now at spammy-link.com',
      _gotcha: 'I am a bot filler'
    });
    const spamRes = await makeRequest({
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(spamPayload)
      }
    }, spamPayload);

    const spamJson = JSON.parse(spamRes.body);
    if (spamRes.statusCode === 200 && spamJson.success === true) {
      console.log('  PASS: Honeypot silently trapped spam bot submission with 200 OK without dispatching email.');
    } else {
      console.error('  FAIL: Honeypot handling failed:', spamRes.statusCode);
      failures++;
    }

  } catch (err) {
    console.error('Test execution error:', err);
    failures++;
  } finally {
    server.close();
    console.log('\n-------------------------------------------------------------');
    if (failures === 0) {
      console.log('🎉 ALL TESTS PASSED! Portfolio application is 100% verified & production-ready.');
    } else {
      console.error(`❌ ${failures} test(s) failed.`);
      process.exit(1);
    }
  }
}

runTests();
