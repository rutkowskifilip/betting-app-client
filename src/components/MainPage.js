import "./css/MainPage.css";
export const MainPage = (params) => {
  return (
    <div className="flex-center">
      <ol className="list-rules">
        <li>Wpisowe 100zł/osobę wpłacamy do organizatora w gotówce.</li>
        <li>
          Wszystko będzie odbywało się przez stronę internetową:
          <a href="https://typerzyniemcy.pl">typerzyniemcy.pl</a>.
        </li>
        <li>
          PRZED mistrzostwami wybieracie miejsca w grupach, mistrza, v-ce
          mistrza i króla strzelców.
        </li>
        <li>
          Wyniki wysyłamy najpóźniej przed pierwszym gwizdkiem, później nie ma
          już takiej możliwości.
        </li>
        <li>Punkty zliczają się automatycznie.</li>
        <li>
          W fazie pucharowej punkty za zwycięzcę i wynik liczone są podwójnie.
        </li>
        <li>
          W przypadku dogrywki i karnych obstawienie wyniku w fazie pucharowej,
          wynik końcowy meczu będzie brany pod uwagę.
        </li>
        <li>
          Punkty dodatkowe (Ułożenie grupy, mistrz, v-ce, król strzelców) będą
          przyznawane każdemu po zakończeniu całego turnieju.
        </li>
        <li>Punktacja będzie przyznawana do 24h po meczu.</li>
        <li>
          Dla zwycięzcy przewidziany jest puchar dla najlepszego typera Euro
          2024 oraz zwycięzca zgarnia 70% puli, 2 miejsce 20%, 3 miejsce 10%.
          Przy większej ilości uczestników będzie nagroda pocieszenia dla
          najlepszego typera grup + król strzelców + mistrz & v-ce mistrz.
        </li>
        <li>
          Reszta rzeczy, czyli jak wpisywać wyniki, jak dogrywki, będzie
          dostępna na wideo.
        </li>
        <li>Organizator rozstrzyga sprawy sporne.</li>
      </ol>
    </div>
  );
};
