import { loadHeaderFooter } from './utils.mjs';
import { renderVODs } from './vods.js';


document.addEventListener('DOMContentLoaded', function() {
    loadHeaderFooter( async () => {
        
        renderVODs();
    });
       
});


