import {
  // crawlerColumns,
  sslColumns,
  sslId,
  cookiesColumns,
  cookiesId,
  adaColumn,
  adaId,
  wcagColumns,
  section508Columns,
  snifferId,
} from "constants/columns";

const mappings = {
  1: {
    id: 1,
    title: "SSL Certificates",
    columns: sslColumns,
    uniqueId: sslId,
    rows: [],
  },
  2: {
    id: 2,
    title: "Initial Cookies",
    columns: cookiesColumns,
    uniqueId: cookiesId,
    rows: [],
  },
  3: {
    id: 3,
    title: "Accepted Cookies",
    columns: cookiesColumns,
    uniqueId: cookiesId,
    rows: [],
  },
  4: {
    id: 4,
    title: "Denied Cookies",
    columns: cookiesColumns,
    uniqueId: cookiesId,
    rows: [],
  },
  5: {
    id: 5,
    title: "WCAG2A",
    columns: wcagColumns,
    uniqueId: snifferId,
    rows: [],
  },
  6: {
    id: 6,
    title: "WCAG2AA",
    columns: wcagColumns,
    uniqueId: snifferId,
    rows: [],
  },
  7: {
    id: 7,
    title: "WCAG2AAA",
    columns: wcagColumns,
    uniqueId: snifferId,
    rows: [],
  },
  8: {
    id: 8,
    title: "Section 508",
    columns: section508Columns,
    uniqueId: snifferId,
    rows: [],
  },
  9: {
    id: 9,
    title: "Accessibility Error",
    columns: adaColumn,
    uniqueId: adaId,
    rows: [],
  },
  10: {
    id: 10,
    title: "Accessibility Warnings",
    columns: adaColumn,
    uniqueId: adaId,
    rows: [],
  },
};

export default mappings;
