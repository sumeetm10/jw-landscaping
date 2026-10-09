export type Category = "Rock" | "Sod & Lawn" | "Repairs" | "Beds";

export type Photo = {
  id: string;
  alt: string;
  label: string;
  category: Category;
  orientation: "portrait" | "landscape" | "square";
};

export const img = (id: string, size: "sm" | "lg" = "lg") =>
  `/img/${id}${size === "sm" ? "-sm" : ""}.webp`;

export const gallery: Photo[] = [
  { id: "retaining-wall-after", alt: "Rebuilt curved block retaining wall beside a house and driveway", label: "Retaining wall rebuild", category: "Repairs", orientation: "landscape" },
  { id: "rock-bed-curve", alt: "Curved river-rock border between a house and freshly cut lawn", label: "Rock border", category: "Rock", orientation: "portrait" },
  { id: "side-yard-after", alt: "Fresh sod laid in a fenced side yard with paver edging", label: "Side yard sod", category: "Sod & Lawn", orientation: "portrait" },
  { id: "tree-ring-after", alt: "Stone tree ring filled with red mulch around a large tree", label: "Tree ring", category: "Repairs", orientation: "portrait" },
  { id: "rock-fence-line", alt: "Rock strip running along a wooden fence beside a green lawn", label: "Fence-line rock", category: "Rock", orientation: "portrait" },
  { id: "lawn-sod-yard", alt: "Wide lawn with mature trees and a rock border by the driveway", label: "Lawn & rock border", category: "Sod & Lawn", orientation: "landscape" },
  { id: "rock-bed-house", alt: "River-rock bed with metal edging along a home's foundation", label: "Foundation rock bed", category: "Rock", orientation: "portrait" },
  { id: "sign-bed-after", alt: "Business sign surrounded by a tidy rock and planting bed", label: "Sign bed", category: "Beds", orientation: "portrait" },
  { id: "sod-strip", alt: "New sod along a curved concrete walkway", label: "Walkway sod", category: "Sod & Lawn", orientation: "portrait" },
  { id: "sod-side-yard-alt", alt: "Narrow fenced yard finished with new sod and pavers", label: "Fenced yard", category: "Sod & Lawn", orientation: "portrait" },
];

export type Transformation = { id: string; title: string; before: string; after: string };

export const transformations: Transformation[] = [
  { id: "wall", title: "Retaining wall rebuilt", before: "retaining-wall-before", after: "retaining-wall-after" },
  { id: "side-yard", title: "Bare side yard to fresh sod", before: "side-yard-before", after: "side-yard-after" },
  { id: "tree", title: "Tree ring restored", before: "tree-ring-before", after: "tree-ring-after" },
];
