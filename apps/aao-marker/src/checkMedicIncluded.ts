export const checkMedicIncluded = (elem: HTMLAnchorElement): boolean => {
  return (
    elem.getAttribute("naw") != "0" ||
    elem.getAttribute("rtw") != "0" ||
    elem.getAttribute("naw_or_rtw_and_nef") != "0" ||
    elem.getAttribute("naw_or_rtw_and_nef_or_rth") != "0" ||
    elem.getAttribute("seg_elw") != "0" ||
    elem.getAttribute("ktw_b") != "0"
  );
};
