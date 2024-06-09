import "./MainPage.css";
import "./SamplePoints.css";
export const SamplePoints = (params) => {
  return (
    <div className="flex-center container">
      <h1>Przykładowa punktacja za mecze:</h1>
      <div className="div-sample-points flex-center">
        <div className="div-group flex-center">
          <h2>Przykładowy mecz fazy grupowej:</h2>
          <div className="div-match">
            <img src="/flags/Poland.png" alt="Poland" className="img-flag" />
            <p className="p-match">POLSKA vs FRANCJA</p>

            <img src="/flags/France.png" alt="France" className="img-flag" />
          </div>
          <p className="p-score">3:1</p>
          <h3>Teoretyczne opcje:</h3>
          <div className="div-match-points">
            <img src="/flags/Poland.png" alt="Poland" className="img-flag" />
            <p className="p-match">3:1</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>3 pkt za wytypowanie poprawnego wyniku</p>
          </div>
          <div className="div-match-points">
            <img src="/flags/Poland.png" alt="Poland" className="img-flag" />
            <p className="p-match">2:0</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>1 pkt za wytypowanie zwycięzcy</p>
          </div>
          <div className="div-match-points">
            <img src="/flags/Poland.png" alt="Poland" className="img-flag" />
            <p className="p-match">3:1</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>0 pkt</p>
          </div>
        </div>
        <div className="div-knockout flex-center">
          <h2>Przykładowy mecz fazy pucharowej:</h2>
          <div className="div-match">
            <img src="/flags/Germany.png" alt="Germany" className="img-flag" />
            <p className="p-match">NIEMCY vs FRANCJA</p>

            <img src="/flags/France.png" alt="France" className="img-flag" />
          </div>
          <p className="p-score">2:1</p>
          <h3>Teoretyczne opcje:</h3>
          <p>(d)-dogrywka (k)-karne</p>
          <div className="div-match-points">
            <img src="/flags/Germany.png" alt="Germany" className="img-flag" />
            <p className="p-match">2:1</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>6 pkt za wytypowanie poprawnego wyniku</p>
          </div>
          <div className="div-match-points">
            <img src="/flags/Germany.png" alt="Germany" className="img-flag" />
            <p className="p-match">2:1(d)</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>6 pkt za wytypowanie poprawnego wyniku</p>
          </div>
          <div className="div-match-points">
            <img src="/flags/Germany.png" alt="Germany" className="img-flag" />
            <p className="p-match">2:1(k)</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>6 pkt za wytypowanie poprawnego wyniku</p>
          </div>
          <div className="div-match-points">
            <img src="/flags/Germany.png" alt="Germany" className="img-flag" />
            <p className="p-match">1:0</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>2 pkt za wytypowanie zwycięzcy</p>
          </div>
          <div className="div-match-points">
            <img src="/flags/Germany.png" alt="Germany" className="img-flag" />
            <p className="p-match">1:0(d)</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>2 pkt za wytypowanie zwycięzcy</p>
          </div>
          <div className="div-match-points">
            <img src="/flags/Germany.png" alt="Germany" className="img-flag" />
            <p className="p-match">1:0(k)</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>2 pkt za wytypowanie zwycięzcy</p>
          </div>
          <div className="div-match-points">
            <img src="/flags/Germany.png" alt="Germany" className="img-flag" />
            <p className="p-match">0:2</p>
            <img src="/flags/France.png" alt="France" className="img-flag" />
            <img src="arrow.png" alt="arrow" className="img-arrow" />
            <p>0 pkt</p>
          </div>
        </div>
      </div>
    </div>
  );
};
