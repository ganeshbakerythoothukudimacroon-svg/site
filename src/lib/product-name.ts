/** "Tea Rusk 1Kg" -> { baseName: "Tea Rusk", size: "1 Kg" } — so titles and
 *  links can read "Tea Rusk in Thoothukudi", matching how people search. */
export function splitProductName(name: string): { baseName: string; size: string | null } {
  const match = name.match(/^(.*?)\s*(\d+(?:\.\d+)?)\s*(kg|g)$/i);
  if (!match) return { baseName: name, size: null };
  const unit = match[3].toLowerCase() === "kg" ? "Kg" : "g";
  return { baseName: match[1], size: `${match[2]} ${unit}` };
}
