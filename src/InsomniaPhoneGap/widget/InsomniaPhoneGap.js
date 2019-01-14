/*global logger*/
/*
    InsomniaPhoneGap
    ========================

    @file      : InsomniaPhoneGap.js
    @version   : 1.0.0
    @author    : Rionald Chancellor
    @date      : 2019-01-12
    @copyright : Magnus Consulting Sdn Bhd
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",

    "InsomniaPhoneGap/lib/jquery-1.11.2",
    "dojo/text!InsomniaPhoneGap/widget/template/InsomniaPhoneGap.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, _jQuery, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);
    // Declare widget's prototype.
    return declare("InsomniaPhoneGap.widget.InsomniaPhoneGap", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        deviceKeptAwake: false,
        onchangemf: "",
        //onChangeNanoflow: null,
        _keepAwake: false,
        _obj: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            console.log(this.id + ".constructor");
            // document.addEventListener('deviceready', this._onDeviceReady, false);
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + ".postCreate");

            this._updateRendering();
        },

        _startStop: function() {
            if (this.deviceKeptAwake) {
                console.log("Disable keep awake");
                window.plugins.insomnia.allowSleepAgain();
                this.deviceKeptAwake = false;
                this._obj.set(this.keepAwake, false);
                this.sliderNode.parentElement.control.checked = false;
                this._executeAction();
                this._executeNanoflow();
            } else {
                console.log("Keep awake");
                window.plugins.insomnia.keepAwake();
                this.deviceKeptAwake = true;
                this._obj.set(this.keepAwake, true);
                this.sliderNode.parentElement.control.checked = true;
                this._executeAction();
                this._executeNanoflow();
            }
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + ".update");
            this._obj = obj;

            this.deviceKeptAwake = this._obj.get(this.keepAwake);

            if (this.deviceKeptAwake) {
                console.log("Keep awake");
                this.sliderNode.parentElement.control.checked = true;
                window.plugins.insomnia.keepAwake();
            } else {
                console.log("Disable keep awake");
                this.sliderNode.parentElement.control.checked = false;
                window.plugins.insomnia.allowSleepAgain();
            }
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },

        // Rerender the interface.
        _updateRendering: function (callback) {
            console.log(this.id + "._updateRendering");
            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            //mendix.lang.nullExec(callback);
            if (typeof callback !== "undefined") {
                callback();
            }
        },

        _executeNanoflow: function() {
            if (this.onChangeNanoflow.nanoflow && this.mxcontext) {
                mx.data.callNanoflow({
                    nanoflow: this.onChangeNanoflow,
                    origin: this.mxform,
                    context: this.mxcontext,
                    callback: function () {
                        window.mx.ui.reload();
                    },
                    error: function (error) {
                        mx.ui.error("An error occurred while executing the on change nanoflow: " + error.message);
                    }
                });
            }
        },

        _executeAction: function() {
            if (this.onchangemf && this._obj) {
                mx.data.action({
                    params: {
                        actionname: this.onchangemf,
                        applyto: "selection",
                        guids: [ this._obj.getGuid() ]
                    },
                    origin: this.mxform,
                    callback: function () {
                        window.mx.ui.reload();
                    },
                    error: function (error) {
                        mx.ui.error("An error occurred while executing the " + this.onchangemf + ": " + error.message);
                    },
                });
            }
        }
    });
});

require(["InsomniaPhoneGap/widget/InsomniaPhoneGap"]);
