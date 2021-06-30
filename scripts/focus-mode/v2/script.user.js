// ==UserScript==
// @name         StackFocus 2.0
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      2.0
// @description  Cool stuff
// @author       SpectricSO
// @include      https://*stackoverflow.com/*
// @include      https://*serverfault.com/*
// @include      https://*superuser.com/*
// @include      https://*askubuntu.com/*
// @include      https://*mathoverflow.net/*
// @include      https://*.stackexchange.com/*
// @exclude      https://data.stackexchange.com/*
// @exclude      https://contests.stackoverflow.com/*
// @exclude      *chat.*
// @icon         https://www.google.com/s2/favicons?domain=stackoverflow.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    $(document).ready(function () {
        String.prototype.includes = function (e) {
            return this.indexOf(e) != -1;
        }
        var isInstalled = localStorage.getItem("stack-focus-preferences") != null;
        if (!isInstalled) {
            localStorage.setItem("stack-focus-preferences", JSON.stringify({
                "findajob": "show",
                "teamsadvert": "show",
                "oblock": "show",
                "linked": "show",
                "related": "show",
                "hotnetworkq": "show"
            }));
        }
        try {
            var preferences = JSON.parse(localStorage.getItem("stack-focus-preferences"));
        } catch (err) {
            console.error("%cStack Focus storage has been corrupted. Enter %clocalStorage.removeItem('stack-focus-preferences');%c into the console to recalibrate storage.", "", "font-family:Courier", "");
        }
        const html = '<style>.stack-focus{position:fixed;top:25%;left:calc((100% - 700px) / 2);width:700px;height:50%;background-color:white;z-index:100000;box-shadow:0 0 3px black;border-radius:5px;padding:2em;font-family:Roboto}.stack-focus .stack-focus-option{position:relative}.stack-focus-option p{position:absolute;top:5px}.stack-focus .input-group .f-radio-toggle{margin-left:auto}.stack-focus h1{margin-bottom:5px;}</style><div class="stack-focus"><h1>Focus Mode v2.0</h1><h3>By: <a href="https://stackoverflow.com/users/14251221">Spectric</a></h3><div><div class="stack-focus-option"><p>Left sidebar Find a Job category:</p><div class="input-group"><div class="grid f-radio-toggle _muted"><div class="grid--cell"> <input class="js-subscribe" type="radio" name="stack-focus-1" id="left_sidebar_findajob_on" checked=""> <label for="left_sidebar_findajob_on" class="f-label">Show</label></div><div class="grid--cell"> <input class="_off js-unsubscribe " type="radio" name="stack-focus-1" id="left_sidebar_findajob_off"> <label for="left_sidebar_findajob_off" class="f-label">Hide</label></div></div></div></div><div class="stack-focus-option"><p>Left sidebar Teams advertisement:</p><div class="input-group"><div class="grid f-radio-toggle _muted"><div class="grid--cell"> <input class="js-subscribe" type="radio" name="stack-focus-2" id="left_sidebar_teams_on" checked=""> <label for="left_sidebar_teams_on" class="f-label">Show</label></div><div class="grid--cell"> <input class="_off js-unsubscribe " type="radio" name="stack-focus-2" id="left_sidebar_teams_off"> <label for="left_sidebar_teams_off" class="f-label">Hide</label></div></div></div></div><div class="stack-focus-option"><p>Overflow Blog + Featured on Meta + Hot Meta Posts:</p><div class="input-group"><div class="grid f-radio-toggle _muted"><div class="grid--cell"> <input class="js-subscribe" type="radio" name="stack-focus-3" id="right_sidebar_oblock_on" checked=""> <label for="right_sidebar_oblock_on" class="f-label">Show</label></div><div class="grid--cell"> <input class="_off js-unsubscribe " type="radio" name="stack-focus-3" id="right_sidebar_oblock_off"> <label for="right_sidebar_oblock_off" class="f-label">Hide</label></div></div></div></div><div class="stack-focus-option"><p>Linked Posts:</p><div class="input-group"><div class="grid f-radio-toggle _muted"><div class="grid--cell"> <input class="js-subscribe" type="radio" name="stack-focus-4" id="right_sidebar_linkedposts_on" checked=""> <label for="right_sidebar_linkedposts_on" class="f-label">Show</label></div><div class="grid--cell"> <input class="_off js-unsubscribe " type="radio" name="stack-focus-4" id="right_sidebar_linkedposts_off"> <label for="right_sidebar_linkedposts_off" class="f-label">Hide</label></div></div></div></div><div class="stack-focus-option"><p>Related Posts:</p><div class="input-group"><div class="grid f-radio-toggle _muted"><div class="grid--cell"> <input class="js-subscribe" type="radio" name="stack-focus-5" id="right_sidebar_relatedposts_on" checked=""> <label for="right_sidebar_relatedposts_on" class="f-label">Show</label></div><div class="grid--cell"> <input class="_off js-unsubscribe " type="radio" name="stack-focus-5" id="right_sidebar_relatedposts_off"> <label for="right_sidebar_relatedposts_off" class="f-label">Hide</label></div></div></div></div><div class="stack-focus-option"><p>Hot Network Questions</p><div class="input-group"><div class="grid f-radio-toggle _muted"><div class="grid--cell"> <input class="js-subscribe" type="radio" name="stack-focus-6" id="right_sidebar_hotnetwork_on" checked=""> <label for="right_sidebar_hotnetwork_on" class="f-label">Show</label></div><div class="grid--cell"> <input class="_off js-unsubscribe " type="radio" name="stack-focus-6" id="right_sidebar_hotnetwork_off"> <label for="right_sidebar_hotnetwork_off" class="f-label">Hide</label></div></div></div></div></div></div>';
        function setup() {
            $(document.body).append(html);
        }
        function check(jqueryCheckbox) {
            jqueryCheckbox.prop("checked", true);
        }
        function calibrate() {
            if (preferences.findajob != "show") {
                $($('li .fs-fine').get(1)).hide();
                $('#nav-jobs').hide();
                $('#nav-companies').hide();
                check($('#left_sidebar_findajob_off'));
            } else {
                $($('li .fs-fine').get(1)).show();
                $('#nav-jobs').show();
                $('#nav-companies').show();
            }
            if (preferences.teamsadvert != "show") {
                $($('.nav-links').get(2)).hide();
                check($('#left_sidebar_teams_off'));
            } else {
                $($('.nav-links').get(2)).show();
            }
            if (preferences.oblock != "show") {
                $('.s-sidebarwidget[data-tracker="cb=1"]').hide();
                check($('#right_sidebar_oblock_off'));
            } else {
                $('.s-sidebarwidget[data-tracker="cb=1"]').show()
            }
            if (preferences.linked != "show") {
                $('.sidebar-linked').hide();
                check($('#right_sidebar_linkedposts_off'));
            } else {
                $('.sidebar-linked').show();
            }
            if (preferences.related != "show") {
                $('.sidebar-related').hide();
                check($('#right_sidebar_relatedposts_off'));
            } else {
                $('.sidebar-related').show();
            }
            if (preferences.hotnetworkq != "show") {
                $('#hot-network-questions').hide();
                check($('#right_sidebar_hotnetwork_off'));
            } else {
                $('#hot-network-questions').show();
            }
        }
        function invert(s) {
            return (s == "show" ? "hide" : "show");
        }
        function updateStorage(id) {
            if (id.includes('left_sidebar_findajob')) {
                preferences.findajob = invert(preferences.findajob);
            }
            if (id.includes('left_sidebar_teams')) {
                preferences.teamsadvert = invert(preferences.teamsadvert);
            }
            if (id.includes('right_sidebar_oblock')) {
                preferences.oblock = invert(preferences.oblock);
            }
            if (id.includes('right_sidebar_linkedposts')) {
                preferences.linked = invert(preferences.linked);
            }
            if (id.includes('right_sidebar_relatedposts')) {
                preferences.related = invert(preferences.related);
            }
            if (id.includes('right_sidebar_hotnetwork')) {
                preferences.hotnetworkq = invert(preferences.hotnetworkq);
            }
            let stringified = JSON.stringify(preferences);
            localStorage.setItem("stack-focus-preferences", stringified);
            preferences = JSON.parse(stringified);
        }
        function logic() {
            var modal = $('.stack-focus');
            modal.hide();
            $('input', modal).on('click', function () {
                updateStorage($(this).attr('id'));
                calibrate();
            })
            $(document).on('keyup', function (e) {
                var evt = window.event || e;
                if (evt.keyCode == 81 && evt.ctrlKey) {
                    modal.fadeToggle();
                }
            })
        }
        setup();
        calibrate();
        logic();
    })
})();

/*
MIT License: https://github.com/SpectricSO/stack-scripts/blob/main/LICENSE
*/
