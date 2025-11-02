AI Chatbot - Embeddable Web Widget
Profesionální AI chatbot využívající Claude AI od Anthropic, který lze snadno vložit na jakýkoliv web.

✨ Funkce

🤖 Inteligentní konverzace s Claude AI
🎨 Plně přizpůsobitelný design (barvy, texty)
📱 Responzivní - funguje na mobilech i počítačích
🚀 Snadná instalace - jeden HTML soubor
🔒 Bezpečné - API klíč uložen na Cloudflare Worker
⚡ Rychlé načítání
💬 Quick reply tlačítka pro časté dotazy

📋 Co potřebuješ

Anthropic API klíč - registrace na console.anthropic.com
Cloudflare účet (zdarma) - workers.cloudflare.com
Webhosting (jakýkoliv)

🚀 Instalace
Krok 1: Cloudflare Worker (backend)

Zaregistruj se na Cloudflare a jdi do Workers & Pages
Klikni Create Worker
Pojmenuj ho (např. chatbot-api)
Vlož tento kód:

 ```
javascriptexport default {
  async fetch(request, env) {
    // Povolení CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    try {
      const body = await request.json();    
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'TVŮJ_ANTHROPIC_API_KLÍČ',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
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
 ```

Nahraď TVŮJ_ANTHROPIC_API_KLÍČ svým API klíčem
Klikni Save and Deploy
Zkopíruj URL workeru (např. https://chatbot-api.tvoje-jmeno.workers.dev/)

Krok 2: Konfigurace chatbota
V souboru index.html najdi sekci KONFIGURACE (řádky cca 300-380) a uprav podle svých potřeb:

 ```
javascriptconst CONFIG = {
    // Tvoje Worker URL z kroku 1
    workerUrl: 'https://chatbot-api.tvoje-jmeno.workers.dev/',
    
    // Tvoje brand colors
    colors: {
        primary: '#667eea',      // Hlavní barva
        secondary: '#764ba2',    // Sekundární barva
    },
    
    // Texty
    chatbotName: 'AI Asistent',
    chatbotSubtitle: 'Tvůj popisek',
    welcomeMessage: 'Tvoje uvítací zpráva',
    
    // Rychlé odpovědi
    quickReplies: [
        'Otázka 1',
        'Otázka 2',
        'Otázka 3'
    ],
    
    // System prompt - instrukce pro AI
    systemPrompt: `Zde napiš, jak má AI odpovídat...`
};
 ```

Krok 3: Nahrání na web

Ulož upravený chatbot.html
Nahraj na svůj webhosting
Hotovo! 🎉

⚙️ Přizpůsobení

Barvy

Změň colors.primary a colors.secondary v CONFIG sekci.

Texty

Všechny texty (název, popisek, uvítací zpráva) můžeš změnit v CONFIG sekci.

System Prompt

V systemPrompt definuj:

Jaké informace má chatbot znát
Jak má komunikovat (formální/neformální)
Jaké má odpovídat na časté dotazy
Kdy má nabídnout kontakt

Quick Replies

Uprav pole quickReplies - přidej nebo uber tlačítka podle potřeby.

Cena:

Cloudflare Workers: Zdarma až 100 000 požadavků/den

Anthropic API:

$3 za 1M vstupních tokenů
$15 za 1M výstupních tokenů
Pro běžný chatbot: cca $0.01-0.05 za konverzaci


🔒 Bezpečnost

✅ API klíč je uložen na Cloudflare Worker (není viditelný v kódu webu)
✅ CORS správně nastaveno
✅ Pouze POST požadavky povoleny

🐛 Řešení problémů

Chatbot nereaguje

Zkontroluj konzoli (F12 v prohlížeči)
Ověř, že Worker URL je správně
Zkontroluj, že API klíč v Workeru je správný

CORS chyba

Ujisti se, že Worker je správně nasazený
Zkontroluj, že URL v chatbotu končí /

API chyba 401

API klíč v Cloudflare Workeru je špatný nebo vypršel

📝 Licence
MIT License - použij, uprav a distribuuj jak chceš!
🤝 Podpora
Máš otázky? Kontaktuj mě nebo otevři issue na GitHubu.

Vytvořeno s ❤️ pomocí Claude AI
