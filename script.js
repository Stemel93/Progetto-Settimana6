const mieImg = [
  "arrabbiato",
  "bello",
  "piangere",
  "ridere",
  "amare",
  "amare1",
  "spavento",
  "shock",
  "arrabbiato",
  "bello",
  "piangere",
  "ridere",
  "amare",
  "amare1",
  "spavento",
  "shock",
];

let modal = $("#modal");
modal.hide();

$(document).ready(function () {
  $.fx.interval = 300;

  $(".progress").animate(
    { width: "100%" },
    {
      duration: 7000,
      step: function (now, fx) {
        if (fx.prop == "width") {
          var countup = Math.round((now / 100) * 100) + "%";
          $(".countup").html(countup);
        }
      },

      start: function () {
        $(this).before("<div class='load'><p>Caricamento...</p></div>");
      },

      /* complete: function() { $('#avanti').slideDown('slow'); }, */
      complete: function () {
        $(this).after(
          "<div class='avanti'><button type='button' id='avanti'>Start!</button></div>"
        );

        $("#avanti").on("click", () => {
          $(".progressBar").css({ display: "none" });
          $(".circle").css({ display: "none" });
          $("#modalStart").fadeIn("slow");
          $("#modalStart").css({ display: "flex" });
          $(".container").fadeIn("slow");
        });

        $("#avanti").slideDown("slow");
      },

      done: function () {
        $("div.load").html("<p>Pronto a giocare!</p>");
      },
    }
  );

  shuffle(mieImg);

  function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = a[currentIndex];
      a[currentIndex] = a[randomIndex];
      a[randomIndex] = temporaryValue;
    }
    return a;
  }

  for (let i = 0; i < mieImg.length; i++) {
    let carta =
      '<div class="images"><img id="' +
      i +
      '" src="img/' +
      mieImg[i] +
      '.png"></img> </div>';
    $(carta).appendTo(".game");
  }

  let match = [];
  let rightCouples = [];
  let images = $(".images");
  var counter = 1;
  var mosse = 1;
  var punteggio = 0;
  var esatto = 100;
  var sbagliato = 10;
  let timer = 0;
  let punteggioMosse = esatto - mosse;
  let punteggioTempo = esatto - timer;
  let punteggioFinal = punteggio + punteggioMosse + punteggioTempo;
  var corsa = false;

  function startTimer() {
    $("#tempo").html(timer);
    timer++;
  }

  function startTimerCorsa() {
    $("#tempo").html(timer);
    timer--;
    if (corsa === true && timer <= 0) {
      $("#tempo").html("0");
      $(images).css("pointer-events", "none");
      $("#modalLost").fadeIn("slow");
      $("#modalLost").css({ display: "flex" });
      $(".punteggio").html(punteggio);
      $(".puntiMosse").html(punteggioMosse);
      $(".puntiTempo").html(punteggioTempo);
      $(".punteggioFinale").html(punteggioFinal);

      return clearInterval(clockCorsa);
    }
  }

  $("#normalCorsa").click(function () {
    corsa = true;
    timer = 31;
    $("#tempo").html("30");
    $("#modalStart").slideUp("slow");
  });

  $("#normal").click(function () {
    corsa = false;
    timer = 0;
    $("#modalStart").slideUp("slow");
  });

  $(images).click(function () {
    if (corsa === false && timer <= 0) {
      timer = 1;
      clock = setInterval(startTimer, 1000);
    } else if (corsa === true && timer >= 31) {
      timer = 30;
      clockCorsa = setInterval(startTimerCorsa, 1000);
    }

    $("#clicks").html(counter);
    $("#mosse").html(mosse);
    $("#punteggio").html(punteggio);
    $("#punteggioFinale").html(punteggioFinal);
    $("#puntiMosse").html(punteggioMosse);
    $("#puntiTempo").html(punteggioTempo);
    punteggioMosse = esatto - mosse;
    punteggioTempo = esatto - timer;
    punteggioFinal = punteggio + punteggioMosse + punteggioTempo;
    $(this).addClass("girata");
    $(this).removeClass("images");
    counter++;
    match.push($(this).children("img").attr("src"));

    if (match.length == 2) {
      if (match[0] == match[1]) {
        rightCouples.push(match[0], match[1]);
        console.log(rightCouples);
        if (rightCouples.length == 16) {
          modal.show();
          clearInterval(clockCorsa);
          return clearInterval(clock);
        }
        match = [];
        let cartaGiusta = $(".girata");
        $(cartaGiusta).addClass("giusta");
        $(cartaGiusta).removeClass("girata");
        mosse++;
        punteggio = punteggio + esatto;

        $("#punteggio").html(punteggio);
        $("#punteggioFinale").html(punteggioFinal);
        $("#puntiMosse").html(punteggioMosse);
        $("#puntiTempo").html(punteggioTempo);
      } else {
        match = [];
        setTimeout(function () {
          let cartaGirata = $(".girata");
          $(cartaGirata).addClass("images");
          $(cartaGirata).removeClass("girata");
          mosse++;

          punteggio = punteggio - sbagliato;
          $("#punteggio").html(punteggio);
        }, 500);
      }
    }
  });
  $("#Restart").click(function () {
    location.reload();
  });
  $(".replay").click(function () {
    location.reload();
  });
});
