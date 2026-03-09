import tableauIcon from "./tableau-icon-svgrepo-com.svg";

export function TableauIcon({ className }: { className?: string }) {
  return <img src={tableauIcon} alt="Tableau Icon" className={className} />;
}
