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
        A repository of women's rights organizations, Igniters is a power tool
        for women around the world! 💪
        <br />
        Everyone can search for organizations and users are able to save useful
        resources, review organizations, as well as create a page for their own
        organization.
        <br />
<section className="usedPages">
          <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">
            Icons 8
        </a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
</section>
      </p>

    </div>
  );
}
