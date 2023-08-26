/*var isComplete = false;
function InitializeBroadCast() {
    try {
        window.WebSocket = window.WebSocket || window.WebKitWebSocket || window.MozWebSocket;
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        window.URL = window.URL || window.webkitURL || window.mozURL;

        var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

       	bCastSocket = new WebSocket(protocol + "://182.76.241.243:28050");

        bCastSocket.binaryType = 'arraybuffer';
       	

        //#region WebSocket Events

        //#region Open Event
        bCastSocket.onopen = function (event) {
            console.log('Broadcast Socket Connected.');
            if (!isComplete) {
                bCastSocket.send("131#hi");
            }
        };
        //#endregion

        //#region Message Event
        bCastSocket.onmessage = function (event) {
            //  BroadCastProcess(event.data);
            //console.log(event)
            let tcode = event.data.split('$');
            //console.log(tcode);
            // For Contract data 
            if (tcode[0] == "23") {
                addContract(event.data);
            }

                // End of Download
            else if (tcode[0] == "134") {
                isComplete = true;
            }

            if (isComplete) {
                // For Spot rate
                if (tcode[0] == "65") {
                    updateSpotRate(event.data);
                }

                    //For Market picture
                else if (tcode[0] == "300") {
                    getLiveRate(event.data);
                }
            }

        };
        //#endregion

        //#region Error Event
        bCastSocket.onerror = function (event) {
            console.log('Broadcast Socket Connection Error.');
        };
        //#endregion

        //#region Close Event
        bCastSocket.onclose = function (event) {
            resetBroadcast();
        };
        //#endregion

        //#endregion
    } catch (ex) {
        alert('BroadCast - ' + ex);
    }
};

function resetBroadcast() {
    InitializeBroadCast();
}

function addContract(data) {
    try {
        let cData = event.data.split('#');
       // console.log(cData);
        if (cData.length > 23) {
            let html = "<tr id='tr_" + cData[4] + "' data-filter=" + cData[23] + ">" +
                         "<td align='center' width='30%'>" +
                            "<span id='Symbol_" + cData[4] + "' class='comexrate'>" + cData[13] + "</span>" +
                        "</td>" +
                        "<td align='center' width='35%' style='text-align: center'>" +
                            "<span data-ref=" + cData[21] + " data-vat=" + cData[22] + " id='Sell_" + cData[4] + "' class='comexrate'>"+ cData[18] + "</span>" +
                        "</td>" +
                        "<td align='center' width='35%' style='text-align: center'>" +
                            "<img id='ImgInStock_" + cData[4] + "' src='images/spot_1.png' align='middle'>" +
                        "</td>" +
                    "</tr>"

            $('#tblLiveRates table tbody').append(html);
        }



    } catch (e) {
        alert('addContract - ' + e);
    }
}

function getLiveRate(data) {
    try {
        let bData = event.data.split('#');
        if (bData.length > 9) {
            if (document.getElementById("tr_" + bData[3]) != null) {

                let tdSell = document.getElementById("Sell_" + bData[3]);

                let oldSell = tdSell.innerHTML;
                let newSell = parseFloat(bData[9]) + parseFloat($("#Sell_" + bData[3]).attr('data-ref'));
                let vat = parseFloat($("#Sell_" + bData[3]).attr('data-vat'));
                if (vat != 0) {
                    newSell = newSell + Math.ceil((newSell * vat) / 100);
                }

                document.getElementById("Sell_" + bData[3]).innerHTML = newSell;

                let Sts = getStatus(oldSell, newSell);
                if (Sts == "up") {
                    tdSell.style.color = "#2baa09";
                }
                else if (Sts == "down") {
                    tdSell.style.color = "#C60404";
                }
            }
        }


    } catch (err) {
        // alert(err.message);
        //  location.reload(true);
    }
}

function getStatus(oldP, newP) {
    let sts = "";
    if (parseFloat(oldP) > parseFloat(newP)) {
        sts = "down";
    }
    else if (parseFloat(oldP) < parseFloat(newP)) {
        sts = "up";
    }
    return sts;
}

function updateSpotRate(data) {
    let bdata = event.data.split('#');
    if (bdata.length > 3) {


        if (bdata[3].toLowerCase() == "gold") {
            var GoldSymbol = document.getElementById("GoldSymbol");
            GoldSymbol.innerHTML = bdata[3];

            var GoldBid = document.getElementById("GoldBid");
            GoldBid.innerHTML = bdata[4];

            var GoldAsk = document.getElementById("GoldAsk");
            GoldAsk.innerHTML = bdata[5];

            var objGold_status = "up";

            if (objGold_status == "up") {
                GoldBid.style.color = "#2baa09";
                GoldAsk.style.color = "#2baa09";
            }
            else if (objGold_status == "down") {
                GoldBid.style.color = "#C60404";
                GoldAsk.style.color = "#C60404";
            }

        }

        if (bdata[3].toLowerCase() == "silver") {
            var SilverSymbol = document.getElementById("SilverSymbol");
            SilverSymbol.innerHTML = bdata[3];

            var SilverBid = document.getElementById("SilverBid");
            SilverBid.innerHTML = bdata[4];

            var SilverAsk = document.getElementById("SilverAsk");
            SilverAsk.innerHTML = bdata[5];

            var objSilver_status = "down"

            if (objSilver_status == "up") {
                SilverBid.style.color = "#2baa09";
                SilverAsk.style.color = "#2baa09";
            }
            else if (objSilver_status == "down") {
                SilverBid.style.color = "#C60404";
                SilverAsk.style.color = "#C60404";
            }

        }

        if (bdata[3].toLowerCase() == "inr") {
            var INRSymbol = document.getElementById("INRSymbol");
            INRSymbol.innerHTML = bdata[3];

            var INRBid = document.getElementById("INRBid");
            INRBid.innerHTML = bdata[4];

            var INRAsk = document.getElementById("INRAsk");
            INRAsk.innerHTML = bdata[5];

            var objINR_status = "up";

            if (objINR_status == "up") {
                INRBid.style.color = "#2baa09";
                INRAsk.style.color = "#2baa09";
            }
            else if (objINR_status == "down") {
                INRBid.style.color = "#C60404";
                INRAsk.style.color = "#C60404";
            }

        }


    }
}
$(function() {
	InitializeBroadCast();
});
*/