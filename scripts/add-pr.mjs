#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, "../src/data/pullRequests.json");

const rawUrl = process.argv[2];
const customTitle = process.argv[3];
const customSubsystem = process.argv[4];
const customStatus = process.argv[5] || "open";

if (!rawUrl) {
  console.log(`\nUsage: npm run pr:add <PR_URL> [title] [subsystem] [status]`);
  console.log(`Example:`);
  console.log(`  npm run pr:add https://git.owaspblt.org/BLT/pull/80 "blt-auth: fix jwt expiration handling" "blt-auth" approved\n`);
  process.exit(1);
}

try {
  const parsed = new URL(rawUrl.trim());
  let newPr = null;

  // OWASP BLT Forge (git.owaspblt.org)
  if (parsed.hostname.includes("owaspblt.org")) {
    const match = parsed.pathname.match(/\/([^/]+)\/pull\/(\d+)/i);
    if (!match) {
      console.error("Invalid OWASP BLT URL format. Expected: https://git.owaspblt.org/<repo>/pull/<num>");
      process.exit(1);
    }
    const repoName = match[1];
    const prNumber = parseInt(match[2], 10);
    newPr = {
      id: `blt-${prNumber}`,
      number: prNumber,
      repo: `OWASP/${repoName}`,
      repoUrl: `https://${parsed.hostname}/${repoName}`,
      subsystem: customSubsystem || "blt-core",
      title: customTitle || `BLT: Pull Request #${prNumber}`,
      url: rawUrl.trim(),
      status: customStatus,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      forge: "ForkMesh",
    };
  } else if (parsed.hostname.includes("github.com")) {
    const match = parsed.pathname.match(/\/([^/]+)\/([^/]+)\/pull\/(\d+)/i);
    if (!match) {
      console.error("Invalid GitHub URL format. Expected: https://github.com/<owner>/<repo>/pull/<num>");
      process.exit(1);
    }
    const org = match[1];
    const repo = match[2];
    const prNumber = parseInt(match[3], 10);
    newPr = {
      id: `gh-${prNumber}`,
      number: prNumber,
      repo: `${org}/${repo}`,
      repoUrl: `https://github.com/${org}/${repo}`,
      subsystem: customSubsystem || repo,
      title: customTitle || `${repo}: Pull Request #${prNumber}`,
      url: rawUrl.trim(),
      status: customStatus,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      forge: "GitHub OWASP",
    };
  } else {
    console.error("Unsupported forge. Supported domains: git.owaspblt.org, github.com");
    process.exit(1);
  }

  // Read existing JSON file
  const prs = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  // Check for duplicate PR number
  if (prs.some((p) => p.number === newPr.number && p.repo === newPr.repo)) {
    console.warn(`⚠️ PR #${newPr.number} on ${newPr.repo} already exists in pullRequests.json!`);
    process.exit(0);
  }

  // Prepend to array
  prs.unshift(newPr);
  fs.writeFileSync(DATA_FILE, JSON.stringify(prs, null, 2) + "\n", "utf-8");

  console.log(`\n✅ Successfully added Pull Request #${newPr.number} to pullRequests.json:`);
  console.log(`   Repo:      ${newPr.repo}`);
  console.log(`   Title:     ${newPr.title}`);
  console.log(`   Subsystem: ${newPr.subsystem}`);
  console.log(`   Status:    ${newPr.status}`);
  console.log(`   Forge:     ${newPr.forge}`);
  console.log(`   URL:       ${newPr.url}\n`);
} catch (err) {
  console.error("Error adding PR:", err.message);
  process.exit(1);
}
