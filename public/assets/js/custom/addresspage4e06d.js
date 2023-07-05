﻿var straddress = '';
var currentEditor = "editor";
$(function () {
    $("[rel='tooltip']").tooltip({ html: true });
});
var hash = window.location.hash.substring(1);
var tempI = 0;

function updatehash(strhash) {

    try {
        if (strhash === '') {
            history.replaceState("", document.title, window.location.href.split('#')[0]);
        } else {
            var baseUrl = window.location.href.split('#')[0];
            history.replaceState("", document.title, baseUrl + '#' + strhash);
        }
    } catch (err) {
        console.log(err);
    }


    activaTab(strhash);
}

function activaTab(tab) {
    var subtab = '0';
    let fNumber;
    if (tab.lastIndexOf("#") > -1) {
        fNumber = tab.substring(tab.lastIndexOf("#"), tab.length);
        fNumber = fNumber.replace("#F", "");
    }

    if (tab.indexOf('comment') >= 0) {
        tab = 'comments';
        loaddisqus();
    } else if (tab.indexOf('code') >= 0) {
        subtab = '1';
    } else if (tab.indexOf('readContract') >= 0) {
        subtab = '1';
        loadIframeSource(fNumber);
    } else if (tab.indexOf('writeContract') >= 0) {
        subtab = '1';
        loadIframeSource5(fNumber);
    } else if (tab.indexOf('readProxyContract') >= 0) {
        subtab = '1';
        loadIframeSourceProxyRead(fNumber);
    } else if (tab.indexOf('writeProxyContract') >= 0) {
        subtab = '1';
        loadIframeSourceProxyWrite(fNumber);
    } else if (tab.indexOf('readCustomContract') >= 0) {
        subtab = '1';
        loadIframeSourceCustomRead();
    } else if (tab.indexOf('writeCustomContract') >= 0) {
        subtab = '1';
        loadIframeSourceCustomWrite();
    } else if (tab.indexOf('tokentxnsErc721') >= 0) {
        loadIframeSource6();
    } else if (tab.indexOf('tokentxnsErc1155') >= 0 && allowErc1155 === "True") {
        loadIframeSourceErc1155();
    } else if (tab.indexOf('analytics') >= 0) {
        $('.nav_tabs1 a[href="#analytics"]').tab('show');
        loadIframeSource7(tab);  
    } else if (tab.indexOf('tokentxns') >= 0) {
        loadIframeSource2();
    } else if (tab.indexOf('deposittxns') >= 0) {
        loadIframeDeposit();
    } else if (tab.indexOf('loansAddress') >= 0) {
        loadIframeSource9();
    } else if (tab.indexOf('loans') >= 0) {
        loadIframeSource8();
    } else if (tab.indexOf('events') >= 0) {
        loadIframeEvents();
    } else if (tab.indexOf('rewards') >= 0) {
        loadIframeRewards();
    }

    var obj1 = document.getElementById('ContentPlaceHolder1_li_readContract');
    var obj2 = document.getElementById('ContentPlaceHolder1_li_writeContract');
    var obj3 = document.getElementById('ContentPlaceHolder1_li_readProxyContract');
    var obj4 = document.getElementById('ContentPlaceHolder1_li_writeProxyContract');
    var obj5 = document.getElementById('ContentPlaceHolder1_li_readCustomContract');
    var obj6 = document.getElementById('ContentPlaceHolder1_li_writeCustomContract');
    document.getElementById('divClientMultiSearch').style.display = 'none';

    if (subtab === '0') {
        $('.nav_tabs1 a[href="#' + tab + '"]').tab('show');

        if (obj1 === null && obj2 === null && obj3 === null && obj4 === null && obj5 === null && obj6 === null) {
            document.getElementById('nav_subtabs').style.display = "none";
            $("#code").attr("style", "display:visible;");
        } else {
            document.getElementById('nav_subtabs').style.display = "visible";
            $("#code").attr("style", "display:visible;");
            $("#readContract").attr("style", "display:none;");
            $("#writeContract").attr("style", "display:none;");
            $("#readProxyContract").attr("style", "display:none;");
            $("#writeProxyContract").attr("style", "display:none;");
            $("#readCustomContract").attr("style", "display:none;");
            $("#writeCustomContract").attr("style", "display:none;");
        }

    } else if (subtab == '1') {

        if (tab.lastIndexOf("#") > -1) {
            tab = tab.substring(0, tab.lastIndexOf("#"))
        }

        $('.nav_tabs1 a[href="#contracts"]').tab('show');

        if (obj1 === null && obj2 === null && obj3 === null && obj4 === null && obj5 === null && obj6 === null) {
            document.getElementById('nav_subtabs').style.display = "none";
        } else {
            document.getElementById('nav_subtabs').style.display = "visible";
            $('.nav-pills li a[href="#' + tab + '"]').tab('show');


            tempI++;
            
            if (tab === 'code' && tempI === 2)
                setTimeout(function () {
                    var searchText = window.localStorage.getItem("searchCode");

                    if (searchText) {
                        myTocSelect('event ' + searchText + '(');

                        window.localStorage.removeItem("searchCode");
                    }
                }, 1000);
        }

        if (tab == 'code') {
            $('#readContract').attr('style', 'display:none;');
            $('#code').attr('style', 'display:visible;');
            $('#writeContract').attr('style', 'display:none;');
            $('#readProxyContract').attr('style', 'display:none;');
            $('#writeProxyContract').attr('style', 'display:none;');
            $("#readCustomContract").attr("style", "display:none;");
            $("#writeCustomContract").attr("style", "display:none;");
            document.getElementById('divClientMultiSearch').style.display = 'block';
        } else if (tab == 'readContract') {
            $('#readContract').attr('style', 'display:visible;');
            $('#code').attr('style', 'display:none;');
            $('#writeContract').attr('style', 'display:none;');
            $('#readProxyContract').attr('style', 'display:none;');
            $('#writeProxyContract').attr('style', 'display:none;');
            $("#readCustomContract").attr("style", "display:none;");
            $("#writeCustomContract").attr("style", "display:none;");
        } else if (tab == 'writeContract') {
            $('#writeContract').attr('style', 'display:visible;');
            $('#code').attr('style', 'display:none;');
            $('#readContract').attr('style', 'display:none;');
            $('#readProxyContract').attr('style', 'display:none;');
            $('#writeProxyContract').attr('style', 'display:none;');
            $("#readCustomContract").attr("style", "display:none;");
            $("#writeCustomContract").attr("style", "display:none;");
        } else if (tab == 'readProxyContract') {
            $('#writeContract').attr('style', 'display:none;');
            $('#code').attr('style', 'display:none;');
            $('#readContract').attr('style', 'display:none;');
            $('#readProxyContract').attr('style', 'display:visible;');
            $('#writeProxyContract').attr('style', 'display:none;');
            $("#readCustomContract").attr("style", "display:none;");
            $("#writeCustomContract").attr("style", "display:none;");
        } else if (tab == 'writeProxyContract') {
            $('#writeContract').attr('style', 'display:none;');
            $('#code').attr('style', 'display:none;');
            $('#readContract').attr('style', 'display:none;');
            $('#readProxyContract').attr('style', 'display:none;');
            $('#writeProxyContract').attr('style', 'display:visible;');
            $("#readCustomContract").attr("style", "display:none;");
            $("#writeCustomContract").attr("style", "display:none;");
        } else if (tab == 'readCustomContract') {
            $('#code').attr('style', 'display:none;');
            $('#readContract').attr('style', 'display:none;');
            $('#writeContract').attr('style', 'display:none;');
            $('#readProxyContract').attr('style', 'display:none;');
            $('#writeProxyContract').attr('style', 'display:none;');
            $("#readCustomContract").attr("style", "display:visible;");
            $("#writeCustomContract").attr("style", "display:none;");
        } else if (tab == 'writeCustomContract') {
            $('#code').attr('style', 'display:none;');
            $('#readContract').attr('style', 'display:none;');
            $('#writeContract').attr('style', 'display:none;');
            $('#readProxyContract').attr('style', 'display:none;');
            $('#writeProxyContract').attr('style', 'display:none;');
            $("#readCustomContract").attr("style", "display:none;");
            $("#writeCustomContract").attr("style", "display:visible;");
        }
    };
}

$(document).ready(function () {
    if (hash != '') {
        activaTab(hash);

    }
  
    var mainaddress = document.getElementById("mainaddress");
    if (mainaddress != null) {
        mainaddress.innerHTML = Web3Utils.toChecksumAddress(mainaddress.innerHTML);
        straddress = mainaddress.innerHTML;
        var blockiesData = blockies.create({ seed: straddress.toLowerCase(), size: 8, scale: 16 }).toDataURL();
        $('#icon').attr('src', blockiesData);
    } else {
        straddress = "";
        $('#icon').attr('src', "/images/main/empty-token.png");
    }

    $('#savenote').click(function () {
        var address = document.getElementById("mainaddress").innerText;   //window.location.pathname.substring(9);
        address = address.replace(/^\s+|\s+$/gm, '');
        var privname = document.getElementById("txtPrivateNameTag").value;
        var privnote = document.getElementById("txtPrivateNoteArea").value;
        $.ajax({
            type: 'Get',
            url: '/updateHandler',
            data: {
                opr: 'updatenoteaddr',
                a: address,
                nametag: privname,
                txt: privnote,
                sid: sid
            },
            success: function (res) {
                if (res == 0) {
                    $('#responsive').modal('toggle');
                } else if (res == 1) {
                    $("#privatenotetip").html("<font color='gray'><i class='fa fa-exclamation-circle'></i> Sorry but to update your private Note, You have to be <font color='#48B8EE'><a href='/login'><b>Logged In</b></a></font> first.</font>");
                } else if (res == 2) {
                    $("#privatenotetip").html("<font color='gray'><i class='fa fa-exclamation-triangle'></i> Unable to update private Note. General exception error occurred.</font>");
                } else if (res == 3) {
                    $('#responsive').modal('toggle');
                } else if (res == 4) {
                    $("#privatenotetip").html("<font color='gray'><i class='fa fa-exclamation-triangle'></i> Unable to remove private Note. General exception error occurred.</font>");
                } else if (res == 5) {
                    $("#privatenotetip").html("<font color='red'><i class='fa fa-exclamation-triangle'></i> Sorry, we were unable to add a new private Note. You have exceeded the maximum allowed quota for your account</font>");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    });
    $('#closenote').click(function () {
        $("#privatenotetip").html("Tip: A private note (up to 500 characters) can be attached to this address. Please do NOT store any passwords or private keys here.");
    });

    //dropdownboxwithsearch
    var isBtnClick = false;
    var mousedownHappened = false;
    $('a').mousedown(function () {
        mousedownHappened = true;
    });
    $("#myInput2").click(function () {
        if (isBtnClick == false) {
            document.getElementById("balancelist").classList.toggle("show");
            isBtnClick = true;
        }
    });
    $("#myInput2").blur(function () {
        isBtnClick = false;
        if (mousedownHappened) // cancel the blur event
        {
            mousedownHappened = false;
        }
        else {
            document.getElementById("balancelist").classList.toggle("show");
            document.getElementById("myInput2").value = "";
            myFunction();
        }
    });

    //For Single contract source code
    $("#panel-sourcecode").click(function (e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.children('i').hasClass('fa-expand')) {
            $this.children('i').removeClass('fa-expand');
            $this.children('i').addClass('fa-compress');
            //$("#editor").height("100%");

            var editor = ace.edit("editor");
            editor.setOptions({ maxLines: Infinity });
            
            setTimeout(function () {
                js_addresspage4_ace_extension_panel_sourcecode.onObserve();
            },200)
        }
        else if ($this.children('i').hasClass('fa-compress')) {
            $this.children('i').removeClass('fa-compress');
            $this.children('i').addClass('fa-expand');
            //$("#editor").height("350px");

            var editor = ace.edit("editor");
            editor.setOptions({ maxLines: MaxLines });

            js_addresspage4_ace_extension_panel_sourcecode.offObserve();
        }
        $(this).closest('.panel-sourcecode').toggleClass('panel-fullscreen');
    });

    //For multi file contract source code    
    $(".togglefullscreen").click(function (e) {
        e.preventDefault();
        var id = this.id.split('_');
        var editorId = "editor" + id[1];
        currentEditor = editorId;

        var $this = $(this);
        if ($this.children('i').hasClass('fa-expand')) {
            $this.children('i').removeClass('fa-expand');
            $this.children('i').addClass('fa-compress');
            //$("#" + editorId).height("100%");

            var editor = ace.edit(editorId);
            editor.setOptions({ maxLines: Infinity });
            setTimeout(function () {
                js_addresspage4_ace_extension_panel_sourcecode.onObserve();
            }, 200)
        }
        else if ($this.children('i').hasClass('fa-compress')) {
            $this.children('i').removeClass('fa-compress');
            $this.children('i').addClass('fa-expand');
            //$("#" + editorId).height("350px");

            var editor = ace.edit(editorId);
            editor.setOptions({ maxLines: MaxLines });
            js_addresspage4_ace_extension_panel_sourcecode.offObserve();
        }
        $(this).closest('.panel-sourcecode').toggleClass('panel-fullscreen');
    });

    $("#panel-ABI").click(function (e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.children('i').hasClass('fa-expand')) {
            $this.children('i').removeClass('fa-expand');
            $this.children('i').addClass('fa-compress');
            $("#js-copytextarea2").css('height', 'auto');
            $("#js-copytextarea2").css('max-height', 'auto');
        }
        else if ($this.children('i').hasClass('fa-compress')) {
            $this.children('i').removeClass('fa-compress');
            $this.children('i').addClass('fa-expand');
            $("#js-copytextarea2").css('height', '200px');
            $("#js-copytextarea2").css('max-height', '400px');
        }
        $(this).closest('.panel-ABI').toggleClass('panel-fullscreen');
    });

    $("#panel-custom-ABI").click(function (e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.children('i').hasClass('fa-expand')) {
            $this.children('i').removeClass('fa-expand');
            $this.children('i').addClass('fa-compress');
            $("#js-copycustomtextarea2").css('height', 'auto');
            $("#js-copycustomtextarea2").css('max-height', 'auto');
        }
        else if ($this.children('i').hasClass('fa-compress')) {
            $this.children('i').removeClass('fa-compress');
            $this.children('i').addClass('fa-expand');
            $("#js-copycustomtextarea2").css('height', '200px');
            $("#js-copycustomtextarea2").css('max-height', '400px');
        }
        $(this).closest('.panel-custom-ABI').toggleClass('panel-fullscreen');
    });
});



var xQRCodeCreated = false;
$("#target").click(function () {
    showQRCodeBox();
});

function showQRCodeBox() {
    document.getElementById("qraddress").innerHTML = straddress;
    if (xQRCodeCreated == false) {
        var qrcode = new QRCode("qrcode", {
            text: straddress,
            width: 235,
            height: 235,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        }
        );
    };
    xQRCodeCreated = true;
    $('#myModal').modal('show');
}

function showModal() {
    $('#responsive').modal('show');
}

var currentmode = 'hex';
var orival = document.getElementById('dividcode').innerHTML;
var decodedval = '';

function getDecodedCode(strval, strUrl) {
    var strResult = ' ... Processing ....';
    var url;
    url = strUrl + '/api?module=opcode&action=getopcode&address=' + strval;
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        cache: true,
        dataType: "json",
        success: function (result) {
            strResult = result.result;
        },
        error: function (data) {
            console.log('Error in [getDecodedCode]');
        },
    });
    return strResult;
}

function convertstr(strval) {
    if (currentmode == 'hex') {
        if (decodedval == '') {
            tmpval = getDecodedCode(strval, strURL);
            decodedval = tmpval;
        } else {
            tmpval = decodedval;
        }
        document.getElementById('dividcode').innerHTML = "<pre class='wordwrap'>" + tmpval + "</pre>";
        document.getElementById('ContentPlaceHolder1_btnconvert222').innerHTML = 'Switch Back To Bytecodes View';
        currentmode = 'asc';
    } else {
        document.getElementById('dividcode').innerHTML = orival;
        document.getElementById('ContentPlaceHolder1_btnconvert222').innerHTML = 'Switch To Opcodes View';
        currentmode = 'hex';
    }
}

function showopcodesforverifiedcontract() {
    if (currentmode == 'hex') {
        if (decodedval == '') {
            tmpval = getDecodedCode(straddress, strURL);
            decodedval = tmpval;
            orival = document.getElementById('verifiedbytecode2').innerHTML;
        } else {
            tmpval = decodedval;
        }
        document.getElementById('verifiedbytecode2').innerHTML = tmpval;
        document.getElementById('btnConvert3').innerText = 'Switch Back To Bytecodes View';
        currentmode = 'asc';
    } else {
        document.getElementById('verifiedbytecode2').innerHTML = orival;
        document.getElementById('btnConvert3').innerText = 'Switch To Opcodes View';
        currentmode = 'hex';
    }
}

var disqusloaded = false;
function loaddisqus() {
    if (disqusloaded == false) {
        disqusloaded = true;
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);        
    }
   
}



var readContractLoaded = false;
function loadIframeSource(fLine) {
    if (readContractLoaded == false) {
        readContractLoaded = true;
        if (fLine) {
            document.getElementById('readcontractiframe').src = '/readContract?m=' + window.mode + '&a=' + litreadContractAddress + '&v=' + litContractABIAddressCode + '&t=' + isTestnet + '&F=' + fLine;
        }
        else {
            document.getElementById('readcontractiframe').src = '/readContract?m=' + window.mode + '&a=' + litreadContractAddress + '&v=' + litContractABIAddressCode + '&t=' + isTestnet;
        }
    }
}

function loadIframeSource5(fLine) {
    if (window.writeContractLoaded == false) {
        window.writeContractLoaded = true;
        if (fLine) {
            document.getElementById('writecontractiframe').src = '/writecontract/index?m=' + window.mode + '&v=21.4.1.0&a=' + litreadContractAddress + '&n=' + strNetwork + '&p=' + litMinimalProxyImplementation + '&t=' + isTestnet + '&F=' + fLine;
        } else {
            document.getElementById('writecontractiframe').src = '/writecontract/index?m=' + window.mode + '&v=21.4.1.0&a=' + litreadContractAddress + '&n=' + strNetwork + '&p=' + litMinimalProxyImplementation + '&t=' + isTestnet;
        }
    }
}

function loadIframeSourceProxyRead(fLine) {
    if (window.readProxyContractLoaded == false) {
        window.readProxyContractLoaded = true;
        if (fLine) {
            document.getElementById('readproxycontractiframe').src = '/readContract?m=' + window.mode + '&a=' + litreadContractAddress + '&v=' + litProxyContractABIAddress + '&t=' + isTestnet + '&F=' + fLine;
        } else {
            document.getElementById('readproxycontractiframe').src = '/readContract?m=' + window.mode + '&a=' + litreadContractAddress + '&v=' + litProxyContractABIAddress + '&t=' + isTestnet;
        }
    }
}

function loadIframeSourceProxyWrite(fLine) {
    if (window.writeProxyContractLoaded == false) {
        window.writeProxyContractLoaded = true;
        if (fLine) {
            document.getElementById('writeproxycontractiframe').src = '/writecontract/index?m=' + window.mode + '&v=21.4.1.1&a=' + litreadContractAddress + '&p=' + litProxyContractABIAddress + '&n=' + strNetwork + '&t=' + isTestnet + '&F=' + fLine;
        } else {
            document.getElementById('writeproxycontractiframe').src = '/writecontract/index?m=' + window.mode + '&v=21.4.1.1&a=' + litreadContractAddress + '&p=' + litProxyContractABIAddress + '&n=' + strNetwork + '&t=' + isTestnet;
        }
    }
}

function loadIframeSourceCustomRead() {
    if (window.readCustomContractLoaded == false) {
        window.readCustomContractLoaded = true;
        document.getElementById('readcustomcontractiframe').src = '/readContract?m=' + window.mode + '&a=' + litreadContractAddress + '&c=' + litCustomContractABIAddress + '&t=' + isTestnet;
    }
}

function loadIframeSourceCustomWrite() {
    if (window.writeCustomContractLoaded == false) {
        window.writeCustomContractLoaded = true;
        document.getElementById('writecustomcontractiframe').src = '/writecustomcontract.aspx?m=' + window.mode + '&v=20.8.1.0&c=' + litCustomContractABIAddress + '&n=' + strNetwork + '&t=' + isTestnet;
    }
}

var tokenPageLoaded = false;
function loadIframeSource2() {
    if (tokenPageLoaded == false) {
        tokenPageLoaded = true;
        document.getElementById('tokenpageiframe').src = '/address-tokenpage?m=' + window.mode + '&a=' + litreadContractAddress;
    }
}

var tokenErc721PageLoaded = false;
function loadIframeSource6() {
    if (tokenErc721PageLoaded == false) {
        tokenErc721PageLoaded = true;
        document.getElementById('tokenerc721_pageiframe').src = '/address-erc721tokenpage?m=' + window.mode + '&a=' + litreadContractAddress;
    }
}

var tokenErc1155PageLoaded = false;
function loadIframeSourceErc1155() {
    if (tokenErc1155PageLoaded == false) {
        tokenErc1155PageLoaded = true;
        document.getElementById('tokenerc1155_pageiframe').src = '/address-erc1155tokenpage?m=' + window.mode + '&a=' + litreadContractAddress;
    }
}

var analyticsPageLoaded = false;
function loadIframeSource7(tab) {
    if (analyticsPageLoaded == false) {
        analyticsPageLoaded = true;

        var source = '/address-analytics?m=' + window.mode + '&a=' + litreadContractAddress + '&lg=' + litLanguage + '&cc=' + litCurrencyCode;

        if (tab.indexOf('analytics-txfees') >= 0)
            source = source + "#txfees";
        else if (tab.indexOf('analytics-balance') >= 0)
            source = source + "#balance";
        else if (tab.indexOf('analytics-tx') >= 0)
            source = source + "#tx";
        else if (tab.indexOf('analytics-transfer') >= 0)
            source = source + "#transfer";
        else if (tab.indexOf('analytics-tokentransfer') >= 0)
            source = source + "#tokentransfer";
        else if (tab.indexOf('analytics-hashrate') >= 0)
            source = source + "#hashrate";
        else if (tab.indexOf('analytics-mining') >= 0)
            source = source + "#mining";
        else if (tab.indexOf('analytics-balance') >= 0)
            source = source + "#balance";

        document.getElementById('analytics_pageiframe').src = source
    }
}

var loansPageLoaded = false;
function loadIframeSource8() {
    if (loansPageLoaded == false) {
        loansPageLoaded = true;
        document.getElementById('loans_pageiframe').src = '/address-loan?m=' + window.mode + '&a=' + litreadContractAddress + '&lg=' + litLanguage + '&cc=' + litCurrencyCode;
    }
}

var loansAddressPageLoaded = false;
function loadIframeSource9() {
    if (loansAddressPageLoaded == false) {
        loansAddressPageLoaded = true;
        document.getElementById('loansAddressiframe').src = '/loansAddress?m' + window.mode + '&a=' + litreadContractAddress;
    }
}

var eventsPageLoaded = false;
function loadIframeEvents() {
    if (eventsPageLoaded == false) {
        eventsPageLoaded = true;
        document.getElementById('eventsIframe').src = '/address-events?m=' + window.mode + '&a=' + litreadContractAddress + '&v=' + litContractABIAddressCode;
    }
    }

    var depositPageLoaded = false;
    function loadIframeDeposit() {
        if (depositPageLoaded == false) {
            depositPageLoaded = true;
            document.getElementById('deposit_pageiframe').src = '/address-deposit?m=' + window.mode + '&a=' + litreadContractAddress;
        }
}

var rewardsPageLoaded = false;
function loadIframeRewards() {
    if (rewardsPageLoaded == false) {
        rewardsPageLoaded = true;
        document.getElementById('rewards_pageiframe').src = '/address-reward?m=' + window.mode + '&a=' + litreadContractAddress;
    }
}

function copySourceCodeBtn(el) {
    try {
        var editorId = $(el).closest($(".d-flex")).next().attr("id");
        var editor = ace.edit(editorId);
        var sel = editor.selection.toJSON(); // save selection
        editor.selectAll();
        editor.focus();
        document.execCommand('copy');
        editor.selection.fromJSON(sel); // restore selection
        //alert('Source code copied to clipboard');

        //get i element and original image class
        changeCopyIcon(el, "Copied");
    } catch (err) {
        console.log('Oops, unable to copy');
    }
}

function generatePermalink(el) {
    try {

        var editorId = $(el).closest($(".d-flex")).next().attr("id");
        var editor = ace.edit(editorId);
        var cursorPosition = editor.getCursorPosition();

        var row = cursorPosition.row + 1;

        var currentUrl = window.location.href;
        var baseUrl = currentUrl.split("#")[0] + "#code";

        var fileNumber = editorId.replace("editor", "");
        if (fileNumber) {
            baseUrl = baseUrl + "#F" + fileNumber;
        }

        baseUrl = baseUrl + "#L" + row;

        //copy to clipboard code
        var elem = document.createElement('textarea');
        elem.value = baseUrl;
        document.body.appendChild(elem);
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);

        //get i element and original image class
        changeCopyIcon(el, "Copied");

    } catch (err) {
        console.log('Oops, unable to generate permalink');
    }
}

function changeCopyIcon(el, tooltipText) {
    var iElem = $(el).children("i")[0];
    var oriImageClass = $(iElem).attr("class");
    var oriTooltip = $(el).attr('data-original-title');
    var checkImageClass = 'fa fa-check btn-icon__inner'

    $(iElem).removeClass(oriImageClass).addClass(checkImageClass);
    $(el).attr('data-original-title', tooltipText);

    setTimeout(() => {
        $(el).tooltip('show');
    }, 1);

    setTimeout(() => {
        $(iElem).removeClass(checkImageClass).addClass(oriImageClass);
        $(el).attr('data-original-title', oriTooltip)
    }, 1000)
}

function copyAbiBtn() {
    var range = document.createRange();
    range.selectNode(document.getElementById("js-copytextarea2"));
    var selectionRange = window.getSelection();
    selectionRange.removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("Copy");
    alert("Contract ABI copied to clipboard");
}

function Count(text) {
    var maxlength = 500;
    var object = document.getElementById(text.id); //get your object
    if (object.value.length > maxlength) {
        object.focus();
        object.value = text.value.substring(0, maxlength); //truncate the value
        object.scrollTop = object.scrollHeight; //scroll to the end to prevent jumping
        return false;
    }
    return true;
}

function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput2');
    filter = input.value.toUpperCase();
    ul = document.getElementById("balancelist");
    li = ul.getElementsByTagName('li');
    for (i = 1; i < li.length; i++) {
        a = li[i].getElementsByClassName('liH')[0];
       
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
} 


function copyAbiBtn2(el) {
    var range = document.createRange();
    range.selectNodeContents(document.getElementById("js-copytextarea2"));
    var selectionRange = window.getSelection();
    selectionRange.removeAllRanges()
    window.getSelection().addRange(range);
    document.execCommand("Copy");
    //alert("Contract ABI copied to clipboard")
    //var el = $("#js-copytextarea2");
    changeCopyIcon(el, "Copied");
};
function copyCustomAbiBtn2(el) {
    var range = document.createRange();
    range.selectNodeContents(document.getElementById("js-copycustomtextarea2"));
    var selectionRange = window.getSelection();
    selectionRange.removeAllRanges()
    window.getSelection().addRange(range);
    document.execCommand("Copy");
    //alert("Custom ABI copied to clipboard")
    changeCopyIcon(el, "Copied");
};
function showLoader(obj) {
    if (obj == false) {
        document.getElementById('overlayMain').style.display = 'block';
    }
}

function copy(id) {
    var range = document.createRange();
    range.selectNode(document.getElementById(id));
    var selectionRange = window.getSelection();
    selectionRange.removeAllRanges()
    window.getSelection().addRange(range);
    document.execCommand("Copy");
    try {
        window.getSelection().removeRange(range);
    } catch (err) { }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(function () {
    var ele;
    var a = 0;//avoid 2x trigger
    $(document).on('click', '.trigger-tooltip', function () {
        if (a == 0) {
            a = 1;
            copy('mainaddress');
            ele = this;
            $(ele).attr('title', "Address copied to clipboard");
            $(ele).attr('data-original-title', "Address copied to clipboard");
            $(ele).addClass("on");
            $(ele).tooltip({
                items: '.trigger-tooltip.on',
                position: {
                    my: "left+30 center",
                    at: "right center",
                    collision: "flip"
                }
            });
            if (ele.id == 'cp') { $(ele).attr('title', "Copy address to clipboard"); }//reset to make sure title is not change to tooltip title
            $(ele).trigger('mouseenter');
            setTimeout(function () {
                $(ele).blur();
                $(ele).attr('data-original-title', "");
                a = 0;
            }, 1500);
        }
    });
    //prevent mouseout and other related events from firing their handlers
    $('#cp').on('mouseout', function (e) {
        e.stopImmediatePropagation();
    });
    //prevent mouseout and other related events from firing their handlers
    $('#mainaddress').on('mouseout', function (e) {
        e.stopImmediatePropagation();
    });

    $('#darkModaBtn').on('click', function () {
        if (window.events_tracker) {
            var cookie = getCookie('displaymode');
            $('#eventsIframe').contents().find("a[href*='/address-events?'").each(function (i, ele) {
                var link = $(ele).attr('href').toString();
                if (link.indexOf('m=dark') > -1) {
                    if (cookie === 'normal')
                        link = link.replace('m=dark', 'm=normal');
                } else if (link.indexOf('m=normal') > -1) {
                    if (cookie === 'dark')
                        link = link.replace('m=normal', 'm=dark')
                } else if (link.indexOf('m=normal') < 0 || link.indexOf('m=normal') < 0) {
                    if (cookie === 'dark')
                        link = link + '&m-dark';
                }
                $(ele).attr('href', link);
            })
        }
    });

});

function resizeIframe(obj, addwidth) {
    setTimeout(function () {
        obj.style.height = 0;
        obj.style.height = (obj.contentWindow.document.body.scrollHeight + addwidth) + 20 + 'px';
        obj.parentElement.style.visibility = 'visible';
    }, 300);
};

function UpdatePrivateNameTagDisplay() {
    var result = document.getElementById("txtPrivateNameTag").value;
    if (result == '') {
        document.getElementById("Public_Private_Tag").innerHTML = "Not Available, ";
        document.getElementById("Public_Private_Tag_edit_button").innerHTML = "<a data-toggle='modal' data-target='#responsive' title='Assign a Private Name Tag or Note for this address (only viewable by the user who created the tag)' href='#'>Update?</a>";
    } else {
        document.getElementById("Public_Private_Tag").innerText = result;
        document.getElementById("Public_Private_Tag_edit_button").innerHTML = "<a data-toggle='modal' data-target='#responsive' title='View/Update Private Name Tag or Note' href='#'> <i class='far fa-edit text-info ml-1'></i> </a>";
    }
};

$('#ContentPlaceHolder1_li_code').on('click', function () {
    $('#code').attr('style', 'display:visible;');
    $('#readContract').attr('style', 'display:none;');
    $('#writeContract').attr('style', 'display:none;');
    $('#readProxyContract').attr('style', 'display:none;');
    $('#writeProxyContract').attr('style', 'display:none;');
    $('#readCustomContract').attr('style', 'display:none;');
    $('#writeCustomContract').attr('style', 'display:none;');
});
$('#ContentPlaceHolder1_li_readContract').on('click', function () {
    $('#code').attr('style', 'display:none;');
    $('#readContract').attr('style', 'display:visible;');
    $('#writeContract').attr('style', 'display:none;');
    $('#readProxyContract').attr('style', 'display:none;');
    $('#writeProxyContract').attr('style', 'display:none;');
    $('#readCustomContract').attr('style', 'display:none;');
    $('#writeCustomContract').attr('style', 'display:none;');

    var obj = document.getElementById('readcontractiframe');
    resizeIframe(obj, -20);
});
$('#ContentPlaceHolder1_li_writeContract').on('click', function () {
    $('#code').attr('style', 'display:none;');
    $('#readContract').attr('style', 'display:none;');
    $('#writeContract').attr('style', 'display:visible;');
    $('#readProxyContract').attr('style', 'display:none;');
    $('#writeProxyContract').attr('style', 'display:none;');
    $('#readCustomContract').attr('style', 'display:none;');
    $('#writeCustomContract').attr('style', 'display:none;');

    var obj = document.getElementById('writecontractiframe');
    resizeIframe(obj, -20);
});
$('#ContentPlaceHolder1_li_readProxyContract').on('click', function () {
    $('#code').attr('style', 'display:none;');
    $('#readContract').attr('style', 'display:none;');
    $('#writeContract').attr('style', 'display:none;');
    $('#readProxyContract').attr('style', 'display:visible;');
    $('#writeProxyContract').attr('style', 'display:none;');
    $('#readCustomContract').attr('style', 'display:none;');
    $('#writeCustomContract').attr('style', 'display:none;');

    var obj = document.getElementById('readproxycontractiframe');
    resizeIframe(obj, -20);
});
$('#ContentPlaceHolder1_li_writeProxyContract').on('click', function () {
    $('#code').attr('style', 'display:none;');
    $('#readContract').attr('style', 'display:none;');
    $('#writeContract').attr('style', 'display:none;');
    $('#readProxyContract').attr('style', 'display:none;');
    $('#writeProxyContract').attr('style', 'display:visible;');
    $('#readCustomContract').attr('style', 'display:none;');
    $('#writeCustomContract').attr('style', 'display:none;');

    var obj = document.getElementById('writeproxycontractiframe');
    resizeIframe(obj, -20);
});
$('#ContentPlaceHolder1_li_readCustomContract').on('click', function () {
    $('#code').attr('style', 'display:none;');
    $('#readContract').attr('style', 'display:none;');
    $('#writeContract').attr('style', 'display:none;');
    $('#readProxyContract').attr('style', 'display:none;');
    $('#writeProxyContract').attr('style', 'display:none;');
    $('#readCustomContract').attr('style', 'display:visible;');
    $('#writeCustomContract').attr('style', 'display:none;');

    var obj = document.getElementById('readcustomcontractiframe');
    resizeIframe(obj, -20);
});
$('#ContentPlaceHolder1_li_writeCustomContract').on('click', function () {
    $('#code').attr('style', 'display:none;');
    $('#readContract').attr('style', 'display:none;');
    $('#writeContract').attr('style', 'display:none;');
    $('#readProxyContract').attr('style', 'display:none;');
    $('#writeProxyContract').attr('style', 'display:none;');
    $('#readCustomContract').attr('style', 'display:none;');
    $('#writeCustomContract').attr('style', 'display:visible;');

    var obj = document.getElementById('writecustomcontractiframe');
    resizeIframe(obj, -20);
});
$('#ContentPlaceHolder1_li_contracts').on('click', function () {
    hideSubTab();
});

function hideSubTab() {
    var obj1 = document.getElementById('ContentPlaceHolder1_li_readContract');
    var obj2 = document.getElementById('ContentPlaceHolder1_li_writeContract');
    var obj3 = document.getElementById('ContentPlaceHolder1_li_readProxyContract');
    var obj4 = document.getElementById('ContentPlaceHolder1_li_writeProxyContract');
    var obj5 = document.getElementById('ContentPlaceHolder1_li_readCustomContract');
    var obj6 = document.getElementById('ContentPlaceHolder1_li_writeCustomContract');

    if ((obj1 == null) && (obj2 == null) && (obj3 == null) && (obj4 == null) && (obj5 == null) && (obj6 == null)) {
        document.getElementById('nav_subtabs').style.display = "none";
        $("#code").attr("style", "display:visible;");
    } else {
        document.getElementById('nav_subtabs').style.display = "visible";
        $('.nav-pills li a[href="#code"]').tab('show');

        $('#code').attr('style', 'display:visible;');
        $('#readContract').attr('style', 'display:none;');
        $('#writeContract').attr('style', 'display:none;');
        $('#readProxyContract').attr('style', 'display:none;');
        $('#writeProxyContract').attr('style', 'display:none;');
        $('#readCustomContract').attr('style', 'display:none;');
        $('#writeCustomContract').attr('style', 'display:none;');
    };
};

function myTocSelect(searchText) {
    if (searchText == "") {
        editor.gotoLine(0, 0, true);
    } else {
        var range = editor.find(searchText, {
            wrap: true,
            caseSensitive: false,
            wholeWord: false,
            regExp: false
        });

        range.start.column = 0;
        range.end.column = Number.MAX_VALUE;
        editor.selection.selectLine();
        editor.selection.setRange(range, false);
    }
}


function getUrlParams() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function removeURLParameter(url, parameter) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
}

function closeFilter(data) {
    var url = window.location.href;
    if (data.id == "btnBlockClear") {
        window.location.href = removeURLParameter(url, "blockrange");
    }
    else if (data.id == "btnAgeClear") {
        window.location.href = removeURLParameter(url, "agerange");
    }
    else if (data.id == "btnFromClear") {
        window.location.href = removeURLParameter(url, "fromaddress");
    }
    else if (data.id == "btnToClear") {
        window.location.href = removeURLParameter(url, "toaddress");
    }
}

function constructFilterUrl(data) {

    if (data.id == "btnBlockFilter") {
        if ($("#fromblock").val().trim() == "" || $("#toblock").val().trim() == "") {
            alert("Please enter all required fields");
            return;
        }
    }
    else if (data.id == "btnAgeFilter") {
        if ($("#fromage").val().trim() == "" || $("#toage").val().trim() == "") {
            alert("Please enter all required fields");
            return;
        }
    }
    else if (data.id == "btnFromFilter") {
        if ($("#fromaddress").val().trim() == "") {
            alert("Please enter the required field");
            return;
        }
    }
    else if (data.id == "btnToFilter") {
        if ($("#toaddress").val().trim() == "") {
            alert("Please enter the required field");
            return;
        }
    }

    var currentUrl = window.location.href;
    var arr = currentUrl.split('?');
    if (currentUrl.length > 1 && arr[1] != '' && arr[1] != undefined) {
        currentUrl = currentUrl + "&";
    }
    else {
        currentUrl = currentUrl + "?";
    }

    var flag = false;
    if ($("#fromblock").val().trim() != "" && $("#toblock").val().trim() != "") {
        flag = true;
        var newUrl = removeURLParameter(currentUrl, "blockrange");
        currentUrl = newUrl + "blockrange=" + $("#fromblock").val().trim() + "~" + $("#toblock").val().trim();
    }
    else if ($("#fromage").val().trim() != "" && $("#toage").val().trim() != "") {
        flag = true;
        var newUrl = removeURLParameter(currentUrl, "agerange");
        currentUrl = newUrl + "agerange=" + $("#fromage").val().trim() + "~" + $("#toage").val().trim();
    }
    else if ($("#fromaddress").val().trim() != "") {
        flag = true;
        var newUrl = removeURLParameter(currentUrl, "fromaddress");
        currentUrl = newUrl + "fromaddress=" + $("#fromaddress").val().trim();
    }
    else if ($("#toaddress").val().trim() != "") {
        flag = true;
        var newUrl = removeURLParameter(currentUrl, "toaddress");
        currentUrl = newUrl + "toaddress=" + $("#toaddress").val().trim();
    }

    if (flag == false) {
        currentUrl = currentUrl.remove("?");
    }

    window.location.href = currentUrl;
}

function onFilterClick(data) {
    sessionStorage.setItem("addressFilter", "true");
    if (data.id == "dropdownBlock" && getUrlParams()["blockrange"] != undefined) {
        var strBlockRange = getUrlParams()["blockrange"].split('~');
        $("#fromblock").val(strBlockRange[0]);
        $("#toblock").val(strBlockRange[1]);
    }
    else if (data.id == "dropdownAge" && getUrlParams()["agerange"] != undefined) {
        var strAgeRange = getUrlParams()["agerange"].split('~');
        $("#fromage").val(strAgeRange[0]);
        $("#toage").val(strAgeRange[1]);
    }
    else if (data.id == "dropdownFrom" && getUrlParams()["fromaddress"] != undefined) {
        $("#fromaddress").val(getUrlParams()["fromaddress"]);
    }
    else if (data.id == "dropdownTo" && getUrlParams()["toaddress"] != undefined) {
        $("#toaddress").val(getUrlParams()["toaddress"]);
    }
}

function clearFilter(data, e) {
    if (data.id == "btnBlockFilterClear") {
        $("#fromblock").val("");
        $("#toblock").val("");
    }
    else if (data.id == "btnAgeFilterClear") {
        $("#fromage").val("");
        $("#toage").val("");
    }
    else if (data.id == "btnFromFilterClear") {
        $("#fromaddress").val("");
    }
    else if (data.id == "btnToFilterClear") {
        $("#toaddress").val("");
    }
    e.stopPropagation();
}

// ---- jquery custom event for scroll event
jQuery.event.special.scrolldelta = {
    delegateType: "scroll",
    bindType: "scroll",
    handle: function (event) {
        var handleObj = event.handleObj;
        var targetData = jQuery.data(event.target);
        var ret = null;
        var elem = event.target;
        var isDoc = elem === document;
        var oldTop = targetData.top || 0;
        var oldLeft = targetData.left || 0;
        targetData.top = isDoc ? elem.documentElement.scrollTop + elem.body.scrollTop : elem.scrollTop;
        targetData.left = isDoc ? elem.documentElement.scrollLeft + elem.body.scrollLeft : elem.scrollLeft;
        event.scrollTopDelta = targetData.top - oldTop;
        event.scrollTop = targetData.top;
        event.scrollLeftDelta = targetData.left - oldLeft;
        event.scrollLeft = targetData.left;
        event.type = handleObj.origType;
        ret = handleObj.handler.apply(this, arguments);
        event.type = handleObj.type;
        return ret;
    }
};

function js_addresspage4_ace_extension_panel_sourcecode() {
    var self = this;
    var observer = self.observer;

    // ---- function of event when seach text position is changing
    observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            var target = mutationRecord.target
            var parent = $(target).parent()
            if (!parent.hasClass("ace_focus")) {
                var styleTop = target.style.top
                var intOffSetTop = parseFloat(parent.offset().top)
                var intScreenHeight = parseFloat(screen.height)
                var intStyleTop = parseFloat(styleTop)
                //var target_sticky = parent.find("div.ace_search")[0]
                //if (target_sticky) {
                //    target_sticky.style.top = (intStyleTop - (intScreenHeight/2)) + 'px'
                //}
                window.scroll({
                    top: intStyleTop + (intOffSetTop) - (intScreenHeight / 2),
                    left: window.scrollX,
                })
            }
        });
    });

    // ---- on listener event when toggle fullscreen
    self.onObserve = function () {
        var target = $("#" + currentEditor).find("textarea.ace_text-input")[0];
        observer.observe(target, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });
        $(window).on('scrolldelta', function (e) { self.doWhenScroll(target, e) });
    }

    // ---- off listener event when toggle minimize screen
    self.offObserve = function () {
        observer.disconnect();
        $(window).off('scrolldelta')
    }

    //----- function scroll event to get amount scrolling and add to seach box position ------
    self.doWhenScroll = function (target, e) {
        var parent = $(target).parent()
        var target_sticky = parent.find("div.ace_search")[0]
        if (target_sticky) {
            var top = e.scrollTop;
            var topDelta = e.scrollTopDelta;
            //var left = e.scrollLeft;
            //var leftDelta = e.scrollLeftDelta;

            // do stuff with the above info; for now just display it to user
            //var feedbackText = 'scrollTop: ' + top.toString() + 'px (' + (topDelta >= 0 ? '+' : '') + topDelta.toString() + 'px), scrollLeft: ' + left.toString() + 'px (' + (leftDelta >= 0 ? '+' : '') + leftDelta.toString() + 'px)';

            //----- get amount scrollTop and add to seach box ------
            var intOffSetTop = parseFloat(parent.offset().top)
            if (top > intOffSetTop) {
                var extraTop = (top - topDelta) < intOffSetTop ? (intOffSetTop - (top - topDelta)) : 0
                var intStyleTop = parseFloat(target_sticky.style.top) || 0
                target_sticky.style.top = (intStyleTop + topDelta - extraTop) + 'px'
            } else {
                target_sticky.style.top = 0 + 'px'
            }
        }
    }
}
var js_addresspage4_ace_extension_panel_sourcecode = new js_addresspage4_ace_extension_panel_sourcecode();

//-- begin code for checking for disqus comments---

if (blnCheckDisqusCount == true) {
    checkdisquscomment();
}

function checkdisquscomment() {
    $.ajax({
        type: 'Get',
        url: '/datahandler.ashx',
        data: {
            t: 'disqcommentchck',
            id: disqus_title,
            type: 'a'
        },
        success: function (res) {
            
            if (res == 1) {
                document.getElementById("commentindicator").innerHTML = "<sup><i class='fas fa-circle text-success ml-1'></i></sup>"
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
        //-- End code for checking for disqus comments---


if (LitAdvancedModeAvailable == false) {
    //need to disable advanced mode toggle
    document.getElementById("divswitch").style.display = "none";
} else {
    var baseUrlcheck = window.location.href.toLowerCase();
    if (baseUrlcheck.includes("/advanced") == true) {
        document.getElementById("customSwitch1").checked = true;
        //toggletext.innerHTML = "<b>Advanced</b>";
    }
}

function toggleMode() {
    var checkBox = document.getElementById("customSwitch1");
    var toggletext = document.getElementById("toggletext");
    // If the checkbox is checked, display the output text
    var baseUrl = window.location.href.split('#')[0].toLowerCase();;
    if (checkBox.checked == false) {
        //console.log("checked");
        //toggletext.innerHTML = "Simple";
        history.replaceState("", document.title, baseUrl.replace("/advanced", "") + '#internaltx');
        window.location.reload();
    } else {
        //console.log("un-checked");
        //toggletext.innerHTML = "<b>Advanced</b>";
        var querystring = baseUrl.split('?')[1];
        if (querystring != undefined && querystring != "") {
            history.replaceState("", document.title, baseUrl.split('?')[0] + '/advanced?' + baseUrl.split('?')[1] + '#internaltx');
        }
        else {
            history.replaceState("", document.title, baseUrl + '/advanced#internaltx');
        }
        window.location.reload();
    }
}

function removeFilters(hash) {
    var isFilterEnabled = sessionStorage.getItem("addressFilter");
    if (isFilterEnabled == "true") {
        var uri = window.location.toString();
        var baseUrl = "";
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            baseUrl = clean_uri + "#" + hash;
            history.replaceState("", document.title, baseUrl);
        }
    }
}