import { Core } from '../lib/framework/core.js';

const SITE_CONFIG = {
    // Active theme name (use 'default' for the platform starter)
    // You can also switch at runtime from the console via `Core.setTheme('<name>')`.
    theme: 'default',
    emailKey: "-4kUsRmrmKuymUtUQ",
    emailService: "service_745pm4t",
    emailTemplate: "template_wbk8upr",
    collections: [
        {
            containerId: 'projects-container',
            jsonPath: 'data/proyectos.json', // <-- external file
            template: (item) => `<div class="grid-card-icon"><i class="fa-solid fa-cube"></i></div><h4>${item.clientLogo || item.name}</h4>`,
            modalTemplate: (data) => `
                <div class="modal-img-side"><img src="${data.image}"></div>
                <div class="modal-info-side">
                    <h2 style="color:var(--accent)">${data.name}</h2>
                    <p style="margin:20px 0; color:var(--text-dim)">${data.desc}</p>
                    <div>${data.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}</div>
                </div>`
        },
        {
            containerId: 'workshops-container',
            jsonPath: 'data/talleres.json', // <-- external file
            template: (item) => `<div class="grid-card-icon"><i class="fa-solid ${item.icon}"></i></div><h4>${item.name}</h4>`,
            modalTemplate: (data) => `
                <div class="modal-img-side"><img src="${data.image}"></div>
                <div class="modal-info-side">
                    <h2 style="color:var(--accent)">${data.name}</h2>
                    <p>${data.desc}</p>
                    <div class="info-pill">Fecha: ${data.date}</div>
                </div>`
        }
    ]
};

// Allow quick override from URL for testing: ?theme=detectalab
try {
    const params = typeof location !== 'undefined' ? new URLSearchParams(location.search) : null;
    const override = params ? params.get('theme') : null;
    if (override) {
        console.debug('Overriding theme from URL param:', override);
        SITE_CONFIG.theme = override;
    }
} catch (e) { /* ignore when executed outside browser */ }

// Small local fallbacks to render when fetching JSON fails (e.g., file:// without server)
SITE_CONFIG.collections.forEach(col => {
    if (!col.fallback) {
        if (col.containerId === 'projects-container') {
            col.fallback = [
                { name: 'Demo Project', clientLogo: 'ACME', desc: 'Sample project for local demo', image: 'https://via.placeholder.com/800x450', tags: ['API','Security'] }
            ];
        }
        if (col.containerId === 'workshops-container') {
            col.fallback = [
                { name: 'Intro Workshop', icon: 'fa-chalkboard-user', date: '2026-03-10', desc: 'Introductory hands-on workshop', image: 'https://via.placeholder.com/800x450' }
            ];
        }
    }
});

// Iniciar CMS
document.addEventListener('DOMContentLoaded', () => Core.init(SITE_CONFIG));