/* Inline SVG icon paths and the ico() helper. */
const IC=['M4 8h3l1.5-2h7L17 8h3v11H4zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7','M12 12a4 4 0 100-8 4 4 0 000 8M5 20c0-4 3-6 7-6s7 2 7 6','M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z','M12 21a9 9 0 100-18 9 9 0 000 18M3 12h18M12 3c3 3 3 15 0 18','M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z','M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-3 0-5-1-4-3 2-2 4 1 4 3zM12 7c3 0 5-1 4-3-2-2-4 1-4 3z','M4 11l8-7 8 7v9H4zM10 20v-6h4v6'];
const ico=(p,z=22)=>`<svg width=${z} height=${z} viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=1.4 stroke-linecap=round stroke-linejoin=round aria-hidden=true><path d="${p}"/></svg>`;
const MS='M4 5h16v11H9l-5 4z',BL='M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 20a2 2 0 004 0';
