import a,{createEditor as s}from"../monaco/monaco.js";a.languages.typescript.javascriptDefaults.addExtraLib(`

declare let input: string; 
declare let output: string;
declare let regex: RegExp;
declare let match: RegExpExecArray | null;
declare function inspect(value: any, ignore?: string[]): string;

`.trim(),"ts:filename/eval.d.ts");a.languages.typescript.javascriptDefaults.setCompilerOptions({lib:["esnext"],target:a.languages.typescript.ScriptTarget.ESNext,allowNonTsExtensions:!0,allowJs:!0,checkJs:!1});a.languages.typescript.javascriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0,skipDefaultLibCheck:!0,diagnosticCodesToIgnore:[7043,7044,80004]});document.getElementById("divider-vertical").addEventListener("mousedown",e=>{e.preventDefault();let o=document.body.getBoundingClientRect();document.onmousemove=t=>{let n=t.clientX-o.left;n=Math.min(Math.max(n,100),o.width-100),document.body.style.gridTemplateColumns=`${n}px 1px auto`},e.target.toggleAttribute("active"),document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,e.target.toggleAttribute("active")}});document.getElementById("divider-horizontal").addEventListener("mousedown",e=>{e.preventDefault();let o=document.body.getBoundingClientRect();document.onmousemove=t=>{let n=t.clientY-o.top;n=Math.min(Math.max(n,35),o.height-35),document.body.style.gridTemplateRows=`${n}px 1px auto`},e.target.toggleAttribute("active"),document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,e.target.toggleAttribute("active")}});document.addEventListener("keydown",e=>{e.key==="s"&&(e.metaKey||e.ctrlKey)&&e.preventDefault()},!1);document.addEventListener("contextmenu",e=>{e.preventDefault()});var c=s(document.getElementById("code"),{language:"javascript","semanticHighlighting.enabled":!0}),m=s(document.getElementById("input"),{compact:!0,wordWrap:"on",dynmap:!0}),d=s(document.getElementById("output"),{compact:!0,wordWrap:"on",dynmap:!0}),u;function g(){return new Promise((e,o)=>{document.querySelectorAll("iframe").forEach(r=>r.remove()),u&&(clearTimeout(u),u=null);let t=document.createElement("iframe");t.style.display="none",t.sandbox="allow-scripts",window.onmessage=function(r){r.origin==="null"&&r.source===t.contentWindow&&(u&&clearTimeout(u),r.data.error?o("Error: "+r.data.error.msg):e(""+r.data.output),window.onmessage=null,t.parentNode&&document.body.removeChild(t))},t.onload=function(){t.contentWindow.postMessage({src:c.getValue(),input:m.getValue()},"*"),u=setTimeout(()=>{window.onmessage=null,t.parentNode&&document.body.removeChild(t),o("Timeout: Script took too long to execute.")},5e3)},document.body.appendChild(t);let n=`
            function inspect(value, ignore = [], seen = new WeakSet()) {
                if (value === null) return 'null';
                if (value === undefined) return 'undefined';
                if (typeof value === 'boolean') return String(value);
                if (typeof value === 'number') return String(value);
                if (typeof value === 'symbol') return value.toString();

                if (typeof value === 'string') {
                    return \`'\${value.replace(/'/g, "\\\\'")}'\`;
                }

                if (typeof value === 'function') {
                    return \`[Function: \${value.name || '(anonymous)'}]\`;
                }

                if (seen.has(value)) {
                    return '[Circular]';
                }
                seen.add(value);

                if (Array.isArray(value)) {
                    const items = [];

                    for (let i = 0; i < value.length; i++) {
                        if (i in value) {
                            items.push(inspect(value[i], ignore, seen));
                        } else {
                            items.push('empty');
                        }
                    }

                    Object.keys(value).filter(k => !ignore.includes(k)).forEach(key => {
                        const isIndex = /^\\d+$/.test(key) && parseInt(key, 10) < value.length;
                        if (!isIndex) {
                            items.push(\`\${key}: \${inspect(value[key], ignore, seen)}\`);
                        }
                    });

                    return \`[\${items.join(', ')}]\`;
                }

                if (value instanceof Date) return value.toISOString();
                if (value instanceof RegExp) return value.toString();
                if (value instanceof Error) return \`\${value.name}: \${value.message}\`;

                if (typeof value === 'object') {
                    const entries = Object.keys(value).filter(k => !ignore.includes(k)).map(key => {
                        return \`\${key}: \${inspect(value[key], ignore, seen)}\`;
                    });

                    const ctorName = value.constructor && value.constructor.name !== 'Object'
                        ? value.constructor.name + ' '
                        : '';

                    return \`\${ctorName}{\${entries.join(', ')}}\`;
                }

                return String(value);
            }
            window.addEventListener('message', function (e) {
                var mainWindow = e.source;
                const result = {};
                let input = e.data.input;
                let output = '';
                try {
                    eval(e.data.src);
                } catch (error) {
                    result.error = { msg: error.message, pos: error.colno };
                }
                result.output = output;
                mainWindow.postMessage(result, event.origin);
            });
        `;t.srcdoc="<!DOCTYPE html><html><head><script>"+n.replaceAll(/[\s\n]+/g," ")+"<\/script></head></html>"})}var i=!1,l;function p(){l&&clearTimeout(l),l=setTimeout(()=>{i||(i=!0,g().then(e=>{d.setValue(e)}).catch(e=>{d.setValue(e)}),i=!1)},300)}c.getModel().onDidChangeContent(()=>{p()});m.getModel().onDidChangeContent(()=>{p()});c.setValue(`
const length = 20;

const chars = [
    'aeiou',
    'AEIOU',
    'bcdfghjklmnpqrstvwxyz',
    'BCDFGHJKLMNPQRSTVWXYZ',
    '0123456789',
    '!@#$%^&*'
].join('');

function password() {
    const buf = new Uint32Array(length);
    crypto.getRandomValues(buf);
    return Array.from(buf, n => chars[n % chars.length]).join('');
}

output = Array.from({ length: 35 }, password).join('\\n');
`);
