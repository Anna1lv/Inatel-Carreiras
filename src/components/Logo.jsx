import logo from "../assets/logo-inatel.png";

export default function Logo({ largura = 143, className = "" }) {
  const url = `url(${logo})`;
  return (
    <span
      role="img"
      aria-label="Inatel"
      className={`inline-block ${className}`}
      style={{
        width: largura,
        aspectRatio: "143 / 40",
        backgroundColor: "currentColor",
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}