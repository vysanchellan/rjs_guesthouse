const hex = (h) => h.replace("#","").match(/../g).map(v=>parseInt(v,16)/255);
const lin = (c) => c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055)**2.4;
const L = (h) => { const [r,g,b]=hex(h).map(lin); return 0.2126*r+0.7152*g+0.0722*b; };
const ratio = (a,b) => { const [x,y]=[L(a),L(b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05); };

const grounds = { "ink-900":"#0a1618", "ink-800":"#0e1e21", "ink-700":"#142a2d", "ink-600":"#1c3639" };
const fg = { "sand-100":"#f4ecdd", "sand-300":"#dcd2c0", "sand-500":"#ab9f8b", "brass":"#d8a459" };

for (const [gn, gv] of Object.entries(grounds)) {
  for (const [fn, fv] of Object.entries(fg)) {
    const r = ratio(gv, fv);
    const tag = r >= 4.5 ? "AA-body " : r >= 3 ? "AA-large" : "FAIL    ";
    console.log(`${fn.padEnd(9)} on ${gn.padEnd(8)} ${r.toFixed(2).padStart(5)}  ${tag}`);
  }
}
console.log("\nink-900 on brass (dark text on the primary button):", ratio("#d8a459","#0a1618").toFixed(2));
