export const About = (props) => {
  return (
   
      <div>


<div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
          <h2>How to use Sparsh!</h2>
              <div className="list-style">
                <div style={{marginTop:"5%"}}>
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div>
                 <div id='aboutwhy2'>
                  <p>{props.data ? props.data.Why2 : "loading..."}</p>
                  </div>
                </div>
              </div>
            {" "}
            <img src="img/type1.png" className="img-responsive" alt="" />{" "}
            {" "}
         
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About SPARSH</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <img src="img/type2.jpeg" className="img-responsive" alt="" />{" "}
             
            </div>
          </div>
        </div>
      </div>
    
    </div>
      <div id='footer'>
      <div className='container text-center'>
        <p>
          &copy; 2022 Skin Disease Prediction System . Project by {'group number 72 '}
          <a href='https://pdpu.ac.in/' rel='nofollow'>
            PDEU
          </a>
        </p>
      </div>
      </div>

      </div>
  );
};
