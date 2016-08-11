//
// 2016-08-09
//
// Run with the following:
//  fetch('http://localhost:8000/setupTheme.js').then(r => r.text()).then(r => eval(r))
//
//  or the following if fat-arrow notation is not supported:
//  note: this one uses traditional function notation and has a return on the r.text() call
//  fetch('http://192.168.1.133:8000/setupTheme.js').then(function(r) {return r.text()}).then(function(r){ eval(r) })
// super setup:
/*
fetch('http://code.jquery.com/jquery-latest.min.js').then(r => r.text()).then(r => eval(r));
fetch('http://code.jquery.com/jquery-latest.min.js').then(r => r.text()).then(r => eval(r));
setTimeout( () => {
  fetch('http://localhost:8000/setupListener2.js').then(r => r.text()).then(r => eval(r));
  fetch('http://localhost:8000/setupTheme.js').then(r => r.text()).then(r => eval(r));
}, 10000);

*/
// super setup 2
/*
fetch('http://code.jquery.com/jquery-latest.min.js').then(r => r.text()).then(r => eval(r));
fetch('http://code.jquery.com/jquery-latest.min.js').then(r => r.text()).then(r => eval(r));

fetch('http://localhost:8000/setupListener2.js').then(r => r.text()).then(r => eval(r));
fetch('http://localhost:8000/setupTheme.js').then(r => r.text()).then(r => eval(r));
*/
// the keyword to search on in the elemets display:
// workbench.editors.files.textFileEditor

(function () {

  function getRedTheme () {
    var redThemeText = `
      .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.comment { font-style: italic; color: rgba(231, 192, 192, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.constant { color: rgba(153, 70, 70, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.keyword { color: rgba(241, 39, 39, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.entity { color: rgba(254, 199, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.storage { font-weight: bold; color: rgba(255, 98, 98, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.string { color: rgba(205, 141, 141, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.support { color: rgba(157, 243, 159, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.variable { font-style: italic; color: rgba(251, 154, 75, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.invalid { color: rgba(255, 255, 255, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.text.source {  }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.text.html.ruby.source {  }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.entity.other.inherited-class { text-decoration: underline; color: rgba(170, 85, 7, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.string.quoted.source { color: rgba(157, 243, 159, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.string.constant { color: rgba(255, 232, 98, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.string.regexp { color: rgba(255, 180, 84, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.string.variable { color: rgba(237, 239, 125, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.support.function { color: rgba(255, 180, 84, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.support.constant { color: rgba(235, 147, 154, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.declaration.sgml.html.declaration.doctype { color: rgba(115, 129, 125, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.declaration.sgml.html.declaration.doctype.entity { color: rgba(115, 129, 125, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.declaration.sgml.html.declaration.doctype.string { color: rgba(115, 129, 125, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.declaration.xml-processing { color: rgba(115, 129, 125, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.declaration.xml-processing.entity { color: rgba(115, 129, 125, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.declaration.xml-processing.string { color: rgba(115, 129, 125, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.declaration.tag { color: rgba(236, 13, 30, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.declaration.tag.entity { color: rgba(236, 13, 30, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.tag { color: rgba(236, 13, 30, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.tag.entity { color: rgba(236, 13, 30, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.selector.css.entity.name.tag { color: rgba(170, 85, 7, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.selector.css.entity.other.attribute-name.id { color: rgba(254, 199, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.selector.css.entity.other.attribute-name.class { color: rgba(65, 168, 62, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.support.type.property-name.css { color: rgba(150, 221, 59, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.property-group.support.constant.property-value.css { font-style: italic; color: rgba(255, 232, 98, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.property-value.support.constant.property-value.css { font-style: italic; color: rgba(255, 232, 98, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.property-value.support.constant.named-color.css { color: rgba(255, 232, 98, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.property-value.constant { color: rgba(255, 232, 98, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.preprocessor.at-rule.keyword.control.at-rule { color: rgba(253, 98, 9, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.constructor.argument.css { color: rgba(236, 151, 153, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.diff { font-style: italic; color: rgba(248, 248, 248, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.meta.diff.header { font-style: italic; color: rgba(248, 248, 248, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.deleted { color: rgba(236, 151, 153, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.changed { color: rgba(248, 248, 248, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.inserted { color: rgba(65, 168, 62, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.quote { color: rgba(241, 39, 39, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.list { color: rgba(255, 98, 98, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.bold { color: rgba(251, 154, 75, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.italic { color: rgba(251, 154, 75, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.inline.raw { color: rgba(205, 141, 141, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.heading { color: rgba(254, 199, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.markup.heading.setext { color: rgba(254, 199, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .monaco-editor-background { background-color: rgba(57, 0, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .glyph-margin { background-color: rgba(57, 0, 0, 1); }
    .vs-dark.vscode-theme-red-themes-red-tmTheme .monaco-workbench .monaco-editor-background { background-color: rgba(57, 0, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token { color: rgba(248, 248, 248, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .focused .selected-text { background-color: rgba(117, 0, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .selected-text { background-color: rgba(117, 0, 0, 0.5); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .current-line { background-color: rgba(0, 0, 0, 0.29); border:0; }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .cursor { background-color: rgba(151, 0, 0, 1); border-color: rgba(151, 0, 0, 1); color: rgba(104, 255, 255, 1); }
    .monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .token.whitespace { color: rgba(193, 0, 0, 1) }
    `;

    redThemeText += `.monaco-editor.vs-dark.vscode-theme-red-themes-red-tmTheme .lines-content .cigr { background: rgba(193, 0, 0, 1); }`;

    return redThemeText;
  };


  function getKimbieTheme () {
    var themeText = `
      .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.variable.parameter.function { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.comment { color: rgba(165, 122, 76, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.comment { color: rgba(165, 122, 76, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.string { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.variable { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.string { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.parameters { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.string { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.array { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.none { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.keyword.operator { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.keyword { color: rgba(152, 103, 106, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.keyword.control { color: rgba(152, 103, 106, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.variable { color: rgba(220, 57, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.entity.name.function { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.meta.require { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.support.function.any-method { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.meta.class { color: rgba(240, 100, 49, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.support.class { color: rgba(240, 100, 49, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.entity.name.class { color: rgba(240, 100, 49, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.entity.name.type.class { color: rgba(240, 100, 49, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.keyword.other.special-method { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.storage { color: rgba(152, 103, 106, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.support.function { color: rgba(126, 96, 44, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.string { color: rgba(136, 155, 74, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.constant.other.symbol { color: rgba(136, 155, 74, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.entity.other.inherited-class { color: rgba(136, 155, 74, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.constant.numeric { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.none { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.none { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.constant { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.entity.name.tag { color: rgba(220, 57, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.entity.other.attribute-name { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.entity.other.attribute-name.id { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.entity { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.meta.selector { color: rgba(152, 103, 106, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.none { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.heading { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.heading.setext { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.heading { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.entity.name.section { color: rgba(138, 177, 176, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.keyword.other.unit { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.bold { font-weight: bold; color: rgba(240, 100, 49, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.bold { font-weight: bold; color: rgba(240, 100, 49, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.italic { font-style: italic; color: rgba(152, 103, 106, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.definition.italic { font-style: italic; color: rgba(152, 103, 106, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.raw.inline { color: rgba(136, 155, 74, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.string.other.link { color: rgba(220, 57, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.meta.link { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.list { color: rgba(220, 57, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.quote { color: rgba(247, 154, 50, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.meta.separator { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.inserted { color: rgba(136, 155, 74, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.deleted { color: rgba(220, 57, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.markup.changed { color: rgba(152, 103, 106, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.constant.other.color { color: rgba(126, 96, 44, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.string.regexp { color: rgba(126, 96, 44, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.constant.character.escape { color: rgba(126, 96, 44, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.punctuation.section.embedded { color: rgba(24, 64, 30, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.variable.interpolation { color: rgba(24, 64, 30, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.invalid.illegal { color: rgba(220, 57, 88, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .monaco-editor-background { background-color: rgba(34, 26, 15, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .glyph-margin { background-color: rgba(34, 26, 15, 1); }
    .vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .monaco-workbench .monaco-editor-background { background-color: rgba(34, 26, 15, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token { color: rgba(211, 175, 134, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .focused .selected-text { background-color: rgba(132, 97, 61, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .selected-text { background-color: rgba(132, 97, 61, 0.5); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .current-line { background-color: rgba(94, 69, 43, 1); border:0; }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .cursor { background-color: rgba(211, 175, 134, 1); border-color: rgba(211, 175, 134, 1); color: rgba(44, 80, 121, 1); }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .token.whitespace { color: rgba(165, 122, 76, 1) !important; }
    .monaco-editor.vs-dark.vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme .lines-content .cigr { background: rgba(165, 122, 76, 1); }
    `;

    return themeText;
  };

  function getSolarizedDarkTheme () {
    var themeText = `
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.comment { font-style: italic; color: rgba(101, 123, 131, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.string { color: rgba(42, 161, 152, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.string.regexp { color: rgba(211, 1, 2, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.constant.numeric { color: rgba(211, 54, 130, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.variable.language { color: rgba(38, 139, 210, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.variable.other { color: rgba(38, 139, 210, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.keyword { color: rgba(133, 153, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.storage { font-weight: bold; color: rgba(147, 161, 161, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.entity.name.class { color: rgba(203, 75, 22, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.entity.name.type.class { color: rgba(203, 75, 22, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.entity.name.function { color: rgba(38, 139, 210, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.punctuation.definition.variable { color: rgba(133, 153, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.punctuation.section.embedded.begin { color: rgba(211, 1, 2, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.punctuation.section.embedded.end { color: rgba(211, 1, 2, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.constant.language { color: rgba(181, 137, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.meta.preprocessor { color: rgba(181, 137, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.support.function.construct { color: rgba(203, 75, 22, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.keyword.other.new { color: rgba(203, 75, 22, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.constant.character { color: rgba(203, 75, 22, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.constant.other { color: rgba(203, 75, 22, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.entity.other.inherited-class { color: rgba(108, 113, 196, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.variable.parameter {  }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.entity.name.tag { color: rgba(38, 139, 210, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.punctuation.definition.tag { color: rgba(101, 123, 131, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.entity.other.attribute-name { color: rgba(147, 161, 161, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.support.function { color: rgba(38, 139, 210, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.punctuation.separator.continuation { color: rgba(211, 1, 2, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.support.constant {  }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.support.type { color: rgba(133, 153, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.support.class { color: rgba(133, 153, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.support.type.exception { color: rgba(203, 75, 22, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.support.other.variable {  }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.invalid {  }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.markup.quote { color: rgba(133, 153, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.markup.list { color: rgba(181, 137, 0, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.markup.bold { color: rgba(211, 54, 130, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.markup.italic { color: rgba(211, 54, 130, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.markup.inline.raw { color: rgba(42, 161, 152, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.markup.heading { color: rgba(38, 139, 210, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.markup.heading.setext { color: rgba(38, 139, 210, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .monaco-editor-background { background-color: rgba(0, 43, 54, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .glyph-margin { background-color: rgba(0, 43, 54, 1); }
    .vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .monaco-workbench .monaco-editor-background { background-color: rgba(0, 43, 54, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token { color: rgba(147, 161, 161, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .focused .selected-text { background-color: rgba(7, 54, 66, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .selected-text { background-color: rgba(7, 54, 66, 0.5); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .current-line { background-color: rgba(7, 54, 66, 1); border:0; }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .cursor { background-color: rgba(211, 1, 2, 1); border-color: rgba(211, 1, 2, 1); color: rgba(44, 254, 253, 1); }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .token.whitespace { color: rgba(147, 161, 161, 0.5) !important; }
    .monaco-editor.vs-dark.vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme .lines-content .cigr { background: rgba(147, 161, 161, 0.5); }
    `;

    return themeText;
  };
  console.log('setupTheme: entered');
    //var newThemeText = redThemeText;
  var newThemeText, newThemeClass;
  var redThemeText, redThemeClass;
  var kimbieThemeText, kimbieThemeClass;

  redThemeText = getRedTheme();
  kimbieThemeText = getKimbieTheme();
  solarizedDarkThemeText = getSolarizedDarkTheme();
  newThemeText = getKimbieTheme();

  redThemeClass = 'vscode-theme-red-themes-red-tmTheme';
  kimbieThemeClass = 'vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme';
  solarizedDarkThemeClass = 'vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme';
  newThemeClass = 'vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme';
  //alert("themeText=" + themeText);

  //$.find('.contributedColorTheme')[0].textContent = newThemeText;
  $.find('.contributedColorTheme')[0].textContent = redThemeText + kimbieThemeText + solarizedDarkThemeText;

  // now replace the body class
  // "monaco-shell vs-dark vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme"

  var bodyClass = $('body').attr('class');

  //var newBodyClass = bodyClass.replace(/vscode-theme[^ ]*/, newThemeClass);
  var newBodyClass = bodyClass.replace(/vscode-theme.*\b/, newThemeClass);

  //alert("newBodyClass=" + newBodyClass);
  $('body').attr('class', newBodyClass);

  // editor div class
  var $leftEditor = $('.editor-left').find('.monaco-editor:eq(0)');
  //var editorClass = $('.editor-left').find('.monaco-editor:eq(0)').attr('class');
  var editorClass = $leftEditor.attr('class');
  //var newEditorClass = editorClass.replace(/vscode-theme.*\b/, newThemeClass);
  var newEditorClass = editorClass.replace(/vscode-theme.*\b/, redThemeClass);
  //console.log('newEditorClass=' + newEditorClass);
  //$('.editor-left').find('.monaco-editor:eq(0)').attr('class', newEditorClass);
  $leftEditor.attr('class', newEditorClass);
  //editorNode.change(function () {console.log('editorNode changed')});
  //    {console.log('editorNode changed: newEditorClass=' + this.newEditorClass)}.bind(this))
  //editorNode.attr('class').trigger('editorClassChanged');


  // overflow-guard.scrollable-element
  var scrollableClass = $('.editor-left').find('.overflow-guard').children('.monaco-scrollable-element').attr('class');
  var newScrollableClass = scrollableClass.replace(/vscode-theme.*\b/, newThemeClass);
  $('.editor-left').find('.overflow-guard')
    .children('.monaco-scrollable-element')
    .attr('class', newScrollableClass);

  // do it for 'editor-center' as well
  // editor div class
  var editorClass = $('.editor-center').find('.monaco-editor:eq(0)').attr('class');
  var newEditorClass = editorClass.replace(/vscode-theme.*\b/, newThemeClass);
  //console.log('newEditorClass=' + newEditorClass);
  $('.editor-center').find('.monaco-editor:eq(0)').attr('class', newEditorClass);


  // overflow-guard.scrollable-element
  var scrollableClass = $('.editor-center').find('.overflow-guard').children('.monaco-scrollable-element').attr('class');
  var newScrollableClass = scrollableClass.replace(/vscode-theme.*\b/, newThemeClass);
  $('.editor-center').find('.overflow-guard').children('.monaco-scrollable-element').attr('class', newScrollableClass);

})();
