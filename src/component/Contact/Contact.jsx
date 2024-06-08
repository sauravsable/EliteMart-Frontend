import Top from '../layout/Top/Top';
import './Contact.css';
import MetaData from '../layout/MetaData/MetaData';
export default function Contact() {
  return (
    <>
    <Top title={"Contact"}/>
    <MetaData title="Contact Us -- ECOMMERCE"/>
     <div className="contact-us">
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6">
                    <div className="section-heading">
                        <h2>Say Hello. Don't Be Shy!</h2>
                        <span>Details to details is what makes Hexashop different from the other themes.</span>
                    </div>
                    <form id="contact" action="" method="post">
                        <div className="row">
                          <div className="col-lg-6">
                            <fieldset>
                              <input name="name" type="text" id="name" placeholder="Your name" required=""/>
                            </fieldset>
                          </div>
                          <div className="col-lg-6">
                            <fieldset>
                              <input name="email" type="text" id="email" placeholder="Your email" required=""/>
                            </fieldset>
                          </div>
                          <div className="col-lg-12">
                            <fieldset>
                              <textarea name="message" rows="6" id="message" placeholder="Your message" required=""></textarea>
                            </fieldset>
                          </div>
                          <div className="col-lg-12">
                              <button type="submit" id="form-submit" className="main-dark-button"><i className="fa fa-paper-plane"></i></button>
                          </div>
                        </div>
                      </form>
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}
