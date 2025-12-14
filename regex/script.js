import u,{createEditor as l}from"../monaco/monaco.js";u.languages.typescript.javascriptDefaults.addExtraLib(`

declare let input: string; 
declare let output: string;
declare let regex: RegExp;
declare let match: RegExpExecArray | null;

`.trim(),"ts:filename/eval.d.ts");u.languages.typescript.javascriptDefaults.setCompilerOptions({lib:["esnext"],target:u.languages.typescript.ScriptTarget.ESNext,allowNonTsExtensions:!0,allowJs:!0,checkJs:!1});u.languages.typescript.javascriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0,skipDefaultLibCheck:!0,diagnosticCodesToIgnore:[7043,7044,80004]});document.getElementById("divider-vertical").addEventListener("mousedown",e=>{e.preventDefault();let i=document.body.getBoundingClientRect();document.onmousemove=t=>{let a=t.clientX-i.left;a=Math.min(Math.max(a,100),i.width-100),document.body.style.gridTemplateColumns=`${a}px 1px auto`},e.target.toggleAttribute("active"),document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,e.target.toggleAttribute("active")}});document.getElementById("divider-horizontal").addEventListener("mousedown",e=>{e.preventDefault();let i=document.body.getBoundingClientRect();document.onmousemove=t=>{let a=t.clientY-i.top;a=Math.min(Math.max(a,35),i.height-35),document.body.style.gridTemplateRows=`${a}px 1px auto`},e.target.toggleAttribute("active"),document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,e.target.toggleAttribute("active")}});document.addEventListener("keydown",e=>{e.key==="s"&&(e.metaKey||e.ctrlKey)&&e.preventDefault()},!1);document.addEventListener("contextmenu",e=>{e.preventDefault()});var c=l(document.getElementById("code"),{language:"javascript","semanticHighlighting.enabled":!0}),m=l(document.getElementById("input"),{compact:!0,wordWrap:"on",dynmap:!0}),d=l(document.getElementById("output"),{compact:!0,wordWrap:"on",dynmap:!0}),o;function g(){return new Promise((e,i)=>{document.querySelectorAll("iframe").forEach(n=>n.remove()),o&&(clearTimeout(o),o=null);let t=document.createElement("iframe");t.style.display="none",t.sandbox="allow-scripts",window.onmessage=function(n){n.origin==="null"&&n.source===t.contentWindow&&(o&&clearTimeout(o),n.data.error?i("Error: "+n.data.error.msg):e(""+n.data.output),window.onmessage=null,t.parentNode&&document.body.removeChild(t))},t.onload=function(){t.contentWindow.postMessage({src:c.getValue(),input:m.getValue()},"*"),o=setTimeout(()=>{window.onmessage=null,t.parentNode&&document.body.removeChild(t),i("Timeout: Script took too long to execute.")},5e3)},document.body.appendChild(t);let a=`
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
        `;t.srcdoc="<!DOCTYPE html><html><head><script>"+a.replaceAll(/[\s\n]+/g," ")+"<\/script></head></html>"})}var s=!1,r;function p(){r&&clearTimeout(r),r=setTimeout(()=>{s||(s=!0,g().then(e=>{d.setValue(e)}).catch(e=>{d.setValue(e)}),s=!1)},300)}c.getModel().onDidChangeContent(()=>{p()});m.getModel().onDidChangeContent(()=>{p()});m.setValue(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis justo, fermentum nec nisi id, fringilla elementum erat. Phasellus sodales vel dui at eleifend. Cras accumsan enim a lacus finibus, vel sollicitudin enim malesuada. In et quam ut ligula mattis hendrerit in sit amet nunc. Sed gravida, diam et pretium rutrum, odio felis laoreet nibh, in sollicitudin ipsum tellus vel ligula. Etiam sit amet metus aliquet turpis tempus vestibulum non nec sapien. Vestibulum ac hendrerit purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras ultricies neque sit amet porttitor condimentum. Nulla elementum libero vel ante hendrerit, eget scelerisque eros pulvinar. Aenean mi metus, auctor non tristique imperdiet, imperdiet a libero.

Vestibulum commodo diam et mollis hendrerit. Cras mattis hendrerit lacus a vestibulum. Sed semper enim arcu, sed scelerisque nibh fermentum sit amet. Quisque volutpat turpis sed suscipit hendrerit. Integer malesuada laoreet eros, vel aliquam mauris. Donec aliquam nisl et mi accumsan, ornare eleifend metus ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam egestas quis lacus vel finibus.

Praesent vel enim faucibus, cursus lacus vel, vehicula ex. Vivamus ultricies eros sapien, eu pellentesque elit sollicitudin at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam at nulla hendrerit, pretium mauris ac, dapibus orci. In ultricies purus sodales, molestie ligula nec, pretium metus. Curabitur nulla eros, ultricies eget ante quis, ultrices dictum justo. Sed varius mauris id mollis consequat.
`);c.setValue(`
regex = /([A-Z])\\w+/g;

while ((match = regex.exec(input)) !== null) {
    output += match;
    output += '\\n';
}

output = input.replace(/([A-Z])\\w+/g, '<< $& >>');

/** 
 * https://mdn.io/regex
 * 
 * Flags:
 *  /g 	Global search.
 *  /i 	Case-insensitive search.
 *  /m 	Makes \`^\` and \`$\` match the start and end of each line.
 *  /s 	Allows \`.\` to match newline characters.
 *  /u 	Enables full Unicode support.
 * 
 * Character classes:
 *  . 			any character except newline
 *  \\w \\d \\s 	word, digit, whitespace
 *  \\W \\D \\S 	not word, digit, whitespace
 *  [abc] 		any of a, b, or c
 *  [^abc] 		not a, b, or c
 *  [a-g] 		character between a & g
 * 
 * Anchors & Escaped characters:
 *  ^abc$ 		start / end of the string
 *  \\b \\B 		word, not-word boundary
 *  \\. \\* \\\\ 	escaped special characters
 *  \\t \\n \\r 	tab, linefeed, carriage return
 * 
 * Groups & Lookarounds:
 *  (abc) 		capture group
 *  (?<N>abc) 	capture named group
 *  \\1 			backreference to group #1
 *  (?:abc) 	non-capturing group
 *  (?=abc) 	positive lookahead
 *  (?!abc) 	negative lookahead
 * 
 * Quantifiers & Alternation:
 *  a* a+ a? 	0 or more, 1 or more, 0 or 1
 *  a{5} a{2,} 	exactly five, two or more
 *  a{1,3} 		between one & three
 *  a+? a{2,}? 	match as few as possible
 *  ab|cd 		match ab or cd
 */
`);
