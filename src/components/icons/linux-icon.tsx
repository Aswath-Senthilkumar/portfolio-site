import linuxIcon from "./linux.svg";

export function LinuxIcon({ className }: { className?: string }) {
  return <img src={linuxIcon} alt="Linux" className={className} />;
}
