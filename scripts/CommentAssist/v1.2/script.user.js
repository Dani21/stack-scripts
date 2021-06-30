// ==UserScript==
// @name         CommentAssist - Stack Exchange
// @namespace    https://github.com/SpectricSO/stack-scripts
// @version      1.2
// @description  Making comments just got easier
// @author       SpectricSO
// @match       *://*.askubuntu.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @exclude     *://api.stackexchange.com/*
// @exclude     *://blog.*.com/*
// @exclude     *://chat.*.com/*
// @exclude     *://contests.*.com/*
// @exclude     *://data.stackexchange.com/*
// @exclude     *://elections.stackexchange.com/*
// @exclude     *://openid.stackexchange.com/*
// @exclude     *://stackexchange.com/*
// @grant        none
// ==/UserScript==
$(document).ready(function() {
    const t = $('<style>\n.commentassist-container {padding-top: 5px;padding-left: 5px;padding-bottom: 10px;width: 100%;margin: auto;border: 1px solid #bbc0c4;border-radius: 5px 5px 0px 0px;border-bottom: none;margin-bottom: -2px;}.s-textarea.js-comment-text-input {border-top: none;}</style><div class="commentassist-container"><div class="d-flex commentassist-row jc-space-between"><div class="commentassist-options d-flex jc-space-between" style="width:200px"><button class="s-btn s-btn__muted p2 flex--item commentassist-option" data-type="bold" type="button"><span class="icon-bg iconBold"></span></button><button class="s-btn s-btn__muted p2 flex--item commentassist-option" data-type="italics"type="button"><span class="icon-bg iconItalic"></span></button><button class="s-btn s-btn__muted p2 flex--item commentassist-option" data-type="code" type="button"><span class="icon-bg iconCode"></span></button><button class="s-btn s-btn__muted p2 flex--item commentassist-option" data-type="link" type="button"><span class="icon-bg iconLink"></span></button><button class="s-btn s-btn__muted p2 flex--item commentassist-option" data-type="quote" type="button"><span class="icon-bg iconQuote"></span></button></div><div class="d-flex ai-center pr12"><span style="color:var(--black-200);" class="ws-nowrap">CommentAssist by <a href="https://stackoverflow.com/users/14251221/spectric">Spectric</a></span></div></div></div>'),
        s = {
            bold: {
                prefix: "**",
                suffix: "**"
            },
            italics: {
                prefix: "*",
                suffix: "*"
            },
            code: {
                prefix: "`",
                suffix: "`"
            },
            link: {
                prefix: "[](",
                suffix: ")"
            },
            quote: {
                prefix: '*"',
                suffix: '"*'
            }
        };
    $(".js-add-link.comments-link").on("click", function() {
        const e = $(this).closest(".js-post-comments-component");
        setTimeout(function() {
            const n = e.find(".js-comment-text-input");
            $(".commentassist-container", e).length < 1 && (t.clone().insertBefore(n), $(".commentassist-option").on("click", function() {
                const t = $(this).attr("data-type"),
                    e = s[t].prefix,
                    o = s[t].suffix,
                    i = n.prop("selectionStart"),
                    c = n.prop("selectionEnd"),
                    a = n.val(),
                    p = a.substring(0, i) + e + a.substring(i, c) + o + a.substring(c);
                n.val(p), n.prop("selectionStart", i + e.length), n.prop("selectionEnd", c + e.length), n.focus()
            }))
        }, 50)
    }), document.addEventListener("keydown", function(t) {
        if (t || (t = event), t.ctrlKey && document.activeElement.classList.contains("js-comment-text-input")) {
            var s = !1;
            66 == t.keyCode ? ($('.commentassist-option[data-type="bold"]', $(t.target).prev()).click(), s = !0) : 73 == t.keyCode ? ($('.commentassist-option[data-type="italics"]', $(t.target).prev()).click(), s = !0) : 75 == t.keyCode ? ($('.commentassist-option[data-type="code"]', $(t.target).prev()).click(), s = !0) : 76 == t.keyCode ? ($('.commentassist-option[data-type="link"]', $(t.target).prev()).click(), s = !0) : 81 == t.keyCode && ($('.commentassist-option[data-type="quote"]', $(t.target).prev()).click(), s = !0), s && t.preventDefault()
        }
    })
});
