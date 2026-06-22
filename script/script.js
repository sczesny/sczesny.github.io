import l,{createEditor as m}from"../monaco/monaco.js";l.languages.typescript.javascriptDefaults.addExtraLib(`

declare let input: string; 
declare let output: string;
declare let regex: RegExp;
declare let match: RegExpExecArray | null;
declare function inspect(value: any, ignore?: string[]): string;

`.trim(),"ts:filename/eval.d.ts");l.languages.typescript.javascriptDefaults.setCompilerOptions({lib:["esnext"],target:l.languages.typescript.ScriptTarget.ESNext,allowNonTsExtensions:!0,allowJs:!0,checkJs:!1});l.languages.typescript.javascriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0,skipDefaultLibCheck:!0,diagnosticCodesToIgnore:[7043,7044,80004]});document.getElementById("divider-vertical").addEventListener("mousedown",e=>{e.preventDefault();let o=document.body.getBoundingClientRect();document.onmousemove=t=>{let n=t.clientX-o.left;n=Math.min(Math.max(n,100),o.width-100),document.body.style.gridTemplateColumns=`${n}px 1px auto`},e.target.toggleAttribute("active"),document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,e.target.toggleAttribute("active")}});document.getElementById("divider-horizontal").addEventListener("mousedown",e=>{e.preventDefault();let o=document.body.getBoundingClientRect();document.onmousemove=t=>{let n=t.clientY-o.top;n=Math.min(Math.max(n,35),o.height-35),document.body.style.gridTemplateRows=`${n}px 1px auto`},e.target.toggleAttribute("active"),document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,e.target.toggleAttribute("active")}});document.addEventListener("keydown",e=>{e.key==="s"&&(e.metaKey||e.ctrlKey)&&e.preventDefault()},!1);document.addEventListener("contextmenu",e=>{e.preventDefault()});var u=m(document.getElementById("code"),{language:"javascript","semanticHighlighting.enabled":!0}),i=m(document.getElementById("input"),{compact:!0,wordWrap:"on",dynmap:!0}),p=m(document.getElementById("output"),{compact:!0,wordWrap:"on",dynmap:!0}),r;function y(){return new Promise((e,o)=>{document.querySelectorAll("iframe").forEach(a=>a.remove()),r&&(clearTimeout(r),r=null);let t=document.createElement("iframe");t.style.display="none",t.sandbox="allow-scripts",window.onmessage=function(a){a.origin==="null"&&a.source===t.contentWindow&&(r&&clearTimeout(r),a.data.error?o("Error: "+a.data.error.msg):e(""+a.data.output),window.onmessage=null,t.parentNode&&document.body.removeChild(t))},t.onload=function(){t.contentWindow.postMessage({src:u.getValue(),input:i.getValue()},"*"),r=setTimeout(()=>{window.onmessage=null,t.parentNode&&document.body.removeChild(t),o("Timeout: Script took too long to execute.")},5e3)},document.body.appendChild(t);let n=`
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
        `;t.srcdoc="<!DOCTYPE html><html><head><script>"+n.replaceAll(/[\s\n]+/g," ")+"<\/script></head></html>"})}var c=!1,d;function g(e){return btoa(unescape(encodeURIComponent(e)))}function f(e){return decodeURIComponent(escape(atob(e)))}function v(){d&&clearTimeout(d),d=setTimeout(()=>{if(c)return;c=!0;let e=new URLSearchParams,o=u.getValue();o&&e.set("code",g(o));let t=i.getValue();t&&e.set("input",g(t)),history.replaceState(null,"","#"+e.toString()),y().then(n=>{p.setValue(n)}).catch(n=>{p.setValue(n)}),c=!1},300)}u.getModel().onDidChangeContent(()=>{v()});i.getModel().onDidChangeContent(()=>{v()});var s=new URLSearchParams(window.location.hash.slice(1));if(s.has("input"))try{i.setValue(f(s.get("input")))}catch{}else i.setValue("");if(s.has("code"))try{u.setValue(f(s.get("code")))}catch{}else u.setValue("");
