/* Version: #3 */

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

console.log("script.js: Initialisering ferdig. Venter på brukerinteraksjon.");
/* Version: #3 */
