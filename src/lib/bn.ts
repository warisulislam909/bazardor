const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** 148 -> ১৪৮ */
export const toBn = (v: number | string) => String(v).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

/** 1850 -> ১,৮৫০ */
export const fmtPrice = (n: number) => toBn(n.toLocaleString("en-US"));

/** ১,৮৫০ -> 1850  (use this whenever you need to compare Bengali-numeral strings numerically) */
export const parseBn = (s: string) =>
  Number(s.replace(/[০-৯]/g, (c) => String(BN_DIGITS.indexOf(c))).replace(/,/g, ""));

const UNIT_BN: Record<string, string> = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
export const unitName = (u: string) => UNIT_BN[u] ?? u;
export const unitLabel = (u: string) => `প্রতি ${unitName(u)}`;
