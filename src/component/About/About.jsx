import './About.css'
import Top from "../layout/Top/Top";

export default function About() {
  return (
    <>
      <Top title={"About"} />
      <div className="aboutdiv">
        <p>
          We are an emerging ecommerce platform that provides variety of
          products ranging from electronics, home & kitchen, hardware, kids,
          beauty & health fashion and much more.
        </p>
      </div>
    </>
  );
}
