!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ezPluginRemoveBlock=t():(e.eZ=e.eZ||{},e.eZ.ezAlloyEditor=e.eZ.ezAlloyEditor||{},e.eZ.ezAlloyEditor.ezPluginRemoveBlock=t())}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=69)}({69:function(e,t,n){"use strict";!function(e){if(!CKEDITOR.plugins.get("ezremoveblock")){var t={moveCaretToElement:function(e,t){var n=e.eZ.findCaretElement(t);e.eZ.moveCaretToElement(e,n),this.fireEditorInteraction(e,n)},fireEditorInteraction:function(e,t){var n={editor:e,target:t.$,name:"eZRemoveBlockDone"};e.fire("editorInteraction",{nativeEvent:n,selectionData:e.getSelectionData()})},changeFocus:function(e,t){var n=e.widgets.getByElement(t);n?n.focus():this.moveCaretToElement(e,t)},getElementToRemove:function(e){var t=e.elementPath(),n=e.widgets.focused?e.widgets.focused.wrapper:t.block;return n||(n=t.elements.find(function(e){return"eztemplateinline"===e.$.dataset.ezelement})),n.is("li")?n.getParent():n},getElementToFocus:function(e){var t=e.getNext();return t&&t.type!==CKEDITOR.NODE_TEXT&&!t.hasAttribute("data-cke-temp")||(t=e.getPrevious()),t&&t.type===CKEDITOR.NODE_TEXT&&(t=t.getParent()),t||(t=e.getParent()),t},exec:function(e){var t=this.getElementToRemove(e),n=this.getElementToFocus(t);t.remove(),n&&(n.hasClass("ez-data-source__richtext")&&(n=new CKEDITOR.dom.element("p"),e.insertElement(n)),this.changeFocus(e,n))}};CKEDITOR.plugins.add("ezremoveblock",{requires:["widget","ezcaret"],init:function(e){return e.addCommand("eZRemoveBlock",t)}})}}(window)}}).default});
//# sourceMappingURL=ezPluginRemoveBlock.js.map