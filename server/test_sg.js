const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'bobburr80@gmail.com',
  from: 'admin@beaconmomentum.com',
  subject: 'SendGrid Test',
  html: '<strong>Test</strong>',
};
sgMail.send(msg).then((r) => {console.log('✅ SENT:', r[0].statusCode);}).catch((e) => {console.error('❌ ERROR:', e.response ? e.response.body : e);});
