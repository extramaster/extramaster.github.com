/*global conversionObject, document, window, alert, location, Option */
/*jslint forin: true, unparam: true */
/* Variables */
var i, j, generatedHTML, collength, contextt, currentTabd, activeLink, masterConvert, anotherIeFix, fullFrom, fullTo;
(function (notDefined) {
    "use strict";
    var i, j;
    window.addEvent = function (event, target, method) {
        if (target.addEventListener) {
            target.addEventListener(event, method, false);
        } else if (target.attachEvent) {
            target.attachEvent("on" + event, method);
        }
    };
    /* The code that generates the table! */
    generatedHTML = '<table id="masterTable" colspan="8"><colgroup colspan="8"><col><col class="even"><col><col class="even"><col><col class="even"><col><col class="even"></colgroup><thead></thead><tbody>';
    for (i in conversionObject.special) {
        generatedHTML += "<tr class='context'><th colspan='8'>" + i + "</th></tr><tr>";
        collength = 0;
        for (j in conversionObject.special[i]) {
            if (collength % 8 === 0) {
                generatedHTML += "</tr><tr>";
            }
            collength = collength + 1;
            generatedHTML += "<td>" + j + "</td>";
        }
        for (j = 0; j < 8 - (collength % 8); j += 1) {
            if (8 - (collength % 8) < 8) {
                generatedHTML += "<td> </td>";
            }
        }
        generatedHTML += "</tr>";
    }
    for (i in conversionObject.master) {
        generatedHTML += "<tr class='context'><th colspan='8'>" + i + "</th></tr><tr>";
        collength = 0;
        for (j in conversionObject.master[i]) {
            if (collength % 8 === 0) {
                generatedHTML += "</tr><tr>";
            }
            collength = collength + 1;
            generatedHTML += "<td>" + j + "</td>";
        }
        for (j = 0; j < 8 - (collength % 8); j += 1) {
            if (8 - (collength % 8) < 8) {
                generatedHTML += "<td> </td>";
            }
        }
        generatedHTML += "</tr>";
    }
    document.getElementById("quickIEFix").innerHTML = generatedHTML + "</tbody></table>";




    /* The kinda complex code that powers the second demo */

    anotherIeFix = document.getElementById("fullContext");
    for (i in conversionObject.special) {
        anotherIeFix.options[anotherIeFix.options.length] = new Option(i, i);
    }

    for (i in conversionObject.master) {
        anotherIeFix.options[anotherIeFix.options.length] = new Option(i, i);
    }

    function updateFullContext() {
        var j;
        contextt = document.getElementById("fullContext").value;
        fullFrom = document.getElementById("fullFrom");
        fullTo = document.getElementById("fullTo");
        while (fullTo.options.length > 0) {
            fullTo.options[0] = null;
        }
        while (fullFrom.options.length > 0) {
            fullFrom.options[0] = null;
        }
        if (conversionObject.special[contextt] !== notDefined) {
            for (j in conversionObject.special[contextt]) {
                fullFrom.options[fullFrom.length] = new Option(j, j);
                fullTo.options[fullTo.length] = new Option(j, j);
            }
        } else if (conversionObject.master[contextt] !== notDefined) {
            for (j in conversionObject.master[contextt]) {
                fullFrom.options[fullFrom.length] = new Option(j, j);
                fullTo.options[fullTo.length] = new Option(j, j);
            }
        } else {
            alert("Gaming the system eh?");
        }


    }
    window.addEvent("change", document.getElementById("fullContext"), updateFullContext);
    updateFullContext();

    masterConvert = function () {
        alert(conversionObject.functions.converter(document.getElementById("fullContext").value, document.getElementById("fullFrom").value, document.getElementById("fullTo").value, document.getElementById('fullValue').value));
    };



    /* Misc. Code that relate to the demo/docs page */
    currentTabd = ["about", "download", "docs", "table", "demo"];

    function resetActive() {
        for (i = 0; i < currentTabd.length; i += 1) {
            document.getElementById(currentTabd[i] + "-button").setAttribute("class", "");
        }
    }

    resetActive();
    activeLink = document.getElementById(location.hash.substr(1) + "-button");
    if (activeLink !== null) {
        activeLink.setAttribute("class", "active");
    }


    function activeCheck() {
        for (i = 0; i < currentTabd.length; i += 1) {
            if (document.body.scrollTop < document.getElementById(currentTabd[i]).offsetTop) {
                resetActive();
                if (i - 1 < 0) {
                    i = 1;
                }
                document.getElementById(currentTabd[i - 1] + "-button").setAttribute("class", "active");
                return false;
            }
        }
    }
    window.onscroll = activeCheck;
    window.addEvent("scroll", document.body, activeCheck);
}());