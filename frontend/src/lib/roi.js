export const ROI_DEFAULTS = { documents: 10, hoursPerDocument: 1.5, hourlyCost: 45 };
export const ROI_PACKAGES = [
  { id: "single", documents: 1, price: 9.9 },
  { id: "pack10", documents: 10, price: 79 },
  { id: "pack100", documents: 100, price: 490 },
];
export function calculateRoi(documents, hoursPerDocument, hourlyCost) {
  if (![documents, hoursPerDocument, hourlyCost].every(Number.isFinite)) return null;
  if (!Number.isInteger(documents) || documents < 1 || documents > 1000 || hoursPerDocument < 0 || hoursPerDocument > 24 || hourlyCost < 0 || hourlyCost > 1000) return null;
  const round = value => Math.round((value + Number.EPSILON) * 100) / 100;
  const hours = round(documents * hoursPerDocument);
  return { hours, value: round(documents * hoursPerDocument * hourlyCost), perDocument: round(hoursPerDocument * hourlyCost), packages: ROI_PACKAGES.map(pack => ({ ...pack, hours: round(pack.documents * hoursPerDocument), value: round(pack.documents * hoursPerDocument * hourlyCost), remaining: round(pack.documents * hoursPerDocument * hourlyCost - pack.price) })) };
}
