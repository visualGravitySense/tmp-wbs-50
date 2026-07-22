/**
 * Fail fast if @portabletext/react is missing (required for blog Portable Text).
 * Run: npm run verify:portabletext
 */
import('@portabletext/react')
  .then(() => {
    console.log('@portabletext/react: OK')
  })
  .catch((err) => {
    console.error(
      '@portabletext/react is not installed — blog body rendering will break. Install with: npm install @portabletext/react',
    )
    console.error(err)
    process.exit(1)
  })
