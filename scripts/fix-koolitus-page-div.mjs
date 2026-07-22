import fs from 'node:fs'

const D = String.fromCharCode(100, 105, 118)
const p = 'src/app/(marketing)/koolitus/page.tsx'
let s = fs.readFileSync(p, 'utf8')

s = s.replace(
  `  return (
    <${'motion'}>
      data-page-builder={pb.usePageBuilder ? 'on' : 'off'}
    >`,
  `  return (
    <${D}
      className="marketing-page-shell"
      data-page-builder={pb.usePageBuilder ? 'on' : 'off'}
    >`,
)

s = s.replaceAll(`<${'motion'}>`, `<${D}>`).replaceAll(`</${'motion'}>`, `</${D}>`)

fs.writeFileSync(p, s)
console.log('ok')
