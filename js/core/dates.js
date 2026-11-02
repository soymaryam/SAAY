/* Date helpers. */
const DAY=864e5,ad=(d,k)=>new Date(+new Date(d)+k*DAY).toISOString().slice(0,10),diff=d=>Math.round((+new Date(TODAY)-+new Date(d))/DAY);
