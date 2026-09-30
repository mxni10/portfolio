// Security verification script for the Portfolio
// Run from the project root: node verify_security.mjs
//
// What this checks:
//   1. dist/ does NOT contain any secret keys (SERVICE_ROLE_KEY, etc.)

import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

let allPassed = true

function pass(msg) { console.log(`  ✅ PASS: ${msg}`) }
function fail(msg) { console.error(`  ❌ FAIL: ${msg}`); allPassed = false }

// ── Helper: search all files in a dir recursively for a pattern ───────────────
function grepDir(dir, pattern) {
  const matches = []
  function walk(current) {
    let entries
    try { entries = readdirSync(current) } catch { return }
    for (const entry of entries) {
      const full = join(current, entry)
      let stat
      try { stat = statSync(full) } catch { continue }
      if (stat.isDirectory()) { walk(full); continue }
      try {
        const content = readFileSync(full, 'utf8')
        if (pattern.test(content)) matches.push(full)
      } catch { /* binary file, skip */ }
    }
  }
  walk(dir)
  return matches
}

console.log('\n══════════════════════════════════════════════')
console.log('  Portfolio — Security Verification')
console.log('══════════════════════════════════════════════\n')

// ── Test 1: SERVICE_ROLE_KEY not in dist/ ────────────────────────────────────
console.log('Test 1: SUPABASE_SERVICE_ROLE_KEY not embedded in JS bundle (dist/)')
try {
  const hits = grepDir('./dist', /SERVICE_ROLE_KEY|service_role/)
  if (hits.length === 0) {
    pass('SUPABASE_SERVICE_ROLE_KEY not found in dist/ — secret is safe.')
  } else {
    fail(`SERVICE_ROLE_KEY found in build output: ${hits.join(', ')}`)
  }
} catch {
  console.warn('  ⚠️  dist/ not found — run vite build first, then recheck Test 1.')
}

// ── Result ────────────────────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════════════')
if (allPassed) {
  console.log('  ✅ ALL STATIC CHECKS PASSED')
} else {
  console.log('  ❌ SOME CHECKS FAILED — review the failures above before deploying.')
}
console.log('══════════════════════════════════════════════\n')
