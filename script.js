fetch('https://open.er-api.com/v6/latest/USD')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (let key in data.rates) {
            $("select").append(`<option vlaue="${data.rates[key]}">${key}</option>`);
        }
        function rateCalc() {
            if ($("#amountInp").val() != "") {
                let rate = (data.rates[$("#toSelect").val()] / data.rates[$("#fromSelect").val()] * $("#amountInp").val()).toFixed(2);
                return $("#amountInp").val() + " " + $("#fromSelect").val() + " " + "=" + " " + rate + " " + $("#toSelect").val();
            } else $(".Total").text("0");
        }
        function changeCountryFlat(a,b){
            let url = `https://restcountries.com/v3.1/currency/${a.val()}`
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    b.css('background-image', `url('${data[0].flags.png}')`);
                });
        }
        $("#amountInp").on('input', function () {
            $(".Total").text(rateCalc());
        });
        $("select").on('change', function () {
            $(".Total").text(rateCalc());
        });
        $("#fromSelect").on('change', function () {
            $(".Total").text(rateCalc());
            changeCountryFlat($("#fromSelect"),$(".fromCountryImage"));
        });
        $("#toSelect").on('change', function () {
            $(".Total").text(rateCalc());
            changeCountryFlat($("#toSelect"),$(".toCountryImage"));
        });
        $("#toSelect").click(function () {
            $(".Total").text(rateCalc());
        });
        $("#reversSelectValues").click(function () {
            let valFrom = $("#fromSelect").val();
            let valTo = $("#toSelect").val();
            let imgfrom = $(".fromCountryImage").css("background-image");
            let imgTo = $(".toCountryImage").css("background-image");
            $(".fromCountryImage").css('background-image', imgTo);
            $(".toCountryImage").css('background-image', imgfrom);
            $("#fromSelect").val(valTo);
            $("#toSelect").val(valFrom);
            $(".Total").text(rateCalc());
        });
    });