import logo from "../assets/logo-inatel.svg?raw";

export default function Logo({ largura = 143, className = "" }) {
  return (
    <span
      role="img"
      aria-label="Inatel"
      className={`logo-vector inline-block ${className}`}
      style={{
        width: largura,
        aspectRatio: "390 / 116",
      }}
      dangerouslySetInnerHTML={{ __html: logo }}
    />
  );
}