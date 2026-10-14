// Every ad unit runs inside a sandboxed iframe. The sandbox deliberately omits
// `allow-top-navigation` and `allow-same-origin`: ad scripts get an opaque
// origin, so they cannot touch the BinPaste document and cannot redirect the
// tab. Clicking an ad still opens the advertiser in a new, unsandboxed tab.
export const AD_SANDBOX = 'allow-scripts allow-popups allow-popups-to-escape-sandbox';

// An opaque origin makes document.cookie and Web Storage throw, which some ad
// scripts do not guard against. Swap in harmless in-memory stand-ins first.
const STORAGE_SHIM = `<script>(function(){
function mem(){var s={};return{getItem:function(k){return Object.prototype.hasOwnProperty.call(s,k)?s[k]:null},setItem:function(k,v){s[k]=String(v)},removeItem:function(k){delete s[k]},clear:function(){s={}},key:function(i){return Object.keys(s)[i]||null},get length(){return Object.keys(s).length}}}
try{Object.defineProperty(document,'cookie',{get:function(){return''},set:function(){},configurable:true})}catch(e){}
['localStorage','sessionStorage'].forEach(function(n){try{window[n]}catch(e){try{Object.defineProperty(window,n,{value:mem(),configurable:true})}catch(_){}}});
})();</script>`;

export function buildAdDocument(body) {
    return [
        '<!doctype html><html><head><meta charset="utf-8">',
        '<base target="_blank">',
        '<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style>',
        STORAGE_SHIM,
        '</head><body>',
        body,
        '</body></html>',
    ].join('');
}
