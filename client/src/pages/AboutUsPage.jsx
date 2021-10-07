import "../styles/aboutUsPage.css";

export default function AboutUs() {
  return (
    <div className="aboutUsPage">
      <img
        src="/images/about-us-header.png"
        alt="Rocket Lady"
        className="images"
      />
      <p className="aboutUsDescription">
        A repository of women's rights organizations, <b>Igniters</b> is a power
        tool for women around the world! 💪 Users can search and review
        organizations, save useful resources, and create a page for their own
        organization.
        <br />
      </p>

      <div className="creditsMainContainer">
        <h6>Proudly made by:</h6>
        <div className="namesMainContainer">
          <a
            href="https://www.linkedin.com/in/monika-geiger/"
            className="anchorsInMadeBy"
          >
            Flavian Albert
          </a>
          <a
            href="https://www.linkedin.com/in/monika-geiger/"
            className="anchorsInMadeBy"
          >
            Monika Geiger
          </a>
          <a
            href="https://www.linkedin.com/in/ana-af-martins/"
            className="anchorsInMadeBy"
          >
            Ana Martins
          </a>
          <a
            href="https://www.linkedin.com/in/osvaldo-picazo/"
            className="anchorsInMadeBy"
          >
            Osvaldo Picazo
          </a>
        </div>
        <div>
          <h6>With illustrations by:</h6>

          <p className="illustrationsCredits">
            <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">
              Icons 8
            </a>{" "}
            from <a href="https://icons8.com/illustrations">Ouch!</a>
          </p>
        </div>
      </div>
    </div>
  );
}
