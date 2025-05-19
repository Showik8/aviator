import { FAQ, AboutUs, Head, Home, Concept, WhyUs } from "../sections/index";

export function HomePageLayout({ width }) {
  return (
    <>
      <Head width={width} />
      <Home width={width} />
      <AboutUs />
      <Concept width={width} />
      <WhyUs />
      <FAQ />
    </>
  );
}
