// ==UserScript==
// @name         IsleWard - Addon Settings Framework
// @namespace    IsleWard.Addon
// @version      1.1.0
// @description  Provides a framework for addon developers to effortlessly add their addons' settings to IsleWard's options menu.
// @author       Carnagion
// @match        https://play.isleward.com/
// @grant        none
// ==/UserScript==

defer(addon);

function defer(method)
{
    if (window.jQuery)
    {
        method();
    }
    else
    {
        let handler = function()
        {
            defer(method);
        };
        setTimeout(handler, 50);
    }
}

function addon()
{
    let content =
        {
            menu: null,
            init: function(events)
            {
                window.settings = this;
                window.events = events;
            },
            heading: function(name)
            {
                this.menu ??= $(".ui-container .uiOptions .bottom .list");

                let headingDiv = $(`.ui-container .uiOptions .bottom .list .heading.${this.convertToSafeClassName(name)}`);
                if (headingDiv.length !== 0)
                {
                    return headingDiv;
                }

                headingDiv = $(`<div class="heading ${name.toLowerCase()}">${name}</div>`);
                headingDiv.appendTo(this.menu);
                let headingCss =
                    {
                        "color": "#929398",
                        "border-bottom": "2px solid #69696e",
                        "margin": "10px 10px 5px 10px",
                        "padding-bottom": "5px",
                    };
                headingDiv.css(headingCss);

                return headingDiv;
            },
            toggle: function(name, values, heading)
            {
                let settingContainerDiv = this.option(name, heading);
                if (settingContainerDiv.prevObject)
                {
                    return settingContainerDiv;
                }
                let settingContainerCss =
                    {
                        "height": "30px",
                        "display": "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                    };
                settingContainerDiv.css(settingContainerCss);

                let settingNameDiv = $(`<div class="name">${name}</div>`)
                settingNameDiv.appendTo(settingContainerDiv);
                let settingNameCss =
                    {
                        "color": "#3fa7dd",
                        "flex": "1",
                        "height": "100%",
                        "display": "flex",
                        "align-items": "center",
                        "padding": "0 10px",
                        "margin-right": "10px",
                        "cursor": "pointer",
                    };
                settingNameDiv.css(settingNameCss);

                let settingNameElement = settingNameDiv[0];

                let mouseover = function()
                {
                    settingNameElement.style.color = "#48edff";
                    settingNameElement.style.backgroundColor = "#505360";
                };
                settingNameElement.addEventListener("mouseover", mouseover);
                let mouseout = function()
                {
                    settingNameElement.style.color = "#3fa7dd";
                    settingNameElement.style.backgroundColor = "#373041";
                };
                settingNameElement.addEventListener("mouseout", mouseout);

                let localStorageName = this.getLocalStorageName(name);
                let stored = localStorage.getItem(localStorageName);
                if (stored)
                {
                    cycleUntilMatch(values, stored);
                }

                let settingValueDiv = $(`<div class="value">${values[0]}</div>`);
                settingValueDiv.appendTo(settingContainerDiv);
                let settingValueCss =
                    {
                        "color": "#fcfcfc",
                        "display": "flex",
                        "align-items": "center",
                        "justify-content": "flex-end",
                        "padding-right": "10px",
                    };
                settingValueDiv.css(settingValueCss);

                let click = function()
                {
                    let previous = settingValueDiv.html();
                    values.push(values.shift());
                    let now = values[0];
                    settingValueDiv.html(now);

                    localStorage.setItem(localStorageName, now.toString());

                    window.events.emit("onSettingsToggleClick", name, heading, previous, now);
                };
                settingNameElement.addEventListener("click", click);

                window.events.emit("onSettingsToggleClick", name, heading, null, values[0]);

                return settingContainerDiv;
            },
            switch: function(name, heading)
            {
                return this.toggle(name, ["On", "Off"], heading);
            },
            slider: function(name, min, max, amount, initial, heading)
            {
                let delta = (max - min) / amount;

                let localStorageName = this.getLocalStorageName(name);
                let stored = localStorage.getItem(localStorageName);
                if (stored)
                {
                    initial = parseInt(stored, 10);
                }
                initial = Math.min(Math.max(initial, min), max);

                let settingContainerDiv = this.option(name, heading);
                if (settingContainerDiv.prevObject)
                {
                    return settingContainerDiv;
                }
                let settingContainerCss =
                    {
                        "height": "60px",
                        "display": "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                        "flex-wrap": "wrap",
                    };
                settingContainerDiv.css(settingContainerCss);

                let settingNameDiv = $(`<div class="name">${name}</div>`)
                settingNameDiv.appendTo(settingContainerDiv);
                let settingNameCss =
                    {
                        "color": "#3fa7dd",
                        "flex": "1",
                        "height": "30px",
                        "display": "flex",
                        "align-items": "center",
                        "padding": "0 10px",
                        "margin-right": "10px",
                        "cursor": "pointer",
                        "pointer-events": "none",
                    };
                settingNameDiv.css(settingNameCss);

                let settingValueDiv = $(`<div class="value">${initial}</div>`);
                settingValueDiv.appendTo(settingContainerDiv);
                let settingValueCss =
                    {
                        "color": "#fcfcfc",
                        "width": "50%",
                        "height": "30px",
                        "display": "flex",
                        "padding-right": "10px",
                        "align-items": "center",
                        "justify-content": "flex-end",
                    };
                settingValueDiv.css(settingValueCss);

                let settingSliderDiv = $(`<div class="slider"></div>`);
                settingSliderDiv.appendTo(settingContainerDiv);
                let settingSliderCss =
                    {
                        "padding": "0 10px",
                        "width": "100%",
                        "height": "30px",
                        "display": "flex",
                        "position": "relative",
                    };
                settingSliderDiv.css(settingSliderCss);

                let settingDecreaseDiv = $(`<div class="btn decrease">-</div>`);
                settingDecreaseDiv.appendTo(settingSliderDiv);
                let settingDecreaseCss =
                    {
                        "color": "#fcfcfc",
                        "background-color": "#505360",
                        "width": "30px",
                        "height": "calc(100% - 10px)",
                        "margin-top": "5px",
                        "display": "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        "padding-top": "unset",
                        "margin-right": "10px",
                    };
                settingDecreaseDiv.css(settingDecreaseCss);

                let settingBarDiv = $(`<div class="bar"></div>`);
                settingBarDiv.appendTo(settingSliderDiv);
                let settingBarCss =
                    {
                        "background-color": "#42548d",
                        "width": "100%",
                        "height": "100%",
                        "border-top": "10px solid #373041",
                        "border-bottom": "10px solid #373041",
                        "position": "relative",
                    };
                settingBarDiv.css(settingBarCss);

                let settingTickDiv = $(`<div class="tick"></div>`);
                settingTickDiv.appendTo(settingBarDiv);
                let settingTickCss =
                    {
                        "background-color": "#48edff",
                        "left": `${calculatePercentage(initial, min, max)}%`,
                        "position": "absolute",
                        "width": "5px",
                        "height": "20px",
                        "top": "-5px",
                    };
                settingTickDiv.css(settingTickCss);

                let settingIncreaseDiv = $(`<div class="btn increase">+</div>`);
                settingIncreaseDiv.appendTo(settingSliderDiv);
                let settingIncreaseCss =
                    {
                        "color": "#fcfcfc",
                        "background-color": "#505360",
                        "width": "30px",
                        "margin-top": "5px",
                        "height": "calc(100% - 10px)",
                        "display": "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        "padding-top": "unset",
                        "margin-left": "10px",
                    };
                settingIncreaseDiv.css(settingIncreaseCss);

                let decreaseClick = function()
                {
                    let previous = parseInt(settingValueDiv.html(), 10);
                    let now = Math.max(min, previous - delta);
                    settingValueDiv.html(now);
                    let settingTickCssNew =
                        {
                            "left": `${calculatePercentage(now, min, max)}%`,
                        };
                    settingTickDiv.css(settingTickCssNew);

                    localStorage.setItem(localStorageName, now.toString());

                    settingDecreaseDiv.removeClass("disabled");
                    settingIncreaseDiv.removeClass("disabled");
                    if (now <= min)
                    {
                        settingDecreaseDiv.addClass("disabled");
                    }

                    window.events.emit("onSettingsSliderClick", name, heading, previous, now);
                };
                settingDecreaseDiv[0].addEventListener("click", decreaseClick);

                let increaseClick = function()
                {
                    let previous = parseInt(settingValueDiv.html(), 10);
                    let now = Math.min(max, previous + delta);
                    settingValueDiv.html(now);
                    let settingTickCssNew =
                        {
                            "left": `${calculatePercentage(now, min, max)}%`,
                        };
                    settingTickDiv.css(settingTickCssNew);

                    localStorage.setItem(localStorageName, now.toString());

                    settingDecreaseDiv.removeClass("disabled");
                    settingIncreaseDiv.removeClass("disabled");
                    if (now >= max)
                    {
                        settingIncreaseDiv.addClass("disabled");
                    }

                    window.events.emit("onSettingsSliderClick", name, heading, previous, now);
                }
                settingIncreaseDiv[0].addEventListener("click", increaseClick);

                settingIncreaseDiv.removeClass("disabled");
                if (initial >= max)
                {
                    settingIncreaseDiv.addClass("disabled");
                }
                settingDecreaseDiv.removeClass("disabled");
                if (initial <= min)
                {
                    settingDecreaseDiv.addClass("disabled");
                }

                window.events.emit("onSettingsSliderClick", name, heading, null, initial);

                return settingContainerDiv;
            },
            option: function(name, heading)
            {
                let settingContainerDiv = $(`.ui-container .uiOptions .bottom .list .item.${this.convertToSafeClassName(name)}`);
                if (settingContainerDiv.length !== 0)
                {
                    return settingContainerDiv;
                }

                settingContainerDiv = $(`<div class="item ${name.toLowerCase()}"></div>`);
                settingContainerDiv.insertAfter(this.heading(heading));

                return settingContainerDiv;
            },
            convertToSafeClassName(name)
            {
                return name.toLowerCase().replace(/\s/gi, ".");
            },
            getLocalStorageName(name)
            {
                return `iwd_addon_${name.toLowerCase().replace(/\s/gi, "_")}`;
            },
        };
    addons.register(content);
}

function calculatePercentage(current, min, max)
{
    return (100 * current) / (max - min)
}

function cycleUntilMatch(array, target)
{
    while (array[0] !== target)
    {
        array.push(array.shift());
    }
}