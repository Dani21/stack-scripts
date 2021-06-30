// ==UserScript==
// @name         StackMarks™
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.0
// @description  more cool stuff!
// @author       SpectricSO
// @include      https://*stackoverflow.com/*
// @include      https://*serverfault.com/*
// @include      https://*superuser.com/*
// @include      https://*askubuntu.com/*
// @include      https://*mathoverflow.net/*
// @include      https://*.stackexchange.com/*
//
// @exclude      https://data.stackexchange.com/*
// @exclude      https://contests.stackoverflow.com/*
//
// @exclude      *chat.*
//
// @grant        none
// ==/UserScript==
$(document).ready(function() {
    function a() {
        return JSON.parse(localStorage.getItem("stack-marks-data"))
    }

    function e(a) {
        localStorage.setItem("stack-marks-data", a)
    }

    function t(t) {
        var s = a();
        if (null != s[t]) {
            var n = s;
            delete n[t], e(JSON.stringify(n))
        }
    }

    function s() {
        var e = a(),
            l = $(".stackmarks-list", d);
        l.empty();
        var i = 0;
        for (var r in e) {
            i++;
            var o = document.createElement("div");
            o.classList.add("stackmarks-category");
            var c = document.createElement("h2");
            c.classList.add("stackmarks-category-name"), $(c).css({
                margin: "10px 0px",
                "border-bottom": "1px solid"
            });
            var m = document.createElement("a");
            m.classList.add("stackmarks-category-delete"), m.innerHTML = '<i class="material-icons">delete</i>', $(m).on("dblclick", () => {
                t(r), s()
            }), c.textContent = r, c.appendChild(m), o.appendChild(c);
            var k = document.createElement("div");
            k.classList.add("stackmarks-category-list"), Array.from(e[r].links).forEach(a => {
                var e = document.createElement("div");
                e.classList.add("stackmarks-category-item");
                var t = document.createElement("a");
                t.href = a.url, t.innerText = a.title;
                var l = document.createElement("a");
                l.classList.add("stackmarks-delete"), l.innerHTML = '<i class="material-icons">delete</i>';
                var d = document.createElement("span");
                $(d).css({
                    color: "grey",
                    float: "right"
                }), d.textContent = a.date, e.appendChild(t), e.appendChild(l), e.appendChild(d), k.appendChild(e), $(l).on("dblclick", () => {
                    n(r, a.url), s()
                })
            }), o.appendChild(k), l.append(o)
        }
        i || l.append('<span style="color:grey">You have not added any StackMarks yet</span>')
    }

    function n(t, s) {
        var n = a();
        if (null != n[t]) {
            console.log(`Received data: category [${t}] link [${s}]`);
            var l = n;
            l[t].links.forEach(a => {
                if (a.url == s) return l[t].links.splice(l[t].links.indexOf(a), 1), void e(JSON.stringify(l))
            })
        }
    }
    var l, d, i, r;

    function o(a, e) {
        null != l && clearTimeout(l), $(document.body).append(`<div class="s-toast" aria-hidden="true" role="alertdialog" aria-labelledby="notice-message" id="stackmarks-notice">\n    <aside class="grid s-notice s-notice__info" role="status">\n     <div class="grid--cell mr8">\n     </div>\n     <div class="grid--cell lh-lg">\n         ${a}\n     </div>\n </aside>\n </div>`), setTimeout(() => {
            $("#stackmarks-notice").attr("aria-hidden", "false")
        }, 10), l = setTimeout(() => {
            $("#stackmarks-notice").attr("aria-hidden", "true")
        }, e)
    }
    null == a() && localStorage.setItem("stack-marks-data", "{}"), $(document.head).append('<style>\n    .stackmarks-list .stackmarks-delete, .stackmarks-list .stackmarks-category-delete{\n        display:none;\n        color:#D1383D;\n        margin-left:10px;\n        float: right;\n    }\n    .stackmarks-list .material-icons{\n        font-size:18px;\n    }\n    .stackmarks-category-item:hover > .stackmarks-delete{\n        display:inline;\n    }\n    .stackmarks-list .stackmarks-category-name:hover > .stackmarks-category-delete{\n        display:inline;\n    }\n    </style><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'), $(document.body).append('<div data-controller="s-modal" id="stackmarks-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n            <div class="s-modal--dialog" role="document" style="width:80%; min-width:600px">\n                <h1 class="s-modal--header" id="modal-title">StackMarks™ - Dashboard</h1>\n                <p class="s-modal--body" id="modal-description">Better bookmarks for a better experience, brought to you by <a href="https://stackoverflow.com/users/14251221/spectric">SpectricSO</a></p>\n                <p style="color:red">Double click on the delete icon to delete a bookmark</p>\n                <div class="stackmarks-list" style="margin-bottom:20px"></div>\n                <div class="stackmarks-new-category" style="\n    margin-bottom: 10px;\n    display: none;\n">\n    <input class="s-input w90" id="stackmarks-new-category-input" type="text" placeholder="Category name"><button class="grid--cell s-btn s-btn__outlined" type="button" id="stackmarks-new-category-btn" style="\n    margin-left: 5px;\n">Add</button>\n</div>\n                <div class="grid gs8 gsx s-modal--footer">\n                    <button class="grid--cell s-btn s-btn__primary" type="button" data-action="s-modal#hide">Save and Close</button>\n                    <button class="grid--cell s-btn s-btn__outlined" type="button" id="stackmarks-new-category">New Category</button>\n                    <button class="grid--cell s-btn" type="button" data-action="s-modal#hide"  id="stackmarks-modal-cancel">Cancel</button>\n                </div>\n            </div>\n        </aside>\n    </div>'), $(document.body).append('<div data-controller="s-modal" id="stackmarks-add-modal">\n        <aside class="s-modal" data-target="s-modal.modal" id="modal-base" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-hidden="true">\n            <div class="s-modal--dialog" role="document">\n                <h1 class="s-modal--header" id="modal-title">StackMarks™ - New</h1>\n                <div class="s-modal--body" id="modal-description">\n            <label class="s-menu--label grid" for="…">\n                <div class="grid--cell mr8">\n                    <input class="s-radio" type="radio" name="…" id="…" role="menuitemradio" checked="">\n                </div>\n                <div class="grid--cell">\n                    <div class="s-label">animations</div>\n\n                </div>\n            </label>\n            <label class="s-menu--label grid" for="…">\n                <div class="grid--cell mr8">\n                    <input class="s-radio" type="radio" name="…" id="…" role="menuitemradio">\n                </div>\n                <div class="grid--cell">\n                    <div class="s-label">other stuff</div>\n\n                </div>\n    </label></div><p></p>\n                <div class="stackmarks-list" style="margin-bottom:20px"></div>\n                <div class="grid gs8 gsx s-modal--footer">\n                    <button class="grid--cell s-btn s-btn__primary" type="button"  data-action="s-modal#hide" id="stackmarks-add-category-confirm">Add</button>\n                    <button class="grid--cell s-btn" type="button" data-action="s-modal#hide">Cancel</button>\n                </div>\n            </div>\n        </aside>\n    </div>'), $(".question .votecell.post-layout--left .js-voting-container").append('<a class="js-post-issue grid--cell s-btn s-btn__unset c-pointer py6 mx-auto" id="stackmarks-add-new" href="javascript:void(0)" aria-label="Add StackMark">+SM\n    </a>'), setTimeout(() => {
        d = $("#stackmarks-modal"), i = $("#stackmarks-add-modal"), r = $("#stackmarks-add-new"),
            function() {
                var t = a();
                r.on("click", () => {
                    ! function() {
                        var e = $(".s-modal--body", i);
                        e.empty();
                        var t = a(),
                            s = 0;
                        for (var n in t) {
                            s++;
                            var l = document.createElement("label");
                            l.classList.add("s-menu--label", "grid"), l.setAttribute("for", "stackmarks-category-option-" + s);
                            var d = document.createElement("div");
                            d.classList.add("grid--cell", "mr8");
                            var r = document.createElement("input");
                            r.type = "radio", r.classList.add("s-radio"), r.name = "stackmarks-category-option", r.id = "stackmarks-category-option-" + s, d.appendChild(r);
                            var o = document.createElement("div");
                            o.classList.add("grid-cell");
                            var c = document.createElement("div");
                            c.classList.add("s-label"), c.innerText = n, o.appendChild(c), l.appendChild(d), l.appendChild(o), e.append(l)
                        }
                        s || e.append('<span style="color:grey">You have not created any categories yet</span>')
                    }(), Stacks.showModal(i[0])
                }), $("#stackmarks-add-category-confirm").on("click", () => {
                    var t = $(".s-label", $("input[name=stackmarks-category-option]:checked", i).closest(".s-menu--label"));
                    t.text().length > 0 && (function(t, s, n) {
                        var l = a(),
                            d = l[t];
                        const i = new Date;
                        var r = `Y${i.getFullYear()}-M${i.getMonth()+1}-D${i.getDate()}`;
                        if (null == d) {
                            let a = l;
                            a[t] = {
                                links: [{
                                    url: s,
                                    title: n,
                                    date: r
                                }]
                            }, e(JSON.stringify(a))
                        } else {
                            d.links.forEach(a => {
                                a.url
                            });
                            let a = l;
                            a[t].links.push({
                                url: s,
                                title: n,
                                date: r
                            }), e(JSON.stringify(a))
                        }
                    }(t.text(), location.pathname, $(".question-hyperlink").first().text()), Stacks.hideModal(i[0]), o("Successfully added StackMark", 2e3))
                }), $(document).on("keyup", e => {
                    var n = window.event || e;
                    n.ctrlKey && n.shiftKey && 75 == n.keyCode && (t = a(), s(), Stacks.showModal(d[0]))
                }), $("#stackmarks-modal-cancel").click(() => {
                    e(JSON.stringify(t)), o("Cancelled changes", 2e3)
                });
                var n = $(".stackmarks-new-category"),
                    l = $("#stackmarks-new-category-input");
                $("#stackmarks-new-category").click(() => {
                    n.slideToggle()
                }), $("#stackmarks-new-category-btn").click(() => {
                    n.slideUp();
                    var t = l.val();
                    t.length > 0 && (function(t) {
                        var s = a();
                        if (null == s[t]) {
                            var n = s;
                            n[t] = {
                                links: []
                            }, e(JSON.stringify(n))
                        }
                    }(t), s())
                })
            }()
    }, 50)
});

/**
MIT License
Copyright (c) 2021 SpectricSO <https://stackoverflow.com/users/14251221/spectric>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/
