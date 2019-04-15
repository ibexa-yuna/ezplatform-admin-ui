!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ezPluginCustomTag=e():(t.eZ=t.eZ||{},t.eZ.ezAlloyEditor=t.eZ.ezAlloyEditor||{},t.eZ.ezAlloyEditor.ezPluginCustomTag=e())}("undefined"!=typeof self?self:this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=73)}({73:function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var r=n(74),a=function(t){return t&&t.__esModule?t:{default:t}}(r);CKEDITOR.dtd.$editable.span=1,function(t){CKEDITOR.plugins.get("ezcustomtag")&&CKEDITOR.plugins.get("ezinlinecustomtag")||(CKEDITOR.plugins.add("ezcustomtag",{requires:"widget,ezaddcontent",init:function(e){var n=Object.assign({},a.default,{editor:e,global:t});e.widgets.add("ezcustomtag",n)}}),CKEDITOR.plugins.add("ezinlinecustomtag",{requires:"widget,ezaddcontent",init:function(e){var n=Object.assign({},a.default,{editor:e,global:t,template:'<span class="ez-custom-tag ez-custom-tag--content-visible" data-ezelement="eztemplateinline" data-ezname="{name}">\n                        <span class="ez-custom-tag__icon-wrapper"></span>\n                        <span data-ezelement="ezcontent">{content}</span>\n                    </span>',requiredContent:"div",upcast:function(t){return"span"===t.name&&"eztemplateinline"===t.attributes["data-ezelement"]&&!t.attributes["data-eztype"]},init:function(){this.on("focus",this.fireEditorInteraction),this.syncAlignment(!0),this.getEzConfigElement(),this.cancelEditEvents(),this.renderIcon()},insertWrapper:function(t){this.editor.insertElement(t)},renderIcon:function(){var e=t.eZ.adminUiConfig.richTextCustomTags[this.getName()];if(e){var n=this.getIconWrapper(),i='\n                        <svg class="ez-icon ez-icon--small ez-icon--secondary">\n                            <use xlink:href='+e.icon+" />\n                        </svg>\n                    ";n.appendHtml(i)}},getIconWrapper:function(){var t=[].concat(i(this.element.getChildren().$)).find(function(t){return t.dataset&&t.classList.contains("ez-custom-tag__icon-wrapper")});return t?t=new CKEDITOR.dom.element(t):(t=new CKEDITOR.dom.element("span"),t.addClass("ez-custom-tag__icon-wrapper"),this.element.append(t,!0)),t}});e.widgets.add("ezinlinecustomtag",n)}}))}(window)},74:function(t,e,n){"use strict";(function(t){function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){var n=[],i=!0,r=!1,a=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){r=!0,a=t}finally{try{!i&&s.return&&s.return()}finally{if(r)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r={defaults:{name:"customtag",content:""},draggable:!1,template:'<div class="ez-custom-tag ez-custom-tag--attributes-visible" data-ezelement="eztemplate" data-ezname="{name}"><div data-ezelement="ezcontent">{content}</div></div>',requiredContent:"div",editables:{content:{selector:'[data-ezelement="ezcontent"]'}},setNameFireEditorInteractionTimeout:null,setAlignmentFireEditorInteractionTimeout:null,unsetAlignmentFireEditorInteractionTimeout:null,setConfigFireEditorInteractionTimeout:null,clearConfigFireEditorInteractionTimeout:null,upcast:function(t){return"div"===t.name&&"eztemplate"===t.attributes["data-ezelement"]&&!t.attributes["data-eztype"]},insertWrapper:function(t){this.editor.eZ.appendElement(t)},insert:function(){var t=CKEDITOR.dom.element.createFromHtml(this.template.output(this.defaults)),e=this.editor.widgets.wrapElement(t,this.name);this.editor.widgets.initOn(t,this.name),this.insertWrapper(e);var n=this.editor.widgets.getByElement(e);n.ready=!0,n.fire("ready"),n.focus()},edit:function(){this.insert()},init:function(){this.on("focus",this.fireEditorInteraction),this.syncAlignment(!0),this.renderAttributes(),this.renderHeader(),this.getEzContentElement(),this.getEzConfigElement(),this.cancelEditEvents(),this.toggleState({currentTarget:{dataset:{target:"attributes"}}})},clearNode:function(t){for(var e=t.getFirst(),n=void 0;e;)n=e.getNext(),e.remove(),e=n},renderHeader:function(){var e=t.eZ.adminUiConfig.richTextCustomTags[this.getName()];if(e){var n=this.getHeader(),i='\n                <div class="ez-custom-tag__header-label">\n                    '+e.label+'\n                </div>\n                <div class="ez-custom-tag__header-btns">\n                    <button class="btn ez-custom-tag__header-btn ez-custom-tag__header-btn--attributes" data-target="attributes">\n                        <svg class="ez-icon ez-icon--small">\n                            <use xlink:href="/bundles/ezplatformadminui/img/ez-icons.svg#list"></use>\n                        </svg>\n                    </button>\n                    <button class="btn ez-custom-tag__header-btn ez-custom-tag__header-btn--content" data-target="content">\n                        <svg class="ez-icon ez-icon--small">\n                            <use xlink:href="/bundles/ezplatformadminui/img/ez-icons.svg#edit"></use>\n                        </svg>\n                    </button>\n                </div>\n        ';this.clearNode(n),n.appendHtml(i),this.attachButtonsListeners()}},attachButtonsListeners:function(){var t=this,e=this.getHeader();[e.findOne(".ez-custom-tag__header-btn--attributes"),e.findOne(".ez-custom-tag__header-btn--content")].forEach(function(e){return e.$.addEventListener("click",t.toggleState.bind(t),!1)})},toggleState:function(t){var e=this,n=t.currentTarget.dataset.target,r={attributes:"ez-custom-tag--attributes-visible",content:"ez-custom-tag--content-visible"};Object.entries(r).forEach(function(t){var r=i(t,2),a=r[0],o=r[1];return e.element.$.classList.toggle(o,a===n)})},renderAttributes:function(){var e=this,n=t.eZ.adminUiConfig.richTextCustomTags[this.getName()];if(n&&n.attributes){var i=Object.keys(n.attributes).reduce(function(t,i){var r=e.getConfig(i);return t+"<p>"+n.attributes[i].label+": "+r+"</p>"},"");this.setWidgetAttributes(i)}},setName:function(t){return this.element.data("ezname",t),window.clearTimeout(this.setNameFireEditorInteractionTimeout),this.setNameFireEditorInteractionTimeout=window.setTimeout(this.fireEditorInteraction.bind(this,"nameUpdated"),50),this},getName:function(){return this.element.data("ezname")},cancelEditEvents:function(){var t=function(t){return t.cancel()};this.on("doubleclick",t,null,null,5),this.on("key",t,null,null,5)},syncAlignment:function(t){var e=this.element.data("ezalign");e?this.setAlignment(e,t):this.unsetAlignment(t)},setAlignment:function(t,e){this.wrapper.data("ezalign",t),this.element.data("ezalign",t),e||(window.clearTimeout(this.setAlignmentFireEditorInteractionTimeout),this.setAlignmentFireEditorInteractionTimeout=window.setTimeout(this.fireEditorInteraction.bind(this,"aligmentUpdated"),50))},unsetAlignment:function(t){this.wrapper.data("ezalign",!1),this.element.data("ezalign",!1),t||(window.clearTimeout(this.unsetAlignmentFireEditorInteractionTimeout),this.unsetAlignmentFireEditorInteractionTimeout=window.setTimeout(this.fireEditorInteraction.bind(this,"aligmentRemoved"),50))},isAligned:function(t){return this.wrapper.data("ezalign")===t},setWidgetContent:function(t){for(var e=this.getEzContentElement(),n=e.getFirst(),i=void 0;n;)i=n.getNext(),n.remove(),n=i;return t instanceof CKEDITOR.dom.node?e.append(t):e.appendHtml(t),this},setConfig:function(t,e){var n=this.getValueElement(t);return n||(n=new CKEDITOR.dom.element("span"),n.data("ezelement","ezvalue"),n.data("ezvalue-key",t),this.getEzConfigElement().append(n)),n.setText(e),window.clearTimeout(this.setConfigFireEditorInteractionTimeout),this.setConfigFireEditorInteractionTimeout=window.setTimeout(this.fireEditorInteraction.bind(this,"configUpdated"),50),this},setWidgetAttributes:function(t){for(var e=this.getEzAttributesElement(),n=e.getFirst(),i=void 0;n;)i=n.getNext(),n.remove(),n=i;return t instanceof CKEDITOR.dom.node?e.append(t):e.appendHtml(t),this},getConfig:function(t){var e=this.getValueElement(t);return e?e.getText():""},clearConfig:function(){for(var t=this.getEzConfigElement();t.firstChild;)t.removeChild(t.firstChild);window.clearTimeout(this.clearConfigFireEditorInteractionTimeout),this.clearConfigFireEditorInteractionTimeout=window.setTimeout(this.fireEditorInteraction.bind(this,"configCleared"),50)},getValueElement:function(t){return this.getEzConfigElement().findOne('[data-ezelement="ezvalue"][data-ezvalue-key="'+t+'"]')},getEzConfigElement:function(){var t=[].concat(n(this.element.getChildren().$)).find(function(t){return t.dataset&&"ezconfig"===t.dataset.ezelement});return t?t=new CKEDITOR.dom.element(t):(t=new CKEDITOR.dom.element("span"),t.data("ezelement","ezconfig"),this.element.append(t)),t},getEzContentElement:function(){var t=[].concat(n(this.element.getChildren().$)).find(function(t){return t.dataset&&"ezcontent"===t.dataset.ezelement});return t?t=new CKEDITOR.dom.element(t):(t=new CKEDITOR.dom.element("div"),t.data("ezelement","ezcontent"),this.element.append(t)),t},getEzAttributesElement:function(){var t=[].concat(n(this.element.getChildren().$)).find(function(t){return t.dataset&&"ezattributes"===t.dataset.ezelement});return t?t=new CKEDITOR.dom.element(t):(t=new CKEDITOR.dom.element("div"),t.data("ezelement","ezattributes"),this.element.append(t,!0)),t},getHeader:function(){var t=[].concat(n(this.element.getChildren().$)).find(function(t){return t.dataset&&t.classList.contains("ez-custom-tag__header")});return t?t=new CKEDITOR.dom.element(t):(t=new CKEDITOR.dom.element("div"),t.addClass("ez-custom-tag__header"),this.element.append(t,!0)),t},fireEditorInteraction:function(t){var e=this.getWrapperRegion(),n=t.name||t,i={editor:this.editor,target:this.element.$,name:"widget"+n,pageX:e.left,pageY:e.top+e.height};this.editor.focus(),this.focus(),this.editor.fire("editorInteraction",{nativeEvent:i,selectionData:{element:this.element,region:e}})},moveAfter:function(t){this.wrapper.insertAfter(t),this.fireEditorInteraction("moveAfter")},moveBefore:function(t){this.wrapper.insertBefore(t),this.fireEditorInteraction("moveBefore")},getWrapperRegion:function(){var t=this.wrapper.getWindow().getScrollPosition(),e=this.wrapper.getClientRect();return e.top+=t.y,e.bottom+=t.y,e.left+=t.x,e.right+=t.x,e.direction=CKEDITOR.SELECTION_TOP_TO_BOTTOM,e}};e.default=r}).call(e,n(75))},75:function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n}}).default});
//# sourceMappingURL=ezPluginCustomTag.js.map