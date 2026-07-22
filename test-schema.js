try {
  require('ts-node/register');
  require('./sanity/schemas/index.ts');
  console.log('SUCCESS');
} catch (e) {
  console.error(e);
}
