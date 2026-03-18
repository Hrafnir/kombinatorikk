/* Version: #9 */

// === SEKSJON: INITIALISERING OG GLOBALE VARIABLER ===
console.log("script.js: Starter initialisering av applikasjonen.");

const navButtons = document.querySelectorAll('.nav-btn');
const modules = document.querySelectorAll('.module');
const header = document.querySelector('header');

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
        console.log(`script.js: Bytt til modul: ${targetModuleId}`);

        navButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        modules.forEach(mod => mod.style.display = 'none');

        const targetModule = document.getElementById(targetModuleId);
        if (targetModule) {
            targetModule.style.display = 'block';
        }

        if (themeColors[targetModuleId]) {
            header.style.backgroundColor = themeColors[targetModuleId];
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
    
    console.log(`script.js: Multiplikasjonsprinsippet: ${hats} * ${sweaters} * ${pants}`);
    const totalOutfits = hats * sweaters * pants;
    
    outfitEquation.innerHTML = `${hats} hatter &times; ${sweaters} gensere &times; ${pants} bukser = <strong>${totalOutfits} mulige antrekk</strong>`;
    outfitViz.innerHTML = `<p style="font-size: 2.5rem; letter-spacing: 5px;">🎩x${hats} &nbsp; 👕x${sweaters} &nbsp; 👖x${pants}</p>`;
}

[hatInput, sweaterInput, pantsInput].forEach(input => {
    if(input) input.addEventListener('input', updateOutfit);
});

// === SEKSJON: MODUL 2 - MYNTKAST ===
console.log("script.js: Setter opp logikk for Myntkast-modulen.");
const coinInput = document.getElementById('coin-count');
const coinEquation = document.getElementById('coin-equation');
const coinViz = document.getElementById('coin-viz');
const flipBtn = document.getElementById('flip-btn');

function flipCoins() {
    console.log("\n--- Starter Myntkast ---");
    const flips = parseInt(coinInput.value) || 0;
    
    if (flips === 0) {
        console.log("script.js: Antall kast er 0. Avbryter.");
        return;
    }

    // Deaktiver knappen for å unngå spam-klikk (race conditions)
    flipBtn.disabled = true;
    console.log(`script.js: Knapp deaktivert. Klar for å kaste ${flips} mynter.`);

    // Beregn utfallsrom
    const totalOutcomes = Math.pow(2, flips);
    console.log(`script.js: Utfallsrom (2^${flips}) = ${totalOutcomes}`);

    coinViz.innerHTML = '';
    coinEquation.innerHTML = "<em>Kaster mynter...</em>";

    let results = [];
    
    // Generer HTML og tilfeldige resultater for hver mynt
    for(let i = 0; i < flips; i++) {
        // Generer tilfeldig K (Krone) eller M (Mynt)
        const isKrone = Math.random() < 0.5;
        const resultText = isKrone ? 'K' : 'M';
        results.push(resultText);
        console.log(`script.js: Mynt ${i+1} utfall: ${resultText}`);

        // Bygg DOM elementer
        const wrapper = document.createElement('div');
        wrapper.className = 'coin-wrapper';
        
        const inner = document.createElement('div');
        inner.className = 'coin-inner coin-anim';
        inner.innerText = '🪙'; // Starter med generell mynt for snurringen
        
        wrapper.appendChild(inner);
        coinViz.appendChild(wrapper);
    }

    // Vent på at CSS-animasjonen (0.6s) gjør seg ferdig
    setTimeout(() => {
        console.log("script.js: Animasjon ferdig. Viser resultater og oppdaterer regnestykket.");
        
        // Oppdater visningen av myntene til faktisk resultat (K / M)
        const inners = coinViz.querySelectorAll('.coin-inner');
        inners.forEach((inner, index) => {
            inner.classList.remove('coin-anim'); // Stopp snurring
            
            // Lag et enkelt utseende for Krone / Mynt
            inner.innerHTML = `<div style="width: 50px; height: 50px; border-radius: 50%; background-color: gold; color: #B8860B; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.5rem; border: 3px solid #DAA520; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); margin: 0 auto;">${results[index]}</div>`;
        });

        // Oppdater resultatsboksen
        const probFraction = `1 / ${totalOutcomes}`;
        const probPercent = ((1 / totalOutcomes) * 100).toFixed(1);
        
        coinEquation.innerHTML = `
            <div style="font-size: 1.2rem; color: #555; margin-bottom: 10px;">Du kastet: <strong>${results.join(', ')}</strong></div>
            <span>Totalt antall mulige kombinasjoner: 2<sup>${flips}</sup> = ${totalOutcomes}</span><br>
            <span>Sannsynlighet for akkurat denne rekken: <strong>${probFraction} (${probPercent}%)</strong></span>
        `;
        
        flipBtn.disabled = false;
        console.log("script.js: Myntkast fullført. Knapp aktivert.");
    }, 600); // 600ms tilsvarer varigheten på animasjonen .coin-anim
}

if(flipBtn) {
    flipBtn.addEventListener('click', flipCoins);
}

// === SEKSJON: MODUL 3 - KULETREKKING ===
console.log("script.js: Setter opp logikk for Kuletrekking-modulen.");
const redBallsInput = document.getElementById('red-balls');
const blueBallsInput = document.getElementById('blue-balls');
const drawMethodSelect = document.getElementById('draw-method');
const drawBtn = document.getElementById('draw-btn');
const ballsEquation = document.getElementById('balls-equation');
const urnContainer = document.getElementById('urn-container');
const drawnBallsDisplay = document.getElementById('drawn-balls-display');

// Tegner opp posen på nytt basert på inndatafeltene
function resetUrn() {
    const reds = parseInt(redBallsInput.value) || 0;
    const blues = parseInt(blueBallsInput.value) || 0;
    console.log(`script.js: Tilbakestiller posen. Røde: ${reds}, Blå: ${blues}`);
    
    urnContainer.innerHTML = ''; 
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

// Lytter på input endringer for å oppdatere posen live før vi trekker
[redBallsInput, blueBallsInput].forEach(input => {
    if(input) input.addEventListener('input', resetUrn);
});

function drawBallsAction() {
    console.log("\n--- Starter Kuletrekking ---");
    let redCount = parseInt(redBallsInput.value) || 0;
    let blueCount = parseInt(blueBallsInput.value) || 0;
    let totalCount = redCount + blueCount;
    const method = drawMethodSelect.value;
    
    console.log(`script.js: Startverdier - Røde: ${redCount}, Blå: ${blueCount}, Metode: ${method}`);

    // Sikkerhetssjekk
    if (totalCount === 0) {
        ballsEquation.innerHTML = "Posen er tom!";
        console.log("script.js: Avbrutt. Posen er tom.");
        return;
    }
    if (method === 'without' && totalCount < 2) {
        ballsEquation.innerHTML = "Ikke nok kuler i posen til å trekke 2 stykker uten tilbakelegging!";
        console.log("script.js: Avbrutt. Ikke nok kuler for 'uten tilbakelegging'.");
        return;
    }

    // Deaktiver knapp
    drawBtn.disabled = true;
    
    // Nullstill visning for uttrukkede kuler og oppdater posen til startpunktet
    drawnBallsDisplay.innerHTML = '';
    resetUrn();
    ballsEquation.innerHTML = "<em>Trekker første kule...</em>";

    // --- TREKK 1 ---
    const random1 = Math.random();
    const isRed1 = random1 < (redCount / totalCount);
    const draw1Color = isRed1 ? 'red' : 'blue';
    const draw1Name = isRed1 ? 'Rød' : 'Blå';
    const prob1Str = isRed1 ? `${redCount}/${totalCount}` : `${blueCount}/${totalCount}`;
    const prob1Val = isRed1 ? (redCount / totalCount) : (blueCount / totalCount);
    
    console.log(`script.js: Trekk 1 - Math.random(): ${random1.toFixed(3)}, Resultat: ${draw1Name}, Sannsynlighet var: ${prob1Str}`);

    // Animer Trekk 1
    const ball1 = document.createElement('div');
    ball1.className = `ball ${draw1Color} drawn-ball`;
    drawnBallsDisplay.appendChild(ball1);

    // Oppdater tilstand før trekk 2 hvis "uten tilbakelegging"
    if (method === 'without') {
        if (isRed1) redCount--; else blueCount--;
        totalCount--;
        console.log(`script.js: Oppdatert innhold (Uten tilbakelegging) - Røde: ${redCount}, Blå: ${blueCount}, Totalt: ${totalCount}`);
        
        // Visuell fjerning fra posen
        const ballToRemove = urnContainer.querySelector(`.ball.${draw1Color}`);
        if (ballToRemove) urnContainer.removeChild(ballToRemove);
    } else {
        console.log(`script.js: Oppdatert innhold (Med tilbakelegging) - Uendret.`);
    }

    // --- TREKK 2 ---
    // Vi legger inn en forsinkelse slik at elevene rekker å se Trekk 1 før Trekk 2 skjer
    setTimeout(() => {
        ballsEquation.innerHTML = "<em>Trekker andre kule...</em>";
        
        const random2 = Math.random();
        const isRed2 = random2 < (redCount / totalCount);
        const draw2Color = isRed2 ? 'red' : 'blue';
        const draw2Name = isRed2 ? 'Rød' : 'Blå';
        const prob2Str = isRed2 ? `${redCount}/${totalCount}` : `${blueCount}/${totalCount}`;
        const prob2Val = isRed2 ? (redCount / totalCount) : (blueCount / totalCount);
        
        console.log(`script.js: Trekk 2 - Math.random(): ${random2.toFixed(3)}, Resultat: ${draw2Name}, Sannsynlighet var: ${prob2Str}`);

        // Animer Trekk 2
        const ball2 = document.createElement('div');
        ball2.className = `ball ${draw2Color} drawn-ball`;
        drawnBallsDisplay.appendChild(ball2);

        // Hvis "uten tilbakelegging", fjern også kule 2 fra posen visuelt for å vise endelig tilstand
        if (method === 'without') {
            const ballToRemove2 = urnContainer.querySelector(`.ball.${draw2Color}`);
            if (ballToRemove2) urnContainer.removeChild(ballToRemove2);
            console.log("script.js: Fjernet kule 2 visuelt fra posen.");
        }

        // --- BEREGN ENDELIG RESULTAT ---
        const totalProbVal = prob1Val * prob2Val;
        const totalProbPercent = (totalProbVal * 100).toFixed(1);
        
        console.log(`script.js: Utregning ferdig. P(${draw1Name}, ${draw2Name}) = ${prob1Str} * ${prob2Str} = ${totalProbVal}`);

        ballsEquation.innerHTML = `
            <div style="font-size: 1.2rem; color: #555; margin-bottom: 10px;">Du trakk: <strong>${draw1Name}</strong> og så <strong>${draw2Name}</strong></div>
            <span>P(${draw1Name}, ${draw2Name}) = ${prob1Str} &times; ${prob2Str} = <strong>${totalProbPercent}%</strong></span>
        `;
        
        drawBtn.disabled = false;
        console.log("script.js: Kuletrekking fullført. Knapp aktivert.");
    }, 800); // Vent 800ms før trekk 2 skjer
}

if(drawBtn) {
    drawBtn.addEventListener('click', drawBallsAction);
}

// === SEKSJON: OPPSTART ===
console.log("\n--- Kjører initielle oppdateringer ved sidelasting ---");
updateOutfit();
resetUrn();
console.log("script.js: Initialisering og første opptegning ferdig. Appen er klar!");

/* Version: #9 */
