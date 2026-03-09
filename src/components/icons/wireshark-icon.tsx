import wiresharkIcon from "./wireshark-svgrepo-com.svg";

export function WiresharkIcon({ className }: { className?: string }) {
  return <img src={wiresharkIcon} alt="Wireshark" className={className} />;
}
