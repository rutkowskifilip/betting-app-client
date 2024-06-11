import "./MainPage.css";
import "./Rules.css";
export const Rules = (params) => {
  return (
    <div className="div-rules flex-center">
      <h1>Zasady gry:</h1>
      <div className="list-rules flex-center">
        <ol>
          <li>Wpisowe 100zł/osobę wpłacamy do organizatora w gotówce.</li>
          <li>
            PRZED mistrzostwami wybieracie miejsca w grupach, mistrza, w-ce
            mistrza i króla strzelców.
          </li>
          <li>
            Wyniki wysyłamy najpóźniej przed planowaną godziną rozpoczęcia
            spotkania, później nie ma już takiej możliwości.
          </li>
          <li>Punkty zliczają się automatycznie.</li>
          <li>
            W fazie pucharowej punkty za zwycięzcę i wynik liczone są podwójnie.
          </li>
          <li>
            W przypadku dogrywki i karnych obstawienie wyniku w fazie
            pucharowej, wynik końcowy meczu będzie brany pod uwagę.
          </li>
          <li>
            Punkty dodatkowe (ułożenie grupy, mistrz, w-ce mistrz, król
            strzelców) będą przyznawane każdemu po zakończeniu całego turnieju.
          </li>
          <li>Punktacja będzie przyznawana do 24h po meczu.</li>
          <li>
            Dla zwycięzcy przewidziany jest puchar dla najlepszego typera Euro
            2024 oraz zwycięzca zgarnia 70% puli, 2 miejsce 20%, 3 miejsce 10%.
            Przy większej ilości uczestników będzie nagroda pocieszenia dla
            najlepszego typera grup + król strzelców + mistrz & w-ce mistrz.
          </li>
          <li>
            Reszta rzeczy, czyli jak wpisywać wyniki, jak dogrywki, będzie
            dostępna na wideo.
          </li>
          <li>Organizator rozstrzyga sprawy sporne.</li>
        </ol>
      </div>
    </div>
  );
};
