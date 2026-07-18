import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFileSync, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const EXPORT_DIR = join(__dirname, "..", "docs", "design", "exports");

const screens = [
  {
    name: "01-tela-resultado.png",
    url: "http://localhost:3000",
    // After rendering, we'll navigate by clicking buttons to reach each screen
  },
];

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1440, height: 900 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  mkdirSync(EXPORT_DIR, { recursive: true });

  // Navigate to the app
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.waitForTimeout(2000);

  // Click "Ver Perfil" to go to simulated result -> dashboard
  // First need to set up the app state. Use the mocked ID for success.
  // Type the inscription and submit
  await page.waitForSelector('input[type="text"], input[placeholder*="CPF"], input[placeholder*="inscrição"], input[placeholder*="ID"]', { timeout: 10000 });
  
  const inputs = await page.$$('input');
  for (const input of inputs) {
    const placeholder = await input.evaluate(el => el.placeholder || "");
    if (placeholder.toLowerCase().includes("cpf") || placeholder.toLowerCase().includes("inscri") || placeholder.toLowerCase().includes("id") || placeholder.toLowerCase().includes("digite")) {
      await input.type("123456789012", { delay: 30 });
      break;
    }
  }

  // Click the submit/search button
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await btn.evaluate(el => el.textContent || "");
    if (text.toLowerCase().includes("consultar") || text.toLowerCase().includes("entrar") || text.toLowerCase().includes("buscar") || text.toLowerCase().includes("acessar")) {
      await btn.click();
      break;
    }
  }

  await page.waitForTimeout(3000);

  // We should now be on the result screen. Click "Analisar Desempenho Detalhado"
  // to go to the new Dashboard flow
  const detailLinks = await page.$$('button, div[role="button"], *[cursor="pointer"]');
  let clicked = false;
  for (const el of detailLinks) {
    try {
      const text = await el.evaluate(el => el.textContent || "");
      if (text.includes("Analisar Desempenho")) {
        await el.click();
        clicked = true;
        break;
      }
    } catch (e) { /* element might be detached */ }
  }

  if (!clicked) {
    // Try finding the card that opens dashboard
    const resultCards = await page.$$('[data-slot="card"]');
    for (const card of resultCards) {
      try {
        const text = await card.evaluate(el => el.textContent || "");
        if (text.includes("Analisar Desempenho")) {
          await card.click();
          clicked = true;
          break;
        }
      } catch (e) { /* ignore */ }
    }
  }

  await page.waitForTimeout(3000);

  // --- Screen 1: Resultado do Simulado ---
  await page.screenshot({
    path: join(EXPORT_DIR, "01-tela-resultado.png"),
    fullPage: true,
  });
  console.log("✓ 01-tela-resultado.png");

  // Click "Histórico de Simulados" button to go to screen 2
  const histButtons = await page.$$('button');
  for (const btn of histButtons) {
    try {
      const text = await btn.evaluate(el => el.textContent || "");
      if (text.includes("Histórico")) {
        await btn.click();
        break;
      }
    } catch (e) { /* ignore */ }
  }

  await page.waitForTimeout(2000);

  // --- Screen 2: Histórico de Tentativas ---
  await page.screenshot({
    path: join(EXPORT_DIR, "02-tela-historico.png"),
    fullPage: true,
  });
  console.log("✓ 02-tela-historico.png");

  // Click the first attempt to go to details
  const attemptCards = await page.$$('[data-slot="card"]');
  if (attemptCards.length > 0) {
    await attemptCards[0].click();
  }

  await page.waitForTimeout(2000);

  // --- Screen 3: Detalhe da Tentativa ---
  await page.screenshot({
    path: join(EXPORT_DIR, "03-tela-detalhe-tentativa.png"),
    fullPage: true,
  });
  console.log("✓ 03-tela-detalhe-tentativa.png");

  // Go back and then to profile
  const backButtons = await page.$$('button');
  for (const btn of backButtons) {
    try {
      const text = await btn.evaluate(el => el.textContent || "");
      if (text.includes("Voltar")) {
        await btn.click();
        break;
      }
    } catch (e) { /* ignore */ }
  }

  await page.waitForTimeout(1500);

  // Find "Ver Perfil do Concurseiro" button
  const profileButtons = await page.$$('button');
  for (const btn of profileButtons) {
    try {
      const text = await btn.evaluate(el => el.textContent || "");
      if (text.includes("Perfil do Concurseiro")) {
        await btn.click();
        break;
      }
    } catch (e) { /* ignore */ }
  }

  await page.waitForTimeout(2000);

  // --- Screen 4: Perfil do Concurseiro ---
  await page.screenshot({
    path: join(EXPORT_DIR, "04-tela-perfil-concurseiro.png"),
    fullPage: true,
  });
  console.log("✓ 04-tela-perfil-concurseiro.png");

  await browser.close();
  console.log("\n✓ Todas as telas exportadas para docs/design/exports/");
}

run().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
