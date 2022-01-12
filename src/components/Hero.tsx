import { useFilterContext } from "../context/filter_context";

const Hero = () => {
  const { stickyHeader } = useFilterContext();

  return (
    <div className="hero-container" style={stickyHeader && { paddingTop: "5rem" }}>
      <h2>EuroTours</h2>
      {/* <Navbar /> */}
    </div>
  );
};

export default Hero;
