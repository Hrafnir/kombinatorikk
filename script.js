/* Version: #6 */

// === SEKSJON: INITIALISERING OG GLOBALE VARIABLER ===
console.log("script.js: Starter initialisering av applikasjonen.");

const navButtons = document.querySelectorAll('.nav-btn');
const modules = document.querySelectorAll('.module');
const header = document.querySelector('header');

// Definerer temafarger for headeren basert på CSS-variablene vi satt opp
const themeColors = {
    'module-home': 'var(--primary-color)',
    'module-outfit': 'var(--outfit-color)',
    'module-coin': 'var(--coin-color)',
    'module-balls': 'var(--balls-color)'
};

// === SEKSJON: NAVIGASJONSLOGIKK ===
console.log("script.js: Setter opp hendelseslyttere for navigasjon.");

navButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetModuleId = this.getAttribute('data-target');
        console.log(`\n--- Navigasjon klikket ---`);
        console.log(`script.js: Forsøker å bytte til mål-modul: ${targetModuleId}`);

        // 1. Fjern 'active' klasse fra alle knapper
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        console.log("script.js: Fjernet 'active' klasse fra alle navigasjonsknapper.");

        // 2. Legg til 'active' klasse på klikket knapp
        this.classList.add('active');
        console.log(`script.js: La til 'active' klasse på knappen for: ${targetModuleId}`);

        // 3. Skjul alle moduler
        modules.forEach(mod => {
            mod.style.display = 'none';
        });
        console.log("script.js: Skjulte alle moduler (display: none).");

        // 4. Vis valgt modul
        const targetModule = document.getElementById(targetModuleId);
        if (targetModule) {
            targetModule.style.display = 'block';
            console.log(`script.js: Viste modulen: ${targetModuleId} (display: block).`);
        } else {
            console.error(`script.js Feil: Fant ikke modulen med ID ${targetModuleId} i DOM.`);
        }

        // 5. Oppdater header farge
        if (themeColors[targetModuleId]) {
            header.style.backgroundColor = themeColors[targetModuleId];
            console.log(`script.js: Oppdaterte header-farge til tema for: ${targetModuleId}`);
        } else {
            console.log(`script.js: Fant ingen spesifikk temafarge for ${targetModuleId}, beholder forrige farge.`);
        }
    });
});

// === SEKSJON: MODUL 1 - ANTREKK ===
console.log("script.js: Setter opp logikk for Antrekk-modulen.");
const hatInput = document.getElementById('hat-count');
const sweaterInput = document.getElementById('sweater-count');
const pantsInput = document.getElementById('pants-count');
const outfitEquation = document.getElementById('outfit-equation');
const outfitViz = document.getElementById('outfit-viz');

function updateOutfit() {
    console.log("\n--- Oppdaterer Antrekk ---");
    const hats = parseInt(hatInput.value) || 0;
    const sweaters = parseInt(sweaterInput.value) || 0;
    const pants = parseInt(pantsInput.value) || 0;
    
    console.log(`script.js: Verdier lest - Hatter: ${hats}, Gensere: ${sweaters}, Bukser: ${pants}`);
    
    const totalOutfits = hats * sweaters * pants;
    console.log(`script.js: Beregnet totalt antall antrekk: ${totalOutfits}`);
    
    outfitEquation.innerHTML = `${hats} hatter &times; ${sweaters} gensere &times; ${pants} bukser = <strong>${totalOutfits} mulige antrekk</strong>`;
    
    // Enkel visualisering med emojis for 9. trinn
    outfitViz.innerHTML = `<p style="font-size: 2.5rem; letter-spacing: 5px;">🎩x${hats} &nbsp; 👕x${sweaters} &nbsp; 👖x${pants}</p>`;
    console.log("script.js: Antrekk-grensesnitt oppdatert.");
}

// Legger til lyttere slik at regnestykket oppdateres umiddelbart når tallene endres
[hatInput, sweaterInput, pantsInput].forEach(input => {
    if(input) {
        input.addEventListener('input', updateOutfit);
    }
});

// === SEKSJON: MODUL 2 - MYNTKAST ===
console.log("script.js: Setter opp logikk for Myntkast-modulen.");
const coinInput = document.getElementById('coin-count');
const coinEquation = document.getElementById('coin-equation');
const coinViz = document.getElementById('coin-viz');

function updateCoin() {
    console.log("\n--- Oppdaterer Myntkast ---");
    const flips = parseInt(coinInput.value) || 0;
    console.log(`script.js: Antall kast: ${flips}`);
    
    const outcomes = Math.pow(2, flips);
    console.log(`script.js: Beregnet utfallsrom (2^${flips}): ${outcomes}`);
    
    // Bygger stringen for regnestykket: "2 x 2 x 2..."
    let equationString = Array(flips).fill('2').join(' &times; ');
    if (flips === 0) equationString = "0";
    
    coinEquation.innerHTML = `${equationString} = 2<sup>${flips}</sup> = <strong>${outcomes} mulige utfall</strong>`;
    
    // Visualisering av mynter
    let coinsHtml = '';
    for(let i = 0; i < flips; i++) {
        coinsHtml += '<span style="font-size: 3rem; margin: 0 5px;">🪙</span>';
    }
    coinViz.innerHTML = coinsHtml;
    console.log("script.js: Myntkast-grensesnitt oppdatert.");
}

if(coinInput) {
    coinInput.addEventListener('input', updateCoin);
}

// === SEKSJON: MODUL 3 - KULETREKKING ===
console.log("script.js: Setter opp logikk for Kuletrekking-modulen.");
const redBallsInput = document.getElementById('red-balls');
const blueBallsInput = document.getElementById('blue-balls');
const drawMethodSelect = document.getElementById('draw-method');
const drawBtn = document.getElementById('draw-btn');
const ballsEquation = document.getElementById('balls-equation');
const urnContainer = document.getElementById('urn-container');

// Hjelpefunksjon for å tegne kuler i posen (HTML/CSS)
function drawBallsVisually(reds, blues) {
    console.log(`script.js: Tegner opp kuler visuelt - Røde: ${reds}, Blå: ${blues}`);
    urnContainer.innerHTML = ''; // Tømmer posen først
    
    for(let i=0; i<reds; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball red';
        urnContainer.appendChild(ball);
    }
    for(let i=0; i<blues; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball blue';
        urnContainer.appendChild(ball);
    }
}

function calculateBalls() {
    console.log("\n--- Beregner Kuletrekking ---");
    const red = parseInt(redBallsInput.value) || 0;
    const blue = parseInt(blueBallsInput.value) || 0;
    const total = red + blue;
    const method = drawMethodSelect.value;
    
    console.log(`script.js: Verdier - Røde: ${red}, Blå: ${blue}, Totalt: ${total}, Metode: ${method}`);
    
    // Oppdaterer visualiseringen av posen
    drawBallsVisually(red, blue);
    
    if (total === 0) {
        ballsEquation.innerHTML = "Posen er tom!";
        console.log("script.js: Avbryter beregning fordi posen er tom.");
        return;
    }

    let mathHtml = '';
    
    if (method === 'with') {
        console.log("script.js: Beregner MED tilbakelegging.");
        // P(2 røde) = (Rød/Total) * (Rød/Total)
        const prob = (red / total) * (red / total);
        mathHtml = `
            <div style="font-size: 1.2rem; color: #555; margin-bottom: 10px;">Trekke to røde kuler (MED tilbakelegging):</div>
            <span>( ${red} / ${total} ) &times; ( ${red} / ${total} ) = <strong>${Math.round(prob * 100)} %</strong></span>
        `;
        console.log(`script.js: Resultat - Sannsynlighet: ${prob}`);
    } else {
        console.log("script.js: Beregner UTEN tilbakelegging.");
        if (red < 2) {
            mathHtml = `
                <div style="font-size: 1.2rem; color: #555; margin-bottom: 10px;">Trekke to røde kuler (UTEN tilbakelegging):</div>
                <span>Det er ikke nok røde kuler i posen til å trekke to stykker! Sannsynlighet = <strong>0 %</strong></span>
            `;
            console.log("script.js: Resultat - Sannsynlighet: 0 (Ikke nok røde kuler).");
        } else {
            // P(2 røde) = (Rød/Total) * ((Rød-1)/(Total-1))
            const prob = (red / total) * ((red - 1) / (total - 1));
            mathHtml = `
                <div style="font-size: 1.2rem; color: #555; margin-bottom: 10px;">Trekke to røde kuler (UTEN tilbakelegging):</div>
                <span>( ${red} / ${total} ) &times; ( ${red - 1} / ${total - 1} ) = <strong>${Math.round(prob * 100)} %</strong></span>
            `;
             console.log(`script.js: Resultat - Sannsynlighet: ${prob}`);
        }
    }
    
    ballsEquation.innerHTML = mathHtml;
    console.log("script.js: Kuletrekking-grensesnitt oppdatert.");
}

// Lytter kun på knappen for å trigge beregningen i kuletrekking (bedre pedagogisk å la eleven trykke)
if(drawBtn) {
    drawBtn.addEventListener('click', calculateBalls);
}

// === SEKSJON: OPPSTART ===
console.log("\n--- Kjører initielle oppdateringer ved sidelasting ---");
updateOutfit();
updateCoin();
drawBallsVisually(parseInt(redBallsInput.value)||0, parseInt(blueBallsInput.value)||0);
console.log("script.js: Initialisering og første opptegning ferdig. Appen er klar!");

/* Version: #6 */
