export const checkMedicIncluded = (elem: HTMLAnchorElement): boolean => {
  return (
    Number(elem.getAttribute("naw") ?? 0) > 0 ||
    Number(elem.getAttribute("rtw") ?? 0) > 0 ||
    Number(elem.getAttribute("naw_or_rtw_and_nef") ?? 0) > 0 ||
    Number(elem.getAttribute("naw_or_rtw_and_nef_or_rth") ?? 0) > 0 ||
    Number(elem.getAttribute("seg_elw") ?? 0) > 0 ||
    Number(elem.getAttribute("ktw_b") ?? 0) > 0
  );
};
