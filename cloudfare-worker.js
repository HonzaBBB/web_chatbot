// ============================================
// Cloudflare Worker - Backend pro AI Chatbot
// ============================================
// Tento Worker funguje jako bezpečný prostředník mezi chatbotem a Anthropic API.
// API klíč je uložen zde, takže není viditelný v kódu webu.

export default {
  async fetch(request, env) {
    // Povolení CORS - umožňuje volání z jakékoliv domény
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Povolit pouze POST požadavky
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Načtení dat z požadavku
      const body = await request.json();
      
      // Zavolání Anthropic API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'TVŮJ_ANTHROPIC_API_KLÍČ_ZDE',  // ← Vlož sem svůj API klíč
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // Vrácení odpovědi s CORS headers
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      // Ošetření chyb
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
